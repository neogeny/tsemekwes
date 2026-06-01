import { Exp, ExpKind } from "./exp.js";

export function isNullable(exp: Exp): boolean {
  switch (exp.kind) {
    case ExpKind.Call:
      return false;
    case ExpKind.RuleInclude: {
      const cs = exp.children();
      return cs.length > 0 ? isNullable(cs[0]) : false;
    }
    case ExpKind.Group:
    case ExpKind.SkipGroup:
    case ExpKind.Lookahead:
    case ExpKind.NegativeLookahead:
    case ExpKind.Override:
    case ExpKind.OverrideList:
    case ExpKind.Named:
    case ExpKind.NamedList:
    case ExpKind.Alt:
      return isNullable(unboxExp(exp));
    case ExpKind.Optional:
      return true;
    case ExpKind.Closure:
      return true;
    case ExpKind.PositiveClosure:
      return isNullable(unboxExp(exp));
    case ExpKind.Join:
    case ExpKind.Gather:
      return true;
    case ExpKind.PositiveJoin:
    case ExpKind.PositiveGather:
      return isNullable(unboxExp(exp));
    case ExpKind.Choice: {
      for (const opt of exp.children()) {
        if (isNullable(opt)) return true;
      }
      return false;
    }
    case ExpKind.Sequence: {
      for (const item of exp.children()) {
        if (!isNullable(item)) return false;
      }
      return true;
    }
    case ExpKind.Eol:
    case ExpKind.Void:
    case ExpKind.Nil:
    case ExpKind.EmptyClosure:
    case ExpKind.Cut:
    case ExpKind.Constant:
    case ExpKind.Alert:
      return true;
    case ExpKind.Token:
    case ExpKind.Pattern:
    case ExpKind.Dot:
    case ExpKind.Eof:
    case ExpKind.Fail:
    case ExpKind.SkipTo:
      return false;
    default:
      throw new Error(`isNullable: unhandled ExpKind ${exp.kind}`);
  }
}

export function unboxExp(exp: Exp): Exp {
  switch (exp.kind) {
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
    case ExpKind.PositiveGather: {
      const cs = exp.children();
      return cs[0];
    }
    default:
      throw new Error(`unboxExp: unhandled ExpKind ${exp.kind}`);
  }
}
