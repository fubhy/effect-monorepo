import * as S from "@effect/schema-9/Schema"
import * as Util from "@effect/schema-9/test/util"
import { describe, it } from "vitest"

describe("string/ULID", () => {
  it("property tests", () => {
    Util.roundtrip(S.ULID)
  })

  it("Decoder", async () => {
    const schema = S.ULID
    await Util.expectParseSuccess(schema, "01H4PGGGJVN2DKP2K1H7EH996V")
    await Util.expectParseFailure(
      schema,
      "",
      `Expected ULID, actual ""`
    )
  })
})
