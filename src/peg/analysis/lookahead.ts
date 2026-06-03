import {
  type AlertExp,
  type ConstantExp,
  type Exp,
  ExpKind,
  type PatternExp,
  type SeqExp,
  type TokenExp,
} from "../exp"
import { type CallExp } from "../call"
import { isNullable, unboxExp } from "./nullability"

const sentinelEOF = "\uFF04"

export function computeLA(exp: Exp): string[] {
  if (exp.la.length > 0) return exp.la
  let la: string[]

  switch (exp.kind) {
    case ExpKind.Token:
      la = [(exp as TokenExp).value]
      break
    case ExpKind.Pattern:
      la = [(exp as PatternExp).value]
      break
    case ExpKind.Constant:
      la = [String((exp as ConstantExp).value)]
      break
    case ExpKind.Alert:
      la = [(exp as AlertExp).value]
      break
    case ExpKind.Eof:
      la = [sentinelEOF]
      break

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
      la = computeLA(unboxExp(exp))
      break

    case ExpKind.Sequence: {
      la = []
      for (const item of (exp as SeqExp).sequence) {
        if (item.kind === ExpKind.Cut) continue
        la = mergeLA(la, computeLA(item))
        if (!isNullable(item)) break
      }
      break
    }

    case ExpKind.Choice: {
      la = []
      for (const child of exp.children()) {
        la = mergeLA(la, computeLA(child))
      }
      break
    }

    case ExpKind.Call: {
      const call = exp as unknown as CallExp
      la = call.rule ? [`\u2192${call.name}`] : []
      break
    }

    case ExpKind.RuleInclude: {
      const cs = exp.children()
      la = cs.length > 0 ? computeLA(cs[0]) : []
      break
    }

    default:
      la = []
      break
  }

  exp.la = la
  return la
}

function mergeLA(a: string[], b: string[]): string[] {
  if (a.length === 0) return b
  if (b.length === 0) return a
  const seen = new Set(a)
  for (const s of b) {
    if (!seen.has(s)) {
      seen.add(s)
      a.push(s)
    }
  }
  a.sort()
  return a
}
