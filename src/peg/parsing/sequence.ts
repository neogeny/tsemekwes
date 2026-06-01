import type { Ctx } from "@context/ctx.js"
import { type Exp, ExpKind } from "@peg/exp.js"
import { NIL, type Tree, Seq } from "@trees/tree.js"

export function sequence(ctx: Ctx, items: Exp[]): Tree | null {
  const start = ctx.mark()
  const results: Tree[] = []
  for (const item of items) {
    if (item.kind === ExpKind.Cut) {
      ctx.cut()
      continue
    }
    const result = item.parseAt(ctx)
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
