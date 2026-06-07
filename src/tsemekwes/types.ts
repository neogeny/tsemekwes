// Bridge types — mirrors the serialization in src/peg/json.ts
// and the structure of grammar/tatsu.json.

// ── Base ───────────────────────────────────────────────────────────

export interface Exp {}

export interface BoxExp extends Exp {
  exp: AnyExp
}

export interface NamedBoxExp extends BoxExp {
  name: string
}

// ── Leaf: no payload ───────────────────────────────────────────────

export interface NullExp extends Exp {}

export interface CutExp extends Exp {}

export interface VoidExp extends Exp {}

export interface FailExp extends Exp {}

export interface DotExp extends Exp {}

export interface EofExp extends Exp {}

export interface EolExp extends Exp {}

export interface EmptyClosureExp extends Exp {}

// ── Leaf: scalar payload ───────────────────────────────────────────

export interface TokenExp extends Exp {
  token: string
}

export interface PatternExp extends Exp {
  pattern: string
}

export interface ConstantExp extends Exp {
  literal: unknown
}

export interface AlertExp extends Exp {
  literal: string
  level: number
}

// ── Call / reference ───────────────────────────────────────────────

export interface CallExp extends Exp {
  name: string
}

export interface RuleIncludeExp extends Exp {
  name: string
}

// ── Unary: one child ───────────────────────────────────────────────

export interface GroupExp extends BoxExp {}

export interface SkipGroupExp extends BoxExp {}

export interface LookaheadExp extends BoxExp {}

export interface NegativeLookaheadExp extends BoxExp {}

export interface SkipToExp extends BoxExp {}

export interface AltExp extends BoxExp {}

export interface OptionalExp extends BoxExp {}

export interface ClosureExp extends BoxExp {}

export interface PositiveClosureExp extends BoxExp {}

export interface OverrideExp extends BoxExp {}

export interface OverrideListExp extends BoxExp {}

// ── Named unary: one child + name ──────────────────────────────────

export interface NamedExp extends NamedBoxExp {}

export interface NamedListExp extends NamedBoxExp {}

// ── Binary: two children ───────────────────────────────────────────

export interface JoinExp extends BoxExp {
  sep: AnyExp
}

export interface PositiveJoinExp extends BoxExp {
  sep: AnyExp
}

export interface GatherExp extends BoxExp {
  sep: AnyExp
}

export interface PositiveGatherExp extends BoxExp {
  sep: AnyExp
}

// ── N-ary: array of children ───────────────────────────────────────

export interface SeqExp extends Exp {
  sequence: AnyExp[]
}

export interface ChoiceExp extends Exp {
  options: AnyExp[]
}

// ── Discriminated union of all expression shapes ───────────────────

export type AnyExp =
  | NullExp
  | CutExp
  | VoidExp
  | FailExp
  | DotExp
  | EofExp
  | EolExp
  | EmptyClosureExp
  | TokenExp
  | PatternExp
  | ConstantExp
  | AlertExp
  | CallExp
  | RuleIncludeExp
  | GroupExp
  | SkipGroupExp
  | LookaheadExp
  | NegativeLookaheadExp
  | SkipToExp
  | AltExp
  | OptionalExp
  | ClosureExp
  | PositiveClosureExp
  | OverrideExp
  | OverrideListExp
  | NamedExp
  | NamedListExp
  | JoinExp
  | PositiveJoinExp
  | GatherExp
  | PositiveGatherExp
  | SeqExp
  | ChoiceExp

// ── Rule ───────────────────────────────────────────────────────────

export interface Rule {
  name: string
  params: string[]
  kwparams: Record<string, string>
  decorators: string[]
  base: string | null
  is_name: boolean
  is_tokn: boolean
  no_memo: boolean
  no_stak: boolean
  is_memo: boolean
  is_lrec: boolean
  exp: AnyExp
}

// ── Grammar ────────────────────────────────────────────────────────

export interface Grammar {
  name: string
  directives: Record<string, unknown>
  keywords: string[]
  rules: Rule[]
}
