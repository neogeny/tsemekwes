// Copyright © 2017-2026 Juancarlo Añez (apalala@gmail.com)
// SPDX-License-Identifier: Apache-2.0
/// Bridge types — mirrors the serialization in src/peg/json.ts
/// and the structure of grammar/tatsu.json.

/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface BaseExp {}

export interface BoxExp extends BaseExp {
  exp: Exp;
}

export interface NamedBoxExp extends BoxExp {
  name: string;
}

export interface NullExp extends BaseExp {}

export interface CutExp extends BaseExp {}

export interface VoidExp extends BaseExp {}

export interface FailExp extends BaseExp {}

export interface DotExp extends BaseExp {}

export interface EofExp extends BaseExp {}

export interface EolExp extends BaseExp {}

export interface EmptyClosureExp extends BaseExp {}

// ── Leaf: scalar payload ───────────────────────────────────────────

export interface TokenExp extends BaseExp {
  token: string;
}

export interface PatternExp extends BaseExp {
  pattern: string;
}

export interface ConstantExp extends BaseExp {
  literal: unknown;
}

export interface AlertExp extends BaseExp {
  literal: string;
  level: number;
}

// ── Call / reference ───────────────────────────────────────────────

export interface CallExp extends BaseExp {
  name: string;
}

export interface RuleIncludeExp extends BaseExp {
  name: string;
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
  sep: Exp;
}

export interface PositiveJoinExp extends BoxExp {
  sep: Exp;
}

export interface GatherExp extends BoxExp {
  sep: Exp;
}

export interface PositiveGatherExp extends BoxExp {
  sep: Exp;
}

// ── N-ary: array of children ───────────────────────────────────────

export interface SeqExp extends BaseExp {
  sequence: Exp[];
}

export interface ChoiceExp extends BaseExp {
  options: Exp[];
}

// ── Discriminated union of all expression shapes ───────────────────

export type Exp =
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
  | ChoiceExp;

// ── Rule ───────────────────────────────────────────────────────────

export interface Rule {
  name: string;
  params: string[];
  kwparams: Record<string, string>;
  decorators: string[];
  base: string | null;
  is_name: boolean;
  is_tokn: boolean;
  no_memo: boolean;
  no_stak: boolean;
  is_memo: boolean;
  is_lrec: boolean;
  exp: Exp;
}

// ── Grammar ────────────────────────────────────────────────────────

export interface Grammar {
  name: string;
  directives: Record<string, unknown>;
  keywords: string[];
  rules: Rule[];
}
