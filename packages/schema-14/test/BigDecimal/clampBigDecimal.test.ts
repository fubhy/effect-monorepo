import * as S from "@effect/schema-14/Schema"
import * as Util from "@effect/schema-14/test/util"
import { BigDecimal } from "effect"
import { describe, it } from "vitest"

describe("BigDecimal/clampBigDecimal", () => {
  it("decoding", async () => {
    const min = BigDecimal.make(-1n, 0)
    const max = BigDecimal.make(1n, 0)
    const schema = S.BigDecimalFromSelf.pipe(S.clampBigDecimal(min, max)) // [-1, 1]

    await Util.expectParseSuccess(schema, BigDecimal.make(3n, 0), BigDecimal.make(1n, 0))
    await Util.expectParseSuccess(schema, BigDecimal.make(0n, 0), BigDecimal.make(0n, 0))
    await Util.expectParseSuccess(schema, BigDecimal.make(-3n, 0), BigDecimal.make(-1n, 0))
  })
})
