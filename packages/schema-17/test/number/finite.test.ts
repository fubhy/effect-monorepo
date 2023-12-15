import * as S from "@effect/schema-17/Schema"
import * as Util from "@effect/schema-17/test/util"
import { describe, it } from "vitest"

const schema = S.number.pipe(S.finite())

describe("number/finite", () => {
  it("property tests", () => {
    Util.roundtrip(schema)
  })

  it("decoding", async () => {
    await Util.expectParseSuccess(schema, 1)
    await Util.expectParseFailure(
      schema,
      Infinity,
      `Expected a finite number, actual Infinity`
    )
    await Util.expectParseFailure(
      schema,
      -Infinity,
      `Expected a finite number, actual -Infinity`
    )
  })
})
