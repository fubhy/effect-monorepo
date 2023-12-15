import * as P from "@effect/schema-20/Parser"
import * as S from "@effect/schema-20/Schema"
import * as Util from "@effect/schema-20/test/util"
import { describe, expect, it } from "vitest"

describe("string/startsWith", () => {
  it("is", () => {
    const schema = S.string.pipe(S.startsWith("a"))
    const is = P.is(schema)
    expect(is("a")).toEqual(true)
    expect(is("ab")).toEqual(true)

    expect(is("")).toEqual(false)
    expect(is("b")).toEqual(false)
  })

  it("decoding", async () => {
    const schema = S.string.pipe(S.startsWith("a"))
    await Util.expectParseSuccess(schema, "a")
    await Util.expectParseSuccess(schema, "ab")

    await Util.expectParseFailure(
      schema,
      "",
      `Expected a string starting with "a", actual ""`
    )
    await Util.expectParseFailure(
      schema,
      "b",
      `Expected a string starting with "a", actual "b"`
    )
  })
})
