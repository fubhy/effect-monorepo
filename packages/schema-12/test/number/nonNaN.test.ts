import * as P from "@effect/schema-12/Parser"
import * as Pretty from "@effect/schema-12/Pretty"
import * as S from "@effect/schema-12/Schema"
import * as Util from "@effect/schema-12/test/util"
import { describe, expect, it } from "vitest"

describe("number/nonNaN", () => {
  const schema = S.number.pipe(S.nonNaN())

  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("is", () => {
    const is = P.is(schema)
    expect(is(1)).toEqual(true)
    expect(is(NaN)).toEqual(false)
  })

  it("decoding", async () => {
    await Util.expectParseSuccess(schema, 1)
    await Util.expectParseFailure(schema, NaN, `Expected a number NaN excluded, actual NaN`)
  })

  it("pretty", () => {
    const pretty = Pretty.to(schema)
    expect(pretty(1)).toEqual("1")
    expect(pretty(NaN)).toEqual("NaN")
  })
})
