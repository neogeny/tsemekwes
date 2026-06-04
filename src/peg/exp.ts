import { asjson, asjsons, JSONSerializable } from "@util/asjson"
import { type Ctx, isParseFailure, ParseError } from "@context"
import { TreeArray } from "@trees"
import { closure, closureWithSep } from "./parsing/closure"
import { prettyPrintExp } from "./pretty"
import { serializeExp } from "./json"
import { parseChoice, parseOptional } from "./parsing/choice"
import { sequence } from "./parsing/sequence"

import {
  Named as NamedTree,
  NamedAsList as NamedAsListTree,
  Override as OverrideTree,
  OverrideAsList as OverrideAsListTree,
  type TreeValue,
} from "../trees/tree.js"

export enum ExpKind {
  Nil = "Nil",
  Cut = "Cut",
  Void = "Void",
  Fail = "Fail",
  Dot = "Dot",
  Eof = "Eof",
  Eol = "Eol",
  EmptyClosure = "EmptyClosure",
  Token = "Token",
  Pattern = "Pattern",
  Constant = "Constant",
  Alert = "Alert",
  Call = "Call",
  Named = "Named",
  NamedList = "NamedList",
  Override = "Override",
  OverrideList = "OverrideList",
  Group = "Group",
  SkipGroup = "SkipGroup",
  Lookahead = "Lookahead",
  NegativeLookahead = "NegativeLookahead",
  SkipTo = "SkipTo",
  Alt = "Alt",
  Optional = "Optional",
  Closure = "Closure",
  PositiveClosure = "PositiveClosure",
  Sequence = "Sequence",
  Choice = "Choice",
  Join = "Join",
  PositiveJoin = "PositiveJoin",
  Gather = "Gather",
  PositiveGather = "PositiveGather",
  RuleInclude = "RuleInclude",
  Rule = "Rule",
  Grammar = "Grammar",
}

// noinspection JSUnusedGlobalSymbols
export abstract class Exp implements JSONSerializable {
  abstract readonly kind: ExpKind
  la: string[] = []

  children(): Exp[] {
    switch (this.kind) {
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
        return []

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
      case ExpKind.PositiveClosure:
        return [(this as unknown as BoxExp).exp]

      case ExpKind.Join:
      case ExpKind.PositiveJoin:
      case ExpKind.Gather:
      case ExpKind.PositiveGather:
        return [
          (this as unknown as SepBoxExp).exp,
          (this as unknown as SepBoxExp).sep,
        ]
      case ExpKind.Sequence:
        return (this as unknown as SeqExp).sequence
      case ExpKind.Choice:
        return (this as unknown as ChoiceExp).options
      case ExpKind.RuleInclude: {
        const innerExp = (this as unknown as RuleIncludeExp).exp
        return innerExp != null ? [innerExp] : []
      }
      case ExpKind.Grammar:
        return []
      case ExpKind.Rule:
        return (this as unknown as BoxExp).exp.children()
      default:
        throw new Error(`unhandled ExpKind: ${this.kind}`)
    }
  }

  parse(ctx: Ctx): TreeValue {
    switch (this.kind) {
      case ExpKind.Nil:
        return null
      case ExpKind.EmptyClosure:
        return new TreeArray([])

      case ExpKind.Cut:
        ctx.cut()
        return null

      case ExpKind.Void:
        ctx.matchVoid()
        return null

      case ExpKind.Fail:
        ctx.matchFail()
        return null

      case ExpKind.Dot: {
        const [ch, ok] = ctx.matchDot()
        if (!ok) return null
        return ch.toString()
      }

      case ExpKind.Eof: {
        return ctx.matchEOF()
      }

      case ExpKind.Eol: {
        return ctx.matchEOL()
      }

      case ExpKind.Token: {
        const token = this as unknown as TokenExp
        return ctx.matchToken(token.value)
      }

      case ExpKind.Pattern: {
        const pattern = this as unknown as PatternExp
        return ctx.matchPattern(pattern.value)
      }

      case ExpKind.Constant: {
        const exp = this as unknown as ConstantExp
        return ctx.mtchConstant(exp.value)
      }

      case ExpKind.Alert: {
        const exp = this as unknown as AlertExp
        return exp.value
      }

      case ExpKind.Named: {
        const named = this as unknown as NamedExp
        const tree = named.exp.parse(ctx)
        return new NamedTree(named.name, tree)
      }

      case ExpKind.NamedList: {
        const named = this as unknown as NamedListExp
        const tree = named.exp.parse(ctx)
        return new NamedAsListTree(named.name, tree)
      }

      case ExpKind.Override: {
        const ovr = this as unknown as OverrideExp
        const result = ovr.exp.parse(ctx)
        if (result == null) return null
        return new OverrideTree(result)
      }

      case ExpKind.OverrideList: {
        const ovr = this as unknown as OverrideListExp
        const result = ovr.exp.parse(ctx)
        if (result == null) return null
        return new OverrideAsListTree(result)
      }

      case ExpKind.Group: {
        const group = this as unknown as GroupExp
        return group.exp.parse(ctx)
      }

      case ExpKind.SkipGroup: {
        const skip = this as unknown as SkipGroupExp
        skip.exp.parse(ctx)
        return null
      }

      case ExpKind.Lookahead: {
        const la = this as unknown as LookaheadExp
        const mark = ctx.mark()

        ctx.enterLookahead()
        try {
          la.exp.parse(ctx)
        } finally {
          ctx.reset(mark)
          ctx.leaveLookahead()
        }
        return null
      }

      case ExpKind.NegativeLookahead: {
        const la = this as unknown as NegativeLookaheadExp
        const mark = ctx.mark()
        ctx.enterLookahead()
        try {
          la.exp.parse(ctx)
        } catch (error) {
          if (isParseFailure(error)) {
            return null
          }
          throw error
        } finally {
          ctx.reset(mark)
          ctx.leaveLookahead()
        }
        throw ctx.failure(
          mark,
          new ParseError("negative lookahead should not match"),
        )
      }

      case ExpKind.SkipTo: {
        const skip = this as unknown as SkipToExp
        const mark = ctx.mark()
        while (!ctx.atEnd()) {
          try {
            return skip.exp.parse(ctx)
          } catch (err) {
            if (!isParseFailure(err)) throw err
          }
          const [_, ok] = ctx.matchDot()
          if (!ok) break
        }
        ctx.reset(mark)
        throw ctx.failure(mark, new ParseError(`cannot skipTo i-> ${skip.exp}`))
      }

      case ExpKind.Alt: {
        const alt = this as unknown as AltExp
        return alt.exp.parse(ctx)
      }

      case ExpKind.Optional: {
        const opt = this as unknown as OptionalExp
        return parseOptional(ctx, opt.exp)
      }

      case ExpKind.Closure: {
        const clo = this as unknown as ClosureExp
        return closure(ctx, clo.exp, false)
      }

      case ExpKind.PositiveClosure: {
        const clo = this as unknown as PositiveClosureExp
        return closure(ctx, clo.exp, true)
      }

      case ExpKind.Sequence: {
        const seq = this as unknown as SeqExp
        return sequence(ctx, seq)
      }

      case ExpKind.Choice: {
        const choice = this as unknown as ChoiceExp
        return parseChoice(ctx, choice)
      }

      case ExpKind.Join: {
        const join = this as unknown as JoinExp
        return closureWithSep(ctx, join.exp, join.sep, false, true)
      }

      case ExpKind.PositiveJoin: {
        const join = this as unknown as PositiveJoinExp
        return closureWithSep(ctx, join.exp, join.sep, true, true)
      }

      case ExpKind.Gather: {
        const gather = this as unknown as GatherExp
        return closureWithSep(ctx, gather.exp, gather.sep, false, false)
      }

      case ExpKind.PositiveGather: {
        const gather = this as unknown as PositiveGatherExp
        return closureWithSep(ctx, gather.exp, gather.sep, true, false)
      }

      case ExpKind.RuleInclude: {
        const rinc = this as unknown as RuleIncludeExp
        if (rinc.exp == null) {
          throw ctx.failure(
            ctx.mark(),
            new ParseError(`rule not linked: ${rinc.name}`),
          )
        }
        return rinc.exp.parse(ctx)
      }

      default:
        throw new Error(`parse() unhandled ExpKind: ${this.kind}`)
    }
  }

  public pretty(): string {
    return prettyPrintExp(this)
  }

  public asjson(): object {
    return asjson(this)
  }

  public asjsons(): string {
    return asjsons(this)
  }

  public __json__(seen?: Set<object>): any {
    return serializeExp(this, seen)
  }

  lookaheadStr(): string {
    return this.la.map((s) => `\`${s}\``).join(" ")
  }
}

export abstract class BoxExp extends Exp {
  constructor(public exp: Exp) {
    super()
  }
}

export abstract class NamedBoxExp extends BoxExp {
  constructor(
    public name: string,
    public exp: Exp,
  ) {
    super(exp)
  }
}

export abstract class SepBoxExp extends BoxExp {
  constructor(
    public exp: Exp,
    public sep: Exp,
  ) {
    super(exp)
  }
}

export class NilExp extends Exp {
  readonly kind = ExpKind.Nil
}

export class CutExp extends Exp {
  readonly kind = ExpKind.Cut
}

export class VoidExp extends Exp {
  readonly kind = ExpKind.Void
}

export class FailExp extends Exp {
  readonly kind = ExpKind.Fail
}

export class DotExp extends Exp {
  readonly kind = ExpKind.Dot
}

export class EofExp extends Exp {
  readonly kind = ExpKind.Eof
}

export class EolExp extends Exp {
  readonly kind = ExpKind.Eol
}

export class EmptyClosureExp extends Exp {
  readonly kind = ExpKind.EmptyClosure
}

// Leaf: one data field
export class TokenExp extends Exp {
  readonly kind = ExpKind.Token
  constructor(public value: string) {
    super()
  }
}

export class PatternExp extends Exp {
  readonly kind = ExpKind.Pattern
  constructor(public value: string) {
    super()
  }
}

export class ConstantExp extends Exp {
  readonly kind = ExpKind.Constant
  constructor(public value: unknown) {
    super()
  }
}

export class AlertExp extends Exp {
  readonly kind = ExpKind.Alert
  constructor(
    public value: string,
    public level: number,
  ) {
    super()
  }
}

// Unary: one child
export class NamedExp extends NamedBoxExp {
  readonly kind = ExpKind.Named
}

export class NamedListExp extends NamedBoxExp {
  readonly kind = ExpKind.NamedList
}

export class OverrideExp extends BoxExp {
  readonly kind = ExpKind.Override
}

export class OverrideListExp extends BoxExp {
  readonly kind = ExpKind.OverrideList
}

export class GroupExp extends BoxExp {
  readonly kind = ExpKind.Group
}

export class SkipGroupExp extends BoxExp {
  readonly kind = ExpKind.SkipGroup
}

export class LookaheadExp extends BoxExp {
  readonly kind = ExpKind.Lookahead
}

export class NegativeLookaheadExp extends BoxExp {
  readonly kind = ExpKind.NegativeLookahead
}

export class SkipToExp extends BoxExp {
  readonly kind = ExpKind.SkipTo
}

export class AltExp extends BoxExp {
  readonly kind = ExpKind.Alt
}

export class OptionalExp extends BoxExp {
  readonly kind = ExpKind.Optional
}

export class ClosureExp extends BoxExp {
  readonly kind = ExpKind.Closure
  constructor(public exp: Exp) {
    super(exp)
  }
}

export class PositiveClosureExp extends BoxExp {
  readonly kind = ExpKind.PositiveClosure
  constructor(public exp: Exp) {
    super(exp)
  }
}

export class JoinExp extends SepBoxExp {
  readonly kind = ExpKind.Join
}

export class PositiveJoinExp extends SepBoxExp {
  readonly kind = ExpKind.PositiveJoin
}

export class GatherExp extends SepBoxExp {
  readonly kind = ExpKind.Gather
}

export class PositiveGatherExp extends SepBoxExp {
  readonly kind = ExpKind.PositiveGather
}

export class SeqExp extends Exp {
  readonly kind = ExpKind.Sequence
  constructor(public sequence: Exp[]) {
    super()
  }
}

export class ChoiceExp extends Exp {
  readonly kind = ExpKind.Choice
  constructor(public options: Exp[]) {
    super()
  }
}

export class RuleIncludeExp extends Exp {
  readonly kind = ExpKind.RuleInclude
  constructor(
    public name: string,
    public exp: Exp | null = null,
  ) {
    super()
  }
}
