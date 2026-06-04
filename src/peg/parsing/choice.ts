import { type Ctx, ParseError } from "@context"
import type { TreeValue } from "@trees"
import type { ChoiceExp, Exp } from "../exp"
import { tryExp } from "./tryexp"

export function parseChoice(ctx: Ctx, choice: ChoiceExp): TreeValue {
  const options: Exp[] = choice.options
  const mark = ctx.mark()
  for (const opt of options) {
    ctx.reset(mark)
    const [tree, ok] = tryExp(ctx, opt)
    if (ok) {
      return tree
    }
  }
  ctx.reset(mark)
  throw ctx.failure(mark, new ParseError(`expecting: ${choice.lookaheadStr()}`))
}

export function parseOptional(ctx: Ctx, exp: Exp): TreeValue {
  const [tree, ok] = tryExp(ctx, exp)
  return ok ? tree : null
}
