import { pipe } from "@effect/data/Function"
import * as Option from "@effect/data/Option"
import * as OptionInstances from "@effect/typeclass/data/Option"
import * as ReadonlyArrayInstances from "@effect/typeclass/data/ReadonlyArray"
import * as Util from "../util"

describe.concurrent("Option", () => {
  it("SemiCoproduct.coproductMany", () => {
    const coproductMany = OptionInstances.SemiCoproduct.coproductMany
    Util.deepStrictEqual(coproductMany(Option.some(1), []), Option.some(1))
    Util.deepStrictEqual(coproductMany(Option.none(), []), Option.none())
    Util.deepStrictEqual(
      coproductMany(Option.none(), [Option.none(), Option.none(), Option.none(), Option.some(1)]),
      Option.some(1)
    )
    Util.deepStrictEqual(
      coproductMany(Option.none(), [Option.none(), Option.none(), Option.none()]),
      Option.none()
    )
  })

  it("Traversable.traverse", () => {
    const traverse = OptionInstances.Traversable.traverse
    Util.deepStrictEqual(
      pipe(
        Option.some("hello"),
        traverse(ReadonlyArrayInstances.Applicative)(() => [])
      ),
      []
    )
    Util.deepStrictEqual(
      pipe(
        Option.some("hello"),
        traverse(ReadonlyArrayInstances.Applicative)((s) => [s.length])
      ),
      [Option.some(5)]
    )
    Util.deepStrictEqual(
      pipe(
        Option.none(),
        traverse(ReadonlyArrayInstances.Applicative)((s) => [s])
      ),
      [Option.none()]
    )
  })
})
