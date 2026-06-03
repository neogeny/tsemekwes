import {Ctx, isParseFailure} from "@context"
import type { Tree } from "@trees"
import {ChoiceExp, Exp} from "../exp"

export function parseChoice(ctx: Ctx, choice: ChoiceExp): Tree | null {
  const mark = ctx.mark()
  const options: Exp[] = choice.options
  for (const opt of options) {
    ctx.reset(mark)

    let result: Tree | null = null
    let cutSeen = false

    try {
      ctx.cutStackPush()
      try {
        result = opt.parse(ctx)
      } finally {
        cutSeen = ctx.cutStackPop()
      }

      if (result != null) {
        return result
      } else if (cutSeen) {
        ctx.reset(mark)
        return null
      }
    } catch (error) {
      ctx.reset(mark)
      if (!isParseFailure(error) || cutSeen) {
        throw error
      }
    }
  }
  ctx.reset(mark)
  ctx.failure(mark, `expecting: ${choice.lookaheadStr()}`)
  return null
}
