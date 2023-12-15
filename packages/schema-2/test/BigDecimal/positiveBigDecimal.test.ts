import * as S from "@effect/schema-2/Schema"
import * as Util from "@effect/schema-2/test/util"
import { BigDecimal } from "effect"
import { describe, it } from "vitest"

describe("BigDecimal/positiveBigDecimal", () => {
  const schema = S.BigDecimalFromSelf.pipe(S.positiveBigDecimal())

  it("decoding", async () => {
    await Util.expectParseFailure(
      schema,
      BigDecimal.make(0n, 0),
      "Expected a positive BigDecimal, actual BigDecimal(0)"
    )
    await Util.expectParseFailure(
      schema,
      BigDecimal.make(-2n, 0),
      "Expected a positive BigDecimal, actual BigDecimal(-2)"
    )
    await Util.expectParseSuccess(
      schema,
      BigDecimal.make(2n, 0),
      BigDecimal.make(2n, 0)
    )
  })

  it("encoding", async () => {
    await Util.expectEncodeSuccess(schema, BigDecimal.make(1n, 0), BigDecimal.make(1n, 0))
  })
})
