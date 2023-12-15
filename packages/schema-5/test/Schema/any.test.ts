import * as S from "@effect/schema-5/Schema"
import * as Util from "@effect/schema-5/test/util"
import { describe, it } from "vitest"

describe("Schema/any", () => {
  const schema = S.any
  it("decoding", async () => {
    await Util.expectParseSuccess(schema, undefined, undefined)
    await Util.expectParseSuccess(schema, null, null)
    await Util.expectParseSuccess(schema, "a", "a")
    await Util.expectParseSuccess(schema, 1, 1)
    await Util.expectParseSuccess(schema, true, true)
    await Util.expectParseSuccess(schema, [], [])
    await Util.expectParseSuccess(schema, {}, {})
  })
})