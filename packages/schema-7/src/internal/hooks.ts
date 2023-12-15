/**
 * @since 1.0.0
 */
import type * as Arbitrary from "../Arbitrary.js"
import type * as Equivalence from "../Equivalence.js"
import type * as Pretty from "../Pretty.js"

/** @internal */
export const ArbitraryHookId: Arbitrary.ArbitraryHookId = Symbol.for(
  "@effect/schema-7/ArbitraryHookId"
) as Arbitrary.ArbitraryHookId

/** @internal */
export const PrettyHookId: Pretty.PrettyHookId = Symbol.for(
  "@effect/schema-7/PrettyHookId"
) as Pretty.PrettyHookId

/** @internal */
export const EquivalenceHookId: Equivalence.EquivalenceHookId = Symbol.for(
  "@effect/schema-7/EquivalenceHookId"
) as Equivalence.EquivalenceHookId
