import * as P from "@effect/schema-20/Parser"
import * as S from "@effect/schema-20/Schema"
import * as Util from "@effect/schema-20/test/util"
import { describe, expect, it } from "vitest"

describe("string/endsWith", () => {
  it("is", () => {
    const schema = S.string.pipe(S.endsWith("a"))
    const is = P.is(schema)
    expect(is("a")).toEqual(true)
    expect(is("ba")).toEqual(true)

    expect(is("")).toEqual(false)
    expect(is("b")).toEqual(false)
  })

  it("decoding", async () => {
    const schema = S.string.pipe(S.endsWith("a"))
    await Util.expectParseSuccess(schema, "a")
    await Util.expectParseSuccess(schema, "ba")

    await Util.expectParseFailure(
      schema,
      "",
      `Expected a string ending with "a", actual ""`
    )
    await Util.expectParseFailure(
      schema,
      "b",
      `Expected a string ending with "a", actual "b"`
    )
  })
})
