import {
  type AltExp,
  AltExp as AltExpCls,
  type ChoiceExp,
  ChoiceExp as ChoiceExpCls,
  type ClosureExp,
  ClosureExp as ClosureExpCls,
  type Exp,
  ExpKind,
  type GatherExp,
  GatherExp as GatherExpCls,
  type GroupExp,
  type JoinExp,
  JoinExp as JoinExpCls,
  type LookaheadExp,
  LookaheadExp as LookaheadExpCls,
  type NamedExp,
  NamedExp as NamedExpCls,
  type NamedListExp,
  NamedListExp as NamedListExpCls,
  type NegativeLookaheadExp,
  NegativeLookaheadExp as NegativeLookaheadExpCls,
  type OptionalExp,
  OptionalExp as OptionalExpCls,
  type OverrideExp,
  OverrideExp as OverrideExpCls,
  OverrideListExp as OverrideListExpCls,
  type PositiveClosureExp,
  PositiveClosureExp as PositiveClosureExpCls,
  type PositiveGatherExp,
  PositiveGatherExp as PositiveGatherExpCls,
  type PositiveJoinExp,
  PositiveJoinExp as PositiveJoinExpCls,
  type RuleIncludeExp,
  RuleIncludeExp as RuleIncludeExpCls,
  type SeqExp,
  SeqExp as SeqExpCls,
  type SkipGroupExp,
  SkipGroupExp as SkipGroupExpCls,
  type SkipToExp,
  SkipToExp as SkipToExpCls,
} from "./exp.js"

export function optimizeExp(exp: Exp): Exp {
  switch (exp.kind) {
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
    case ExpKind.Call:
    case ExpKind.NameMeta:
    case ExpKind.IntMeta:
    case ExpKind.UIntMeta:
    case ExpKind.FloatMeta:
    case ExpKind.BoolMeta:
      return exp

    case ExpKind.Group:
      return optimizeExp((exp as GroupExp).exp)

    case ExpKind.Named:
      return new NamedExpCls(
        (exp as NamedExp).name,
        optimizeExp((exp as NamedExp).exp),
      )
    case ExpKind.NamedList:
      return new NamedListExpCls(
        (exp as NamedListExp).name,
        optimizeExp((exp as NamedListExp).exp),
      )
    case ExpKind.Override:
      return new OverrideExpCls(optimizeExp((exp as OverrideExp).exp))
    case ExpKind.OverrideList:
      return new OverrideListExpCls(optimizeExp((exp as OverrideExp).exp))
    case ExpKind.SkipGroup:
      return new SkipGroupExpCls(optimizeExp((exp as SkipGroupExp).exp))
    case ExpKind.Lookahead:
      return new LookaheadExpCls(optimizeExp((exp as LookaheadExp).exp))
    case ExpKind.NegativeLookahead:
      return new NegativeLookaheadExpCls(
        optimizeExp((exp as NegativeLookaheadExp).exp),
      )
    case ExpKind.SkipTo:
      return new SkipToExpCls(optimizeExp((exp as SkipToExp).exp))
    case ExpKind.Alt:
      return new AltExpCls(optimizeExp((exp as AltExp).exp))
    case ExpKind.Optional:
      return new OptionalExpCls(optimizeExp((exp as OptionalExp).exp))
    case ExpKind.Closure:
      return new ClosureExpCls(optimizeExp((exp as ClosureExp).exp))
    case ExpKind.PositiveClosure:
      return new PositiveClosureExpCls(
        optimizeExp((exp as PositiveClosureExp).exp),
      )

    case ExpKind.Join:
      return new JoinExpCls(
        optimizeExp((exp as JoinExp).exp),
        optimizeExp((exp as JoinExp).sep),
      )
    case ExpKind.PositiveJoin:
      return new PositiveJoinExpCls(
        optimizeExp((exp as PositiveJoinExp).exp),
        optimizeExp((exp as PositiveJoinExp).sep),
      )
    case ExpKind.Gather:
      return new GatherExpCls(
        optimizeExp((exp as GatherExp).exp),
        optimizeExp((exp as GatherExp).sep),
      )
    case ExpKind.PositiveGather:
      return new PositiveGatherExpCls(
        optimizeExp((exp as PositiveGatherExp).exp),
        optimizeExp((exp as PositiveGatherExp).sep),
      )

    case ExpKind.Sequence: {
      const seq = (exp as SeqExp).sequence.map(optimizeExp)
      if (seq.length === 1) return seq[0]
      return new SeqExpCls(seq)
    }

    case ExpKind.Choice: {
      const opts = (exp as ChoiceExp).options.map(optimizeExp)
      if (opts.length === 1) return opts[0]
      return new ChoiceExpCls(opts)
    }

    case ExpKind.RuleInclude: {
      const e = exp as RuleIncludeExp
      if (e.exp != null) {
        return new RuleIncludeExpCls(e.name, optimizeExp(e.exp))
      }
      return exp
    }

    default:
      throw new Error(`optimizeExp: unhandled ExpKind: ${exp.kind}`)
  }
}
