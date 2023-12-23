import * as Context from "effect/Context"
import * as Effect from "effect/Effect"
import { pipe } from "effect/Function"
import * as FileSystem from "../../FileSystem.js"
import type * as Body from "../../Http/Body.js"
import * as Etag from "../../Http/Etag.js"
import * as Headers from "../../Http/Headers.js"
import type * as Platform from "../../Http/Platform.js"
import type * as ServerResponse from "../../Http/ServerResponse.js"

/** @internal */
export const TypeId: Platform.TypeId = Symbol.for("@effect/platform/Http/Platform") as Platform.TypeId

/** @internal */
export const tag = Context.Tag<Platform.Platform>(TypeId)

/** @internal */
export const make = (impl: {
  readonly fileResponse: (
    path: string,
    status: number,
    statusText: string | undefined,
    headers: Headers.Headers,
    start: number,
    end: number | undefined,
    contentLength: number
  ) => ServerResponse.ServerResponse
  readonly fileWebResponse: (
    file: Body.Body.FileLike,
    status: number,
    statusText: string | undefined,
    headers: Headers.Headers,
    options?: FileSystem.StreamOptions
  ) => ServerResponse.ServerResponse
}): Effect.Effect<FileSystem.FileSystem | Etag.Generator, never, Platform.Platform> =>
  Effect.gen(function*(_) {
    const fs = yield* _(FileSystem.FileSystem)
    const etagGen = yield* _(Etag.Generator)

    return tag.of({
      [TypeId]: TypeId,
      fileResponse(path, options) {
        return pipe(
          Effect.bindTo(fs.stat(path), "info"),
          Effect.bind("etag", ({ info }) => etagGen.fromFileInfo(info)),
          Effect.map(({ etag, info }) => {
            const start = Number(options?.offset ?? 0)
            const end = options?.bytesToRead !== undefined ? start + Number(options.bytesToRead) : undefined
            const headers = Headers.set(options?.headers ?? Headers.empty, "etag", Etag.toString(etag))
            if (info.mtime._tag === "Some") {
              ;(headers as any)["last-modified"] = info.mtime.value.toUTCString()
            }
            const contentLength = end !== undefined ? end - start : Number(info.size) - start
            return impl.fileResponse(
              path,
              options?.status ?? 200,
              options?.statusText,
              headers,
              start,
              end,
              contentLength
            )
          })
        )
      },
      fileWebResponse(file, options) {
        return Effect.map(etagGen.fromFileWeb(file), (etag) => {
          const headers = Headers.merge(
            options?.headers ?? Headers.empty,
            Headers.unsafeFromRecord({
              etag: Etag.toString(etag),
              "last-modified": new Date(file.lastModified).toUTCString()
            })
          )
          return impl.fileWebResponse(
            file,
            options?.status ?? 200,
            options?.statusText,
            headers,
            options
          )
        })
      }
    })
  })
