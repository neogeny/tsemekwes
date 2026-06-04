import { asjson } from "@util/asjson"
import {
  type AlertExp,
  type ChoiceExp,
  type ClosureExp,
  type ConstantExp,
  type Exp,
  ExpKind,
  type GatherExp,
  type GroupExp,
  type JoinExp,
  type LookaheadExp,
  type NamedExp,
  type NamedListExp,
  type NegativeLookaheadExp,
  type OptionalExp,
  type OverrideExp,
  type OverrideListExp,
  type PatternExp,
  type PositiveClosureExp,
  type PositiveGatherExp,
  type PositiveJoinExp,
  type RuleIncludeExp,
  type SeqExp,
  type SkipGroupExp,
  type SkipToExp,
  type TokenExp,
} from "./exp.js"
import type { Grammar } from "./grammar.js"
import type { Rule } from "./rule.js"
import type { CallExp } from "./call"

function mapClass(
  cls: string,
  ...fields: [string, any][]
): Record<string, unknown> {
  const out: Record<string, any> = { __class__: cls }
  for (let kv of fields) {
    out[kv[0]] = kv[1]
  }
  return out
}

export function serializeExp(
  exp: Exp,
  seen?: Set<object>,
): Record<string, unknown> {
  switch (exp.kind) {
    case ExpKind.Token:
      return mapClass("Token", ["token", asjson((exp as TokenExp).value, seen)])
    case ExpKind.Pattern:
      return mapClass("Pattern", [
        "pattern",
        asjson((exp as PatternExp).value, seen),
      ])
    case ExpKind.Constant:
      return mapClass("Constant", [
        "literal",
        asjson((exp as ConstantExp).value, seen),
      ])
    case ExpKind.Alert:
      return mapClass(
        "Alert",
        ["literal", asjson((exp as AlertExp).value, seen)],
        ["level", asjson((exp as AlertExp).level, seen)],
      )
    case ExpKind.Dot:
      return mapClass("Dot")
    case ExpKind.Eof:
      return mapClass("EOF")
    case ExpKind.Eol:
      return mapClass("EOL")
    case ExpKind.Fail:
      return mapClass("Fail")
    case ExpKind.Void:
      return mapClass("Void")
    case ExpKind.Nil:
      return mapClass("Null")
    case ExpKind.Cut:
      return mapClass("Cut")
    case ExpKind.EmptyClosure:
      return mapClass("EmptyClosure")
    case ExpKind.Call:
      return mapClass("Call", ["name", asjson((exp as CallExp).name, seen)])
    case ExpKind.RuleInclude:
      return mapClass("RuleInclude", [
        "name",
        asjson((exp as RuleIncludeExp).name, seen),
      ])
    case ExpKind.Group:
      return mapClass("Group", ["exp", serializeExp((exp as GroupExp).exp)])
    case ExpKind.SkipGroup:
      return mapClass("SkipGroup", [
        "exp",
        serializeExp((exp as SkipGroupExp).exp),
      ])
    case ExpKind.Lookahead:
      return mapClass("Lookahead", [
        "exp",
        serializeExp((exp as LookaheadExp).exp),
      ])
    case ExpKind.NegativeLookahead:
      return mapClass("NegativeLookahead", [
        "exp",
        serializeExp((exp as NegativeLookaheadExp).exp),
      ])
    case ExpKind.SkipTo:
      return mapClass("SkipTo", ["exp", serializeExp((exp as SkipToExp).exp)])
    case ExpKind.Alt:
      return mapClass("Option", ["exp", serializeExp((exp as OverrideExp).exp)])
    case ExpKind.Optional:
      return mapClass("Optional", [
        "exp",
        serializeExp((exp as OptionalExp).exp),
      ])
    case ExpKind.Closure:
      return mapClass("Closure", ["exp", serializeExp((exp as ClosureExp).exp)])
    case ExpKind.PositiveClosure:
      return mapClass("PositiveClosure", [
        "exp",
        serializeExp((exp as PositiveClosureExp).exp),
      ])
    case ExpKind.Override:
      return mapClass("Override", [
        "exp",
        serializeExp((exp as OverrideExp).exp),
      ])
    case ExpKind.OverrideList:
      return mapClass("OverrideList", [
        "exp",
        serializeExp((exp as OverrideListExp).exp),
      ])
    case ExpKind.Named:
      return mapClass(
        "Named",
        ["name", asjson((exp as NamedExp).name, seen)],
        ["exp", serializeExp((exp as NamedExp).exp)],
      )
    case ExpKind.NamedList:
      return mapClass(
        "NamedList",
        ["name", asjson((exp as NamedListExp).name, seen)],
        ["exp", serializeExp((exp as NamedListExp).exp)],
      )
    case ExpKind.Join:
      return mapClass(
        "Join",
        ["exp", serializeExp((exp as JoinExp).exp)],
        ["sep", serializeExp((exp as JoinExp).sep)],
      )
    case ExpKind.PositiveJoin:
      return mapClass(
        "PositiveJoin",
        ["exp", serializeExp((exp as PositiveJoinExp).exp)],
        ["sep", serializeExp((exp as PositiveJoinExp).sep)],
      )
    case ExpKind.Gather:
      return mapClass(
        "Gather",
        ["exp", serializeExp((exp as GatherExp).exp)],
        ["sep", serializeExp((exp as GatherExp).sep)],
      )
    case ExpKind.PositiveGather:
      return mapClass(
        "PositiveGather",
        ["exp", serializeExp((exp as PositiveGatherExp).exp)],
        ["sep", serializeExp((exp as PositiveGatherExp).sep)],
      )
    case ExpKind.Sequence:
      return mapClass("Sequence", [
        "sequence",
        (exp as SeqExp).sequence.map((item) => serializeExp(item)),
      ])
    case ExpKind.Choice:
      return mapClass("Choice", [
        "options",
        (exp as ChoiceExp).options.map((item) => serializeExp(item)),
      ])
    default:
      throw new Error(`modelToJSON: unhandled ExpKind: ${exp.kind}`)
  }
}

export function serializeRule(
  rule: Rule,
  seen?: Set<object>,
): Record<string, unknown> {
  const kwp: Record<string, string> = {}
  for (const [k, v] of rule.kwParams) {
    kwp[k] = v
  }
  return {
    __class__: "Rule",
    name: rule.name,
    exp: serializeExp(rule.exp, seen),
    params: [...rule.params],
    kwparams: kwp,
    decorators: [...rule.decorators],
    base: rule.base,
    is_name: rule.isName,
    is_tokn: rule.isTokn,
    no_memo: rule.noMemo,
    no_stak: rule.noStak,
    is_memo: rule.isMemo,
    is_lrec: rule.isLrec,
  }
}

function serializeDirectives(dirs: string[][]): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [k, v] of dirs) {
    let value: unknown = v
    switch (v) {
      case "true":
      case "True":
        value = true
        break
      case "false":
      case "False":
        value = false
        break
      case "null":
      case "None":
        value = null
        break
    }
    out[k] = value
  }
  return out
}

export function serializeGrammar(
  g: Grammar,
  seen?: Set<object>,
): Record<string, unknown> {
  return {
    __class__: "Grammar",
    name: g.name,
    directives: serializeDirectives(g.directives),
    keywords: [...g.keywords],
    rules: g.rules.map((r) => serializeRule(r, seen)),
  }
}
