import { type Ctx, ParseError } from "@context"
import { closed, type TreeValue } from "@trees"
import type { Exp } from "../exp"
import { tryExp } from "./tryexp"

export function closure(ctx: Ctx, exp: Exp, positive: boolean): TreeValue {
  const out = []
  if (positive) {
    const tree = exp.parse(ctx)
    out.push(tree)
  }

  while (!ctx.atEnd()) {
    const mark = ctx.mark()
    const [tree, ok] = tryExp(ctx, exp)
    if (!ok) break
    if (mark === ctx.mark()) {
      throw ctx.failure(
        ctx.mark(),
        new ParseError(`closure matched empty input ${exp}`),
      )
    }
    out.push(tree)
  }
  return closed(out)
}

export function closureWithSep(
  ctx: Ctx,
  exp: Exp,
  sep: Exp,
  positive: boolean,
  keepSep: boolean,
): TreeValue {
  const out = []

  if (positive) {
    const first = exp.parse(ctx)
    out.push(first)
  } else {
    const mark = ctx.mark()
    const [first, ok] = tryExp(ctx, exp)
    if (!ok) {
      ctx.reset(mark)
      return closed([])
    }
    if (mark === ctx.mark()) {
      throw ctx.failure(
        ctx.mark(),
        new ParseError(`closure matched empty input ${exp}`),
      )
    }
    out.push(first)
  }

  while (!ctx.atEnd()) {
    const mark = ctx.mark()
    const [tsep, ok] = tryExp(ctx, sep)
    if (!ok) {
      ctx.reset(mark)
      break
    }
    if (keepSep) {
      out.push(tsep)
    }
    const tree = exp.parse(ctx)
    out.push(tree)
  }
  return closed(out)
}
