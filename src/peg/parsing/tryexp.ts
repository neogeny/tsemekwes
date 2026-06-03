import {TreeValue} from "@trees";
import {Ctx, isParseFailure} from "@context";
import {Exp} from "../exp";

export function tryExp(ctx: Ctx, exp: Exp): [TreeValue, boolean] {
  let mark = ctx.mark()
  let tree: TreeValue = null
  let cutSeen = false
  try {
    ctx.cutStackPush()
    try {
      tree = exp.parse(ctx)
    } finally {
      cutSeen = ctx.cutStackPop()
    }
  } catch (error) {
    ctx.reset(mark)
    if (!isParseFailure(error) || cutSeen) {
      throw error
    }
    return [null, false]
  }
  return [tree, true]
}

