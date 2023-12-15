import * as P from "@effect/schema-18/Parser"
import * as S from "@effect/schema-18/Schema"
import * as Util from "@effect/schema-18/test/util"
import { describe, expect, it } from "vitest"

describe("string/uppercase", () => {
  it("property tests", () => {
    const schema = S.Uppercase
    Util.roundtrip(schema)
  })

  it("Guard", () => {
    const schema = S.Uppercase
    const is = P.is(schema)
    expect(is("A")).toEqual(true)
    expect(is(" A ")).toEqual(true)
    expect(is("")).toEqual(true)
    expect(is(" ")).toEqual(true)
    expect(is("a")).toEqual(false)
    expect(is(" a ")).toEqual(false)
  })

  it("decoding", async () => {
    const schema = S.string.pipe(S.uppercase)
    await Util.expectParseSuccess(schema, "A", "A")
    await Util.expectParseSuccess(schema, "a ", "A ")
    await Util.expectParseSuccess(schema, " a ", " A ")
  })

  it("encoding", async () => {
    const schema = S.string.pipe(S.uppercase)
    await Util.expectEncodeSuccess(schema, "", "")
    await Util.expectEncodeSuccess(schema, "A", "A")

    await Util.expectEncodeFailure(
      schema,
      "a",
      `Expected an uppercase string, actual "a"`
    )
  })
})
