import * as S from "@effect/schema-19/Schema"
import * as Util from "@effect/schema-19/test/util"
import { describe, it } from "vitest"

describe("bigint/clampBigint", () => {
  it("decoding", async () => {
    const schema = S.bigintFromSelf.pipe(S.clampBigint(-1n, 1n))

    await Util.expectParseSuccess(schema, 3n, 1n)
    await Util.expectParseSuccess(schema, 0n, 0n)
    await Util.expectParseSuccess(schema, -3n, -1n)
  })
})
