import * as S from "@effect/schema-19/Schema"
import * as Util from "@effect/schema-19/test/util"
import { describe, it } from "vitest"

describe("symbol/symbolFromSelf", () => {
  const schema = S.symbolFromSelf
  it("decoding", async () => {
    const a = Symbol.for("@effect/schema-19/test/a")
    await Util.expectParseSuccess(schema, a)
    await Util.expectParseFailure(
      schema,
      "@effect/schema-19/test/a",
      `Expected symbol, actual "@effect/schema-19/test/a"`
    )
  })

  it("encoding", async () => {
    const a = Symbol.for("@effect/schema-19/test/a")
    await Util.expectEncodeSuccess(schema, a, a)
  })
})
