import * as S from "@effect/schema-17/Schema"
import * as Util from "@effect/schema-17/test/util"
import { describe, it } from "vitest"

describe("Schema/void", () => {
  const schema = S.void
  it("decoding", async () => {
    await Util.expectParseSuccess(schema, undefined, undefined)
    await Util.expectParseFailure(schema, 1, `Expected void, actual 1`)
  })
})
