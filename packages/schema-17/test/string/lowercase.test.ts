import * as P from "@effect/schema-17/Parser"
import * as S from "@effect/schema-17/Schema"
import * as Util from "@effect/schema-17/test/util"
import { describe, expect, it } from "vitest"

describe("string/lowercase", () => {
  it("property tests", () => {
    const schema = S.Lowercase
    Util.roundtrip(schema)
  })

  it("Guard", () => {
    const schema = S.Lowercase
    const is = P.is(schema)
    expect(is("a")).toEqual(true)
    expect(is(" a ")).toEqual(true)
    expect(is("")).toEqual(true)
    expect(is(" ")).toEqual(true)
    expect(is("A")).toEqual(false)
    expect(is(" A ")).toEqual(false)
  })

  it("decoding", async () => {
    const schema = S.string.pipe(S.lowercase)
    await Util.expectParseSuccess(schema, "a", "a")
    await Util.expectParseSuccess(schema, "A ", "a ")
    await Util.expectParseSuccess(schema, " A ", " a ")
  })

  it("encoding", async () => {
    const schema = S.string.pipe(S.lowercase)
    await Util.expectEncodeSuccess(schema, "", "")
    await Util.expectEncodeSuccess(schema, "a", "a")

    await Util.expectEncodeFailure(
      schema,
      "A",
      `Expected a lowercase string, actual "A"`
    )
  })
})
