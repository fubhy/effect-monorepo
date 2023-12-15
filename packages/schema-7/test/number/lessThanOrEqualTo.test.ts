import * as P from "@effect/schema-7/Parser"
import * as Pretty from "@effect/schema-7/Pretty"
import * as S from "@effect/schema-7/Schema"
import * as Util from "@effect/schema-7/test/util"
import { describe, expect, it } from "vitest"

describe("number/lessThanOrEqualTo", () => {
  it("property tests", () => {
    Util.roundtrip(S.lessThanOrEqualTo(0)(S.number))
  })

  it("is", () => {
    const is = P.is(S.lessThanOrEqualTo(0)(S.number))
    expect(is(0)).toEqual(true)
    expect(is(1)).toEqual(false)
    expect(is(-1)).toEqual(true)
  })

  it("decoding", async () => {
    const schema = S.lessThanOrEqualTo(0)(S.number)
    await Util.expectParseSuccess(schema, 0)
    await Util.expectParseSuccess(schema, -1)
    await Util.expectParseFailure(
      schema,
      1,
      `Expected a non-positive number, actual 1`
    )
  })

  it("pretty", () => {
    const pretty = Pretty.to(S.lessThanOrEqualTo(0)(S.number))
    expect(pretty(1)).toEqual("1")
  })
})
