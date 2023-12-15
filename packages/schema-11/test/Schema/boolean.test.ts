import * as S from "@effect/schema-11/Schema"
import * as Util from "@effect/schema-11/test/util"
import { describe, it } from "vitest"

describe("Schema/boolean", () => {
  const schema = S.boolean
  it("decoding", async () => {
    await Util.expectParseSuccess(schema, true, true)
    await Util.expectParseSuccess(schema, false, false)
    await Util.expectParseFailure(schema, 1, `Expected boolean, actual 1`)
  })

  it("encoding", async () => {
    await Util.expectEncodeSuccess(schema, true, true)
    await Util.expectEncodeSuccess(schema, false, false)
  })
})
