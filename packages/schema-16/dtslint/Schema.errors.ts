import * as S from "@effect/schema-16/Schema"
import { pipe } from "effect/Function"

// optional/ should not allow combinators afterwards
// @ts-expect-error
pipe(S.boolean, S.optional, S.description("..."))
// @ts-expect-error
pipe(S.boolean, S.optional, S.nullable)