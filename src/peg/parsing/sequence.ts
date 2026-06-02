import { NIL, type Tree, Seq } from "@trees"
import type { Ctx } from "@context"
import { type Exp, ExpKind } from "../exp"

export function sequence(ctx: Ctx, items: Exp[]): Tree | null {
  const start = ctx.mark()
  const results: Tree[] = []
  for (const item of items) {
    if (item.kind === ExpKind.Cut) {
      ctx.cut()
      continue
    }
    const result = item.parse(ctx)
    if (result == null) {
      ctx.reset(start)
      return null
    }
    if (result !== NIL) {
      results.push(result)
    }
  }
  if (results.length === 0) return NIL
  if (results.length === 1) return results[0]
  return new Seq(results)
}
