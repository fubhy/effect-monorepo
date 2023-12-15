import * as P from "@effect/schema-11/Parser"
import * as Pretty from "@effect/schema-11/Pretty"
import * as S from "@effect/schema-11/Schema"
import * as Util from "@effect/schema-11/test/util"
import { describe, expect, it } from "vitest"

describe("number/greaterThanOrEqualTo", () => {
  const schema = S.greaterThanOrEqualTo(0)(S.number)

  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("is", () => {
    const is = P.is(schema)
    expect(is(0)).toEqual(true)
    expect(is(1)).toEqual(true)
    expect(is(-1)).toEqual(false)
  })

  it("decoding", async () => {
    await Util.expectParseSuccess(schema, 0)
    await Util.expectParseSuccess(schema, 1)
    await Util.expectParseFailure(
      schema,
      -1,
      `Expected a non-negative number, actual -1`
    )
  })

  it("pretty", () => {
    const pretty = Pretty.to(schema)
    expect(pretty(1)).toEqual("1")
  })
})
