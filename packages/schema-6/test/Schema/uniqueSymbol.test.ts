import * as S from "@effect/schema-6/Schema"
import * as Util from "@effect/schema-6/test/util"
import { describe, it } from "vitest"

describe("Schema/uniqueSymbol", () => {
  const a = Symbol.for("@effect/schema-6/test/a")
  const schema = S.uniqueSymbol(a)
  it("decoding", async () => {
    await Util.expectParseSuccess(schema, a)
    await Util.expectParseSuccess(schema, Symbol.for("@effect/schema-6/test/a"))
    await Util.expectParseFailure(
      schema,
      "Symbol(@effect/schema-6/test/a)",
      `Expected Symbol(@effect/schema-6/test/a), actual "Symbol(@effect/schema-6/test/a)"`
    )
  })
})
