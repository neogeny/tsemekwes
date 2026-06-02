import { type Exp, ExpKind } from "../exp"
import { isNullable, unboxExp } from "./nullability"
import type { Rule } from "../rule"
import type { CallExp } from "../call"

function callableRuleIDs(exp: Exp, ruleIndex: Map<Rule, number>): number[] {
  switch (exp.kind) {
    case ExpKind.Call: {
      const call = exp as CallExp
      if (call.rule != null) {
        const id = ruleIndex.get(call.rule)
        if (id !== undefined) {
          return [id]
        }
      }
      return []
    }
    case ExpKind.RuleInclude: {
      const cs = exp.children()
      return cs.length > 0 ? callableRuleIDs(cs[0], ruleIndex) : []
    }
    case ExpKind.Group:
    case ExpKind.SkipGroup:
    case ExpKind.Lookahead:
    case ExpKind.NegativeLookahead:
    case ExpKind.Override:
    case ExpKind.OverrideList:
    case ExpKind.Named:
    case ExpKind.NamedList:
    case ExpKind.SkipTo:
    case ExpKind.Alt:
    case ExpKind.Optional:
    case ExpKind.Closure:
    case ExpKind.PositiveClosure:
    case ExpKind.Join:
    case ExpKind.PositiveJoin:
    case ExpKind.Gather:
    case ExpKind.PositiveGather:
      return callableRuleIDs(unboxExp(exp), ruleIndex)
    case ExpKind.Choice: {
      const result: number[] = []
      for (const opt of exp.children()) {
        result.push(...callableRuleIDs(opt, ruleIndex))
      }
      return result
    }
    case ExpKind.Sequence: {
      const result: number[] = []
      for (const item of exp.children()) {
        if (item.kind === ExpKind.Cut) continue
        result.push(...callableRuleIDs(item, ruleIndex))
        if (!isNullable(item)) break
      }
      return result
    }
    case ExpKind.Token:
    case ExpKind.Pattern:
    case ExpKind.Dot:
    case ExpKind.Eof:
    case ExpKind.Eol:
    case ExpKind.Void:
    case ExpKind.Fail:
    case ExpKind.Nil:
    case ExpKind.EmptyClosure:
    case ExpKind.Cut:
    case ExpKind.Constant:
    case ExpKind.Alert:
      return []
    default:
      throw new Error(`callableRuleIDs: unhandled ExpKind ${exp.kind}`)
  }
}

function tarjanSCC(edges: number[][]): number[][] {
  const n = edges.length
  const index = new Array<number>(n).fill(-1)
  const lowlink = new Array<number>(n).fill(0)
  const onStack = new Array<boolean>(n).fill(false)
  const stack: number[] = []
  let currentIndex = 0
  const sccs: number[][] = []

  function strongconnect(v: number): void {
    index[v] = currentIndex
    lowlink[v] = currentIndex
    currentIndex++
    stack.push(v)
    onStack[v] = true

    for (const w of edges[v]) {
      if (index[w] === -1) {
        strongconnect(w)
        if (lowlink[w] < lowlink[v]) {
          lowlink[v] = lowlink[w]
        }
      } else if (onStack[w]) {
        if (index[w] < lowlink[v]) {
          lowlink[v] = index[w]
        }
      }
    }

    if (lowlink[v] === index[v]) {
      const scc: number[] = []
      while (true) {
        const w = stack.pop()
        if (w === undefined) break
        onStack[w] = false
        scc.push(w)
        if (w === v) break
      }
      sccs.push(scc)
    }
  }

  for (let v = 0; v < n; v++) {
    if (index[v] === -1) {
      strongconnect(v)
    }
  }
  return sccs
}

function findCyclesInSCC(
  edges: number[][],
  scc: number[],
  start: number,
): number[][] {
  const sccSet = new Set(scc)
  const cycles: number[][] = []

  function dfs(node: number, path: number[]): void {
    for (const p of path) {
      if (p === node) {
        cycles.push([...path])
        return
      }
    }
    path = [...path, node]
    for (const child of edges[node]) {
      if (sccSet.has(child)) {
        dfs(child, [...path])
      }
    }
  }

  dfs(start, [])
  return cycles
}

export function markLeftRecursion(rules: Rule[]): void {
  const ruleIndex = new Map<Rule, number>()
  for (let i = 0; i < rules.length; i++) {
    rules[i].isLrec = false
    rules[i].isMemo = !rules[i].noMemo
    ruleIndex.set(rules[i], i)
  }

  const edges: number[][] = new Array(rules.length)
  const ruleNames: string[] = new Array(rules.length)
  for (let i = 0; i < rules.length; i++) {
    edges[i] = callableRuleIDs(rules[i].exp, ruleIndex)
    ruleNames[i] = rules[i].name
  }

  const sccs = tarjanSCC(edges)

  for (const scc of sccs) {
    if (scc.length > 1) {
      for (const id of scc) {
        rules[id].isMemo = false
      }

      const leaders = new Set<number>(scc)

      for (const start of scc) {
        const cycles = findCyclesInSCC(edges, scc, start)
        for (const cycle of cycles) {
          const cycleSet = new Set(cycle)
          for (const id of leaders) {
            if (!cycleSet.has(id)) {
              leaders.delete(id)
            }
          }
          if (leaders.size === 0) break
        }
        if (leaders.size === 0) break
      }

      if (leaders.size === 0) {
        for (const id of scc) {
          leaders.add(id)
        }
      }

      const leaderIDs = [...leaders].sort((a, b) =>
        ruleNames[a].localeCompare(ruleNames[b]),
      )
      rules[leaderIDs[0]].isLrec = true
    } else if (scc.length === 1) {
      const id = scc[0]
      for (const child of edges[id]) {
        if (child === id) {
          rules[id].isLrec = true
          rules[id].isMemo = false
          break
        }
      }
    }
  }
}
