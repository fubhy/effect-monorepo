import * as S from "@effect/schema-11/Schema"
import * as Util from "@effect/schema-11/test/util"
import { BigDecimal } from "effect"
import { describe, it } from "vitest"

describe("BigDecimal/lessThanBigDecimal", () => {
  const max = BigDecimal.fromNumber(5)
  const schema = S.BigDecimal.pipe(S.lessThanBigDecimal(max))

  it("decoding", async () => {
    await Util.expectParseFailure(
      schema,
      "5",
      "Expected a BigDecimal less than 5, actual BigDecimal(5)"
    )
    await Util.expectParseFailure(
      schema,
      "6",
      "Expected a BigDecimal less than 5, actual BigDecimal(6)"
    )
  })

  it("encoding", async () => {
    await Util.expectEncodeSuccess(schema, BigDecimal.fromNumber(4.5), "4.5")
  })
})