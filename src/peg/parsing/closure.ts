import type { Ctx } from "@totetsu/context/ctx.js"
import type { Exp } from "@peg/exp.js"
import { ArrayValue, NIL, type Tree } from "@totetsu/trees/tree.js"

export function closure(ctx: Ctx, exp: Exp, positive: boolean): Tree | null {
  const results: Tree[] = []
  while (true) {
    const branch = ctx.mark()
    const result = exp.parseAt(ctx)
    if (result == null) {
      ctx.reset(branch)
      break
    }
    results.push(result)
  }
  if (positive && results.length === 0) {
    ctx.failure(ctx.mark(), "positive closure requires at least one match")
    return null
  }
  if (results.length === 0) return new ArrayValue([])
  if (results.length === 1) return results[0]
  return new ArrayValue(results)
}

export function closureWithSep(
  ctx: Ctx,
  exp: Exp,
  sep: Exp,
  positive: boolean,
  keepSep: boolean,
): Tree | null {
  const results: Tree[] = []
  const first = exp.parseAt(ctx)
  if (first == null) {
    if (positive) {
      ctx.failure(ctx.mark(), "join requires at least one match")
      return null
    }
    return NIL
  }
  if (first !== NIL) results.push(first)
  while (true) {
    const branch = ctx.mark()
    const sepResult = sep.parseAt(ctx)
    if (sepResult == null) {
      ctx.reset(branch)
      break
    }
    if (keepSep && sepResult !== NIL) {
      results.push(sepResult)
    }
    const expResult = exp.parseAt(ctx)
    if (expResult == null) {
      ctx.reset(branch)
      break
    }
    if (expResult !== NIL) {
      results.push(expResult)
    }
  }
  if (results.length === 0) return NIL
  return new ArrayValue(results)
}
