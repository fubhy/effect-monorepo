import * as P from "@effect/schema-11/Parser"
import * as Pretty from "@effect/schema-11/Pretty"
import * as S from "@effect/schema-11/Schema"
import * as Util from "@effect/schema-11/test/util"
import { describe, expect, it } from "vitest"

describe("string/minLength", () => {
  it("property tests", () => {
    Util.roundtrip(S.minLength(0)(S.string))
  })

  it("is", () => {
    const is = P.is(S.minLength(1)(S.string))
    expect(is("")).toEqual(false)
    expect(is("a")).toEqual(true)
    expect(is("aa")).toEqual(true)
  })

  it("decoding", async () => {
    const schema = S.minLength(1)(S.string)
    await Util.expectParseSuccess(schema, "a")
    await Util.expectParseSuccess(schema, "aa")
    await Util.expectParseFailure(
      schema,
      "",
      `Expected a string at least 1 character(s) long, actual ""`
    )
  })

  it("pretty", () => {
    const pretty = Pretty.to(S.minLength(0)(S.string))
    expect(pretty("a")).toEqual(`"a"`)
  })
})
