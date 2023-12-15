import * as S from "@effect/schema-8/Schema"
import * as Util from "@effect/schema-8/test/util"
import { describe, it } from "vitest"

describe("string/nonEmpty", () => {
  const schema = S.string.pipe(S.nonEmpty())
  it("decoding", async () => {
    await Util.expectParseSuccess(schema, "a")
    await Util.expectParseSuccess(schema, "aa")

    await Util.expectParseFailure(
      schema,
      "",
      `Expected a non empty string, actual ""`
    )
  })
})
