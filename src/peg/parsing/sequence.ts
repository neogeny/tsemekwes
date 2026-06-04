import { TreeValue, treeMerge } from "@trees"
import type { Ctx } from "@context"
import { ExpKind, SeqExp } from "../exp"

export function sequence(ctx: Ctx, seq: SeqExp): TreeValue {
  let start = ctx.mark()
  let out: TreeValue = null
  for (const item of seq.sequence) {
    if (item.kind === ExpKind.Cut) {
      ctx.cut()
      continue
    }
    try {
      let tree = item.parse(ctx)
      if (tree === null) {
        // NOTE This is handled by treeMerge()
        continue
      }
      out = treeMerge(out, tree)
    } catch (error) {
      ctx.reset(start)
      throw error
    }
  }
  return out
}
