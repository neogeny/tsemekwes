import {TreeValue} from "@trees"
import {Ctx} from "@context"
import {ChoiceExp, Exp} from "../exp"
import {tryExp} from "./tryexp";

export function parseChoice(ctx: Ctx, choice: ChoiceExp): TreeValue {
  const options: Exp[] = choice.options
  const mark = ctx.mark()
  for (const opt of options) {
    ctx.reset(mark)
    let [tree, ok] = tryExp(ctx, opt)
    if (ok) {
      return tree
    }
  }
  ctx.reset(mark)
  ctx.failure(mark, `expecting: ${choice.lookaheadStr()}`)
  return null
}

export function parseOptional(ctx: Ctx, exp: Exp): TreeValue {
  let [tree, ok] = tryExp(ctx, exp)
  return ok ? tree : null
}
