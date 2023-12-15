import * as P from "@effect/schema-19/Parser"
import * as S from "@effect/schema-19/Schema"
import * as O from "effect/Option"
import { describe, expect, it } from "vitest"

describe("Schema/encodeOption", () => {
  it("should return none for invalid values", () => {
    const schema = S.string.pipe(S.maxLength(1), S.numberFromString)
    expect(P.encodeOption(schema)(1)).toEqual(O.some("1"))
    expect(P.encodeOption(schema)(10)).toEqual(O.none())
  })
})
