import * as S from "@effect/schema-16/Schema"
import * as Util from "@effect/schema-16/test/util"
import { describe, it } from "vitest"

describe("bigint/greaterThanBigint", () => {
  const schema = S.bigintFromSelf.pipe(S.greaterThanBigint(0n))

  it("decoding", async () => {
    await Util.expectParseFailure(schema, -1n, "Expected a positive bigint, actual -1n")
    await Util.expectParseFailure(schema, 0n, "Expected a positive bigint, actual 0n")
  })

  it("encoding", async () => {
    await Util.expectEncodeSuccess(schema, 1n, 1n)
  })
})
