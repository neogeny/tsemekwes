import type { Ctx } from "@context"
import { BOTTOM, type Text, type Tree, TreeKind } from "@trees"
import type { MemoKey } from "@context"
import type { Rule } from "../rule"

/**
 * Implements the rule call semantics that were present in the Go version.
 * It handles:
 *   • Unlinked rule errors
 *   • Memoization (including left‑recursion handling)
 *   • Tracing (entry, success, failure, recursion)
 *   • Name‑rule keyword reservation checks
 */
export function call(ctx: Ctx, name: string, rule: Rule | null): Tree | null {
  const start = ctx.mark()
  ctx.heartbeatTick()

  if (rule === null) {
    ctx.failure(ctx.mark(), `rule not linked: ${name}`)
    return null
  }

  const key = ctx.key(name, rule.isMemoizable())

  if (!rule.isToken()) {
    ctx.nextToken()
  }

  if (rule.shouldTrace()) {
    ctx.tracer().traceEntry(ctx)
  }
  ctx.enter(name)
  const result = doCall(ctx, name, rule)
  ctx.leave()

  if (result === null) {
    if (rule.shouldTrace()) {
      ctx.tracer().traceFailure(ctx, name)
    }
    ctx.memoize(key, BOTTOM, start)
    return null
  }

  const tree = result as Tree

  if (rule.isName) {
    if (tree.kind === TreeKind.Text) {
      const value = (tree as Text).value
      if (ctx.isKeyword(value)) {
        if (rule.shouldTrace()) {
          ctx.tracer().traceFailure(ctx, value)
        }
        ctx.failure(ctx.mark(), `'${value}' is a reserved word`)
        ctx.memoize(key, BOTTOM, ctx.mark())
        return null
      }
    }
  }

  ctx.memoize(key, tree, ctx.mark())
  if (rule.shouldTrace()) {
    ctx.tracer().traceSuccess(ctx)
  }

  return tree
}

/**
 * Core call logic: memo lookup, left‑recursion handling, or simple rule parse.
 *
 * NOTE: key is computed AFTER whitespace skip (post‑nextToken), matching the
 * TieXiu approach so that nested left‑recursive calls share the same LR key.
 */
function doCall(ctx: Ctx, name: string, rule: Rule): Tree | null {
  const key = ctx.key(name, rule.isMemoizable())
  const memo = ctx.memo(key)
  if (memo) {
    if (memo.tree === BOTTOM) {
      if (rule.shouldTrace()) {
        ctx.tracer().traceFailure(ctx, name)
      }
      return null
    }
    ctx.reset(memo.mark)
    return memo.tree
  }

  if (rule.isLeftRecursive()) {
    return callRecursive(ctx, name, rule, key)
  }

  return rule.parse(ctx)
}

/**
 * Left‑recursive handling using the seed‑grow algorithm.
 */
function callRecursive(
  ctx: Ctx,
  _name: string,
  rule: Rule,
  key: MemoKey,
): Tree | null {
  const start = ctx.mark()
  ctx.tracer().traceRecursion(ctx)
  ctx.memoize(key, BOTTOM, ctx.mark())

  let lastMark = start
  let lastTree: Tree | null = null

  while (true) {
    ctx.reset(start)

    ctx.track(key)
    if (ctx.recursionDepthExceeded()) {
      ctx.untrack(key)
      ctx.failure(
        ctx.mark(),
        `left recursion depth exceeded for rule: ${key.name}`,
      )
      return null
    }

    const result = rule.parse(ctx)
    ctx.untrack(key)

    if (result === null) break

    const endMark = ctx.mark()
    if (endMark <= lastMark) break

    lastMark = endMark
    lastTree = result
    ctx.memoize(key, lastTree, lastMark)
  }

  ctx.reset(lastMark)
  ctx.memoize(key, lastTree as Tree, lastMark)

  if (lastTree === null || lastTree === BOTTOM) {
    ctx.reset(start)
    return null
  }
  return lastTree
}
