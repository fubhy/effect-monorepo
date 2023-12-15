import * as P from "@effect/schema-20/Parser"
import * as Pretty from "@effect/schema-20/Pretty"
import * as S from "@effect/schema-20/Schema"
import * as Util from "@effect/schema-20/test/util"
import { describe, expect, it } from "vitest"

describe("string/trimmed", () => {
  const schema = S.string.pipe(S.trimmed())

  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("is", () => {
    const is = P.is(schema)
    expect(is("a")).toEqual(true)
    expect(is("")).toEqual(true)
    expect(is("a ")).toEqual(false)
    expect(is(" a")).toEqual(false)
    expect(is(" a ")).toEqual(false)
    expect(is(" ")).toEqual(false)
    expect(is("a\nb")).toEqual(true)
    expect(is("a\nb ")).toEqual(false)
    expect(is(" a\nb")).toEqual(false)
  })

  it("decoding", async () => {
    await Util.expectParseSuccess(schema, "a")
    await Util.expectParseSuccess(schema, "")
    await Util.expectParseFailure(
      schema,
      "a ",
      `Expected a string with no leading or trailing whitespace, actual "a "`
    )
    await Util.expectParseFailure(
      schema,
      " a",
      `Expected a string with no leading or trailing whitespace, actual " a"`
    )
    await Util.expectParseFailure(
      schema,
      " a ",
      `Expected a string with no leading or trailing whitespace, actual " a "`
    )
  })

  it("encoding", async () => {
    await Util.expectEncodeSuccess(schema, "a", "a")
    await Util.expectEncodeSuccess(schema, "", "")
    await Util.expectEncodeFailure(
      schema,
      "a ",
      `Expected a string with no leading or trailing whitespace, actual "a "`
    )
    await Util.expectEncodeFailure(
      schema,
      " a",
      `Expected a string with no leading or trailing whitespace, actual " a"`
    )
    await Util.expectEncodeFailure(
      schema,
      " a ",
      `Expected a string with no leading or trailing whitespace, actual " a "`
    )
  })

  it("pretty", () => {
    const pretty = Pretty.to(schema)
    expect(pretty("a")).toEqual(`"a"`)
    expect(pretty("")).toEqual(`""`)
  })
})