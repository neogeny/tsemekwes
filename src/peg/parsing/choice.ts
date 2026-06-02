import type { Ctx } from "@context"
import type { Tree } from "@trees"
import type { Exp } from "../exp"

export function parseChoice(ctx: Ctx, options: Exp[]): Tree | null {
  const mark = ctx.mark()
  for (const opt of options) {
    ctx.reset(mark)

    ctx.cutStackPush()
    const result = opt.parse(ctx)
    const cutSeen = ctx.cutStackPop()

    if (result != null) {
      return result
    } else if (cutSeen) {
      ctx.reset(mark)
      return null
    }
  }
  ctx.reset(mark)
  return null
}
