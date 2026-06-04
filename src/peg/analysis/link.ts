import {asjsons} from "@util/asjson";
import {
  ExpKind,
  type Exp,
  type BoxExp,
  type SepBoxExp,
  type ChoiceExp,
  type RuleIncludeExp,
  type SeqExp,
} from "../exp"
import type { Rule } from "../rule"
import { LinkError } from "../error"
import type { Grammar } from "../grammar"
import type { CallExp } from "../call"

export function linkExp(exp: Exp | null, rules: Map<string, Rule>): void {
  if (exp == null) return
  switch (exp.kind) {
    case ExpKind.Call: {
      const call = exp as CallExp
      const rule = rules.get(call.name)
      if (!rule) {
        throw new LinkError(
            `call to undefined rule: ${call.name}\n${asjsons(rules)}
            `)
      }
      call.rule = rule
      return
    }
    case ExpKind.RuleInclude: {
      const ri = exp as RuleIncludeExp
      const rule = rules.get(ri.name)
      if (!rule)
        throw new LinkError(
          `rule include references undefined rule: ${ri.name}`,
        )
      ri.exp = rule.exp
      return
    }
    // Leaves — nothing to link
    case ExpKind.Nil:
    case ExpKind.Cut:
    case ExpKind.Void:
    case ExpKind.Fail:
    case ExpKind.Dot:
    case ExpKind.Eof:
    case ExpKind.Eol:
    case ExpKind.EmptyClosure:
    case ExpKind.Token:
    case ExpKind.Pattern:
    case ExpKind.Constant:
    case ExpKind.Alert:
      return
    // Unary — recurse into child
    case ExpKind.Named:
    case ExpKind.NamedList:
    case ExpKind.Override:
    case ExpKind.OverrideList:
    case ExpKind.Group:
    case ExpKind.SkipGroup:
    case ExpKind.Lookahead:
    case ExpKind.NegativeLookahead:
    case ExpKind.SkipTo:
    case ExpKind.Alt:
    case ExpKind.Optional:
    case ExpKind.Closure:
    case ExpKind.PositiveClosure: {
      const box = exp as BoxExp
      linkExp(box.exp, rules)
      return
    }
    // Binary — recurse into both
    case ExpKind.Join:
    case ExpKind.PositiveJoin:
    case ExpKind.Gather:
    case ExpKind.PositiveGather: {
      const box = exp as SepBoxExp
      linkExp(box.exp, rules)
      linkExp(box.sep, rules)
      return
    }
    // Collection — recurse into all
    case ExpKind.Sequence:
      for (const item of (exp as SeqExp).sequence) {
        linkExp(item, rules)
      }
      return
    case ExpKind.Choice: {
      for (const opt of (exp as ChoiceExp).options) {
        linkExp(opt, rules)
      }
      return
    }
    default:
      throw new Error(`unhandled ExpKind: ${exp.kind}`)
  }
}

export function linkRule(rule: Rule, rules: Map<string, Rule>): void {
  linkExp(rule.exp, rules)
}

export function linkGrammar(grammar: Grammar): void {
  const rulemap = grammar.ruleMap()
  for (const rule of grammar.rules) {
    linkRule(rule, rulemap)
  }
}
