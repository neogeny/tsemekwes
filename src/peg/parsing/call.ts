// noinspection ExceptionCaughtLocallyJS

import type { MemoKey } from "@context"
import {
  BOTTOM,
  type Ctx,
  isBottomEntry,
  isParseError,
  ParseError,
} from "@context"
import type { TreeValue } from "@trees"
import type { Rule } from "../rule"

/**
 * Implements the rule call semantics that were present in the Go version.
 * It handles:
 *   • Unlinked rule errors
 *   • Memoization (including left‑recursion handling)
 *   • Tracing (entry, success, failure, recursion)
 *   • Name‑rule keyword reservation checks
 */
export function call(ctx: Ctx, name: string, rule: Rule | null): TreeValue {
  ctx.heartbeat()
  ctx.enter(name)
  try {
    if (rule === null) {
      throw ctx.failure(ctx.mark(), new ParseError(`rule not linked: ${name}`))
    }
    if (rule.shouldTrace()) {
      ctx.tracer().traceEntry(ctx)
    }

    if (!rule.isToken()) {
      ctx.nextToken()
    }
    const start = ctx.mark()
    const key = ctx.key(name, rule.isMemoizable())

    let tree: TreeValue = null
    const mark = ctx.mark()
    try {
      tree = doCall(ctx, name, rule)
    } catch (error) {
      if (isParseError(error)) {
        ctx.memoize(key, error as ParseError, start)
        if (rule.shouldTrace()) {
          ctx.tracer().traceFailure(ctx, name)
        }
      }
      ctx.reset(mark)
      throw error
    }
    const value = tree ? tree.toString() : name
    if (rule.isName && ctx.isKeyword(value)) {
      throw ctx.failure(
        ctx.mark(),
        new ParseError(`'${value}' is a reserved word`),
      )
    }

    ctx.memoize(key, tree, ctx.mark())
    if (rule.shouldTrace()) {
      ctx.tracer().traceSuccess(ctx)
    }
    return tree
  } finally {
    ctx.leave()
  }
}

/**
 * Core call logic: memo lookup, left‑recursion handling, or simple rule parse.
 *
 * NOTE: key is computed AFTER whitespace skip (post‑nextToken), matching the
 * TieXiu approach so that nested left‑recursive calls share the same LR key.
 */
function doCall(ctx: Ctx, name: string, rule: Rule): TreeValue {
  const key = ctx.key(name, rule.isMemoizable())
  const memo = ctx.memo(key)
  if (memo) {
    if (isBottomEntry(memo)) {
      if (rule.shouldTrace()) {
        ctx.tracer().traceFailure(ctx, name)
      }
      throw memo.value as ParseError
    }
    ctx.reset(memo.mark)
    return memo.value
  }

  if (rule.isLeftRecursive()) {
    return callRecursive(ctx, name, rule, key)
  }

  return rule.parse(ctx)
}

function callRecursive(
  ctx: Ctx,
  _name: string,
  rule: Rule,
  key: MemoKey,
): TreeValue {
  const start = ctx.mark()
  ctx.tracer().traceRecursion(ctx)
  ctx.memoize(key, BOTTOM, ctx.mark())

  let lastMark = start
  let lastTree: TreeValue = null

  while (!ctx.atEnd()) {
    ctx.reset(start)
    ctx.track(key)
    try {
      if (ctx.recursionDepthExceeded()) {
        throw ctx.failure(
          ctx.mark(),
          new ParseError(`left recursion depth exceeded for rule: ${key.name}`),
        )
      }

      try {
        const result = rule.parse(ctx)
        if (result === BOTTOM) break

        const endMark = ctx.mark()
        if (endMark <= lastMark) break

        lastMark = endMark
        lastTree = result
        ctx.memoize(key, lastTree, lastMark)
      } catch (error) {
        if (isParseError(error)) break
        throw error
      }
    } finally {
      ctx.untrack(key)
    }
  }

  ctx.reset(lastMark)
  ctx.memoize(key, lastTree as TreeValue, lastMark)

  if (lastTree === BOTTOM) {
    ctx.reset(start)
    return null
  }
  return lastTree
}
