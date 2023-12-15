import * as S from "@effect/schema-2/Schema"
import * as Util from "@effect/schema-2/test/util"
import { describe, it } from "vitest"

describe("number/nonNegative", () => {
  const schema = S.number.pipe(S.nonNegative())
  it("decoding", async () => {
    await Util.expectParseSuccess(schema, 0, 0)
    await Util.expectParseSuccess(schema, 1, 1)
  })

  it("encoding", async () => {
    await Util.expectEncodeFailure(schema, -1, "Expected a non-negative number, actual -1")
  })
})
