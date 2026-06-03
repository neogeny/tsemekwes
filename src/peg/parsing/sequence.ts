import {TreeValue, treeMerge} from "@trees"
import type { Ctx } from "@context"
import { type Exp, ExpKind } from "../exp"

export function sequence(ctx: Ctx, items: Exp[]): TreeValue {
  let out: TreeValue = null
  for (const item of items) {
    if (item.kind === ExpKind.Cut) {
      ctx.cut()
      continue
    }
    out = treeMerge(out, item.parse(ctx))
  }
  return out
}
