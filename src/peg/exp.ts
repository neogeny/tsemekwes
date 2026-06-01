import type { Ctx } from "../context/ctx.js";
import {
  NamedAsList as NamedAsListTree,
  Named as NamedTree,
  NIL,
  OverrideAsList as OverrideAsListTree,
  Override as OverrideTree,
  Seq as SeqTree,
  Text as TextTree,
  type Tree,
} from "../trees/tree.js";
import { linkExp } from "./link.js";
import type { Rule } from "./rule.js";

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
}

export abstract class Exp {
  abstract readonly kind: ExpKind;

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
        return [];
      case ExpKind.Named:
      case ExpKind.NamedList:
        return [(this as unknown as NamedExp).exp];
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
        return [(this as unknown as UnaryExp).exp];
      case ExpKind.Join:
      case ExpKind.PositiveJoin:
      case ExpKind.Gather:
      case ExpKind.PositiveGather:
        return [
          (this as unknown as JoinExp).exp,
          (this as unknown as JoinExp).sep,
        ];
      case ExpKind.Sequence:
      case ExpKind.Choice:
        return (this as unknown as SeqExp).items;
      case ExpKind.RuleInclude:
        return (this as unknown as RuleIncludeExp).exp != null
          ? [(this as unknown as RuleIncludeExp).exp!]
          : [];
      default:
        throw new Error(`unhandled ExpKind: ${this.kind}`);
    }
  }

  parseAt(ctx: Ctx): Tree | null {
    switch (this.kind) {
      case ExpKind.Nil:
      case ExpKind.EmptyClosure:
        return NIL;

      case ExpKind.Cut:
        ctx.cut();
        return NIL;

      case ExpKind.Void:
        ctx.void_();
        return NIL;

      case ExpKind.Fail:
        ctx.fail();
        return null;

      case ExpKind.Dot: {
        const [ch, ok] = ctx.dot();
        if (!ok) return null;
        return new TextTree(ch);
      }

      case ExpKind.Eof: {
        if (ctx.parseEOF()) return NIL;
        ctx.failure(ctx.mark(), "expected end of input");
        return null;
      }

      case ExpKind.Eol: {
        if (ctx.matchEOL()) return NIL;
        ctx.failure(ctx.mark(), "expected EOL");
        return null;
      }

      case ExpKind.Token: {
        const exp = this as unknown as TokenExp;
        if (ctx.matchToken(exp.value)) return new TextTree(exp.value);
        ctx.failure(ctx.mark(), `expected token "${exp.value}"`);
        return null;
      }

      case ExpKind.Pattern: {
        const exp = this as unknown as PatternExp;
        const matched = ctx.matchPattern(exp.value);
        if (matched != null) return new TextTree(matched);
        return null;
      }

      case ExpKind.Constant: {
        const exp = this as unknown as ConstantExp;
        return ctx.constant(exp.value);
      }

      case ExpKind.Alert: {
        const exp = this as unknown as AlertExp;
        return new TextTree(exp.value);
      }

      case ExpKind.Call: {
        const exp = this as unknown as CallExp;
        return this.ruleCall(ctx, exp.name, exp.rule);
      }

      case ExpKind.Named: {
        const named = this as unknown as NamedExp;
        const result = named.exp.parseAt(ctx);
        if (result == null) return null;
        return new NamedTree(named.name, result);
      }

      case ExpKind.NamedList: {
        const named = this as unknown as NamedListExp;
        const result = named.exp.parseAt(ctx);
        if (result == null) return null;
        return new NamedAsListTree(named.name, result);
      }

      case ExpKind.Override: {
        const ovr = this as unknown as OverrideExp;
        const result = ovr.exp.parseAt(ctx);
        if (result == null) return null;
        return new OverrideTree(result);
      }

      case ExpKind.OverrideList: {
        const ovr = this as unknown as OverrideListExp;
        const result = ovr.exp.parseAt(ctx);
        if (result == null) return null;
        return new OverrideAsListTree(result);
      }

      case ExpKind.Group: {
        const group = this as unknown as GroupExp;
        return group.exp.parseAt(ctx);
      }

      case ExpKind.SkipGroup: {
        const skip = this as unknown as SkipGroupExp;
        const result = skip.exp.parseAt(ctx);
        if (result == null) return null;
        return NIL;
      }

      case ExpKind.Lookahead: {
        const la = this as unknown as LookaheadExp;
        const branch = ctx.mark();
        ctx.enterLookahead();
        const result = la.exp.parseAt(ctx);
        ctx.reset(branch);
        ctx.leaveLookahead();
        if (result == null) return null;
        return NIL;
      }

      case ExpKind.NegativeLookahead: {
        const la = this as unknown as NegativeLookaheadExp;
        const branch = ctx.mark();
        ctx.enterLookahead();
        const result = la.exp.parseAt(ctx);
        ctx.reset(branch);
        ctx.leaveLookahead();
        if (result != null) {
          ctx.failure(branch, "negative lookahead matched");
          return null;
        }
        return NIL;
      }

      case ExpKind.SkipTo: {
        const skip = this as unknown as SkipToExp;
        while (true) {
          const branch = ctx.mark();
          const result = skip.exp.parseAt(ctx);
          if (result != null) return result;
          ctx.reset(branch);
          const [_, ok] = ctx.next();
          if (!ok) {
            ctx.failure(branch, "skipTo failed");
            return null;
          }
        }
      }

      case ExpKind.Alt: {
        const alt = this as unknown as AltExp;
        return alt.exp.parseAt(ctx);
      }

      case ExpKind.Optional: {
        const opt = this as unknown as OptionalExp;
        const branch = ctx.mark();
        const result = opt.exp.parseAt(ctx);
        if (result != null) return result;
        ctx.reset(branch);
        return NIL;
      }

      case ExpKind.Closure: {
        const clo = this as unknown as ClosureExp;
        return this.repeat(ctx, clo.exp, false);
      }

      case ExpKind.PositiveClosure: {
        const clo = this as unknown as PositiveClosureExp;
        return this.repeat(ctx, clo.exp, true);
      }

      case ExpKind.Sequence: {
        const exp = this as unknown as SeqExp;
        const start = ctx.mark();
        const results: Tree[] = [];
        for (const item of exp.items) {
          if (item.kind === ExpKind.Cut) {
            ctx.cut();
            continue;
          }
          const result = item.parseAt(ctx);
          if (result == null) {
            ctx.reset(start);
            return null;
          }
          if (result !== NIL) {
            results.push(result);
          }
        }
        if (results.length === 0) return NIL;
        if (results.length === 1) return results[0];
        return new SeqTree(results);
      }

      case ExpKind.Choice: {
        const exp = this as unknown as ChoiceExp;
        return this.parseChoice(ctx, exp.items);
      }

      case ExpKind.Join: {
        const join = this as unknown as JoinExp;
        return this.repeatWithSep(ctx, join.exp, join.sep, false, true);
      }

      case ExpKind.PositiveJoin: {
        const join = this as unknown as PositiveJoinExp;
        return this.repeatWithSep(ctx, join.exp, join.sep, true, true);
      }

      case ExpKind.Gather: {
        const gather = this as unknown as GatherExp;
        return this.repeatWithSep(ctx, gather.exp, gather.sep, false, false);
      }

      case ExpKind.PositiveGather: {
        const gather = this as unknown as PositiveGatherExp;
        return this.repeatWithSep(ctx, gather.exp, gather.sep, true, false);
      }

      case ExpKind.RuleInclude: {
        const include = this as unknown as RuleIncludeExp;
        if (include.exp == null) {
          ctx.failure(ctx.mark(), `rule not linked: ${include.name}`);
          return null;
        }
        return include.exp.parseAt(ctx);
      }

      default:
        throw new Error(`unhandled ExpKind: ${this.kind}`);
    }
  }

  // --- Helpers extracted for clarity, may become overrides ---

  private ruleCall(ctx: Ctx, name: string, rule: Rule | null): Tree | null {
    if (rule == null) {
      ctx.failure(ctx.mark(), `rule not linked: ${name}`);
      return null;
    }
    // TODO: memo, left recursion, call stack
    ctx.enter(name);
    let result: Tree | null;
    if (rule.isToken()) {
      // Token rules: skip rule parse machinery, evaluate expression directly
      result = rule.exp.parseAt(ctx);
    } else {
      // Non-token rules: skip leading whitespace, then go through Rule.parse()
      // which handles fold + semantics + Node wrapping
      ctx.nextToken();
      result = rule.parse(ctx);
    }
    ctx.leave();
    return result;
  }

  private repeat(ctx: Ctx, exp: Exp, positive: boolean): Tree | null {
    const results: Tree[] = [];
    while (true) {
      const branch = ctx.mark();
      const result = exp.parseAt(ctx);
      if (result == null) {
        ctx.reset(branch);
        break;
      }
      if (result !== NIL) {
        results.push(result);
      }
    }
    if (positive && results.length === 0) {
      ctx.failure(ctx.mark(), "positive closure requires at least one match");
      return null;
    }
    if (results.length === 0) return NIL;
    if (results.length === 1) return results[0];
    return new SeqTree(results);
  }

  private repeatWithSep(
    ctx: Ctx,
    exp: Exp,
    sep: Exp,
    positive: boolean,
    keepSep: boolean,
  ): Tree | null {
    const results: Tree[] = [];
    const first = exp.parseAt(ctx);
    if (first == null) {
      if (positive) {
        ctx.failure(ctx.mark(), "join requires at least one match");
        return null;
      }
      return NIL;
    }
    if (first !== NIL) results.push(first);
    while (true) {
      const branch = ctx.mark();
      const sepResult = sep.parseAt(ctx);
      if (sepResult == null) {
        ctx.reset(branch);
        break;
      }
      if (keepSep && sepResult !== NIL) {
        results.push(sepResult);
      }
      const expResult = exp.parseAt(ctx);
      if (expResult == null) {
        ctx.reset(branch);
        break;
      }
      if (expResult !== NIL) {
        results.push(expResult);
      }
    }
    if (results.length === 0) return NIL;
    if (results.length === 1) return results[0];
    return new SeqTree(results);
  }

  private parseChoice(ctx: Ctx, options: Exp[]): Tree | null {
    for (const opt of options) {
      const branch = ctx.mark();
      ctx.cutStackPush();
      const result = opt.parseAt(ctx);
      const cutSeen = ctx.cutStackPop();
      if (result != null) {
        if (cutSeen) {
          ctx.cut();
        }
        return result;
      }
      ctx.reset(branch);
    }
    return null;
  }

  link(rules: Map<string, Rule>): void {
    linkExp(this, rules);
  }
}

// --- Concrete subclasses ---

// Leaf: no children, no data
export class NilExp extends Exp {
  readonly kind = ExpKind.Nil;
}

export class CutExp extends Exp {
  readonly kind = ExpKind.Cut;
}

export class VoidExp extends Exp {
  readonly kind = ExpKind.Void;
}

export class FailExp extends Exp {
  readonly kind = ExpKind.Fail;
}

export class DotExp extends Exp {
  readonly kind = ExpKind.Dot;
}

export class EofExp extends Exp {
  readonly kind = ExpKind.Eof;
}

export class EolExp extends Exp {
  readonly kind = ExpKind.Eol;
}

export class EmptyClosureExp extends Exp {
  readonly kind = ExpKind.EmptyClosure;
}

// Leaf: one data field
export class TokenExp extends Exp {
  readonly kind = ExpKind.Token;
  constructor(public value: string) {
    super();
  }
}

export class PatternExp extends Exp {
  readonly kind = ExpKind.Pattern;
  constructor(public value: string) {
    super();
  }
}

export class ConstantExp extends Exp {
  readonly kind = ExpKind.Constant;
  constructor(public value: any) {
    super();
  }
}

export class AlertExp extends Exp {
  readonly kind = ExpKind.Alert;
  constructor(
    public value: string,
    public level: number,
  ) {
    super();
  }
}

export class CallExp extends Exp {
  readonly kind = ExpKind.Call;
  constructor(
    public name: string,
    public rule: Rule | null = null,
  ) {
    super();
  }
}

// Unary: one child
export class NamedExp extends Exp {
  readonly kind = ExpKind.Named;
  constructor(
    public name: string,
    public exp: Exp,
  ) {
    super();
  }
}

export class NamedListExp extends Exp {
  readonly kind = ExpKind.NamedList;
  constructor(
    public name: string,
    public exp: Exp,
  ) {
    super();
  }
}

export class UnaryExp extends Exp {
  readonly kind = ExpKind.Override; // placeholder, set in subclasses
  constructor(public exp: Exp) {
    super();
  }
}

export class OverrideExp extends Exp {
  readonly kind = ExpKind.Override;
  constructor(public exp: Exp) {
    super();
  }
}

export class OverrideListExp extends Exp {
  readonly kind = ExpKind.OverrideList;
  constructor(public exp: Exp) {
    super();
  }
}

export class GroupExp extends Exp {
  readonly kind = ExpKind.Group;
  constructor(public exp: Exp) {
    super();
  }
}

export class SkipGroupExp extends Exp {
  readonly kind = ExpKind.SkipGroup;
  constructor(public exp: Exp) {
    super();
  }
}

export class LookaheadExp extends Exp {
  readonly kind = ExpKind.Lookahead;
  constructor(public exp: Exp) {
    super();
  }
}

export class NegativeLookaheadExp extends Exp {
  readonly kind = ExpKind.NegativeLookahead;
  constructor(public exp: Exp) {
    super();
  }
}

export class SkipToExp extends Exp {
  readonly kind = ExpKind.SkipTo;
  constructor(public exp: Exp) {
    super();
  }
}

export class AltExp extends Exp {
  readonly kind = ExpKind.Alt;
  constructor(public exp: Exp) {
    super();
  }
}

export class OptionalExp extends Exp {
  readonly kind = ExpKind.Optional;
  constructor(public exp: Exp) {
    super();
  }
}

export class ClosureExp extends Exp {
  readonly kind = ExpKind.Closure;
  constructor(public exp: Exp) {
    super();
  }
}

export class PositiveClosureExp extends Exp {
  readonly kind = ExpKind.PositiveClosure;
  constructor(public exp: Exp) {
    super();
  }
}

// Binary: two children
export class JoinExp extends Exp {
  readonly kind = ExpKind.Join;
  constructor(
    public exp: Exp,
    public sep: Exp,
  ) {
    super();
  }
}

export class PositiveJoinExp extends Exp {
  readonly kind = ExpKind.PositiveJoin;
  constructor(
    public exp: Exp,
    public sep: Exp,
  ) {
    super();
  }
}

export class GatherExp extends Exp {
  readonly kind = ExpKind.Gather;
  constructor(
    public exp: Exp,
    public sep: Exp,
  ) {
    super();
  }
}

export class PositiveGatherExp extends Exp {
  readonly kind = ExpKind.PositiveGather;
  constructor(
    public exp: Exp,
    public sep: Exp,
  ) {
    super();
  }
}

// Collection: array of children
export class SeqExp extends Exp {
  readonly kind = ExpKind.Sequence;
  constructor(public items: Exp[]) {
    super();
  }
}

export class ChoiceExp extends Exp {
  readonly kind = ExpKind.Choice;
  constructor(public items: Exp[]) {
    super();
  }
}

// Include
export class RuleIncludeExp extends Exp {
  readonly kind = ExpKind.RuleInclude;
  constructor(
    public name: string,
    public exp: Exp | null = null,
  ) {
    super();
  }
}
