import * as S from "@effect/schema-10/Schema"
import * as Util from "@effect/schema-10/test/util"
import { describe, it } from "vitest"

describe("bigint/nonNegativeBigint", () => {
  const schema = S.bigintFromSelf.pipe(S.nonNegativeBigint())

  it("decoding", async () => {
    await Util.expectParseSuccess(schema, 0n, 0n)
    await Util.expectParseSuccess(schema, 1n, 1n)
  })

  it("encoding", async () => {
    await Util.expectEncodeFailure(schema, -1n, "Expected a non-negative bigint, actual -1n")
  })
})
