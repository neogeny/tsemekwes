# META_UPDATE: @name, @int, @uint, @float, @bool + Semantics Refactoring for TS'emekwes

## Session Context

TatSu v5.21.1 added `@name`, `@int`, `@uint`, `@float`, `@bool` meta-expressions.
OGoPEGo (Go port) has a complete implementation at `pkg/peg/model_meta.go` + cursor
methods in `pkg/input/cursor_rune.go` / `cursor_str.go` + 40 tests.
TS'emekwes (TypeScript/Bun port at `x/tsemekwes`) does not yet have any meta
expression support or the semantics interface refactoring.

All files under `x/tsemekwes/src/` unless otherwise noted.

---

## Implementation Plan (bottom-up)

### Layer 1 — ExpKind enum variants + 5 leaf classes

**File: `peg/exp.ts`** lines 17–53 (ExpKind enum)

Add 5 variants (after `ExpKind.EmptyClosure`, before `ExpKind.Token`):

```typescript
NameMeta = "NameMeta",
IntMeta = "IntMeta",
UIntMeta = "UIntMeta",
FloatMeta = "FloatMeta",
BoolMeta = "BoolMeta",
```

**File: `peg/exp.ts`** — add 5 leaf classes after `EmptyClosureExp` (line 399):

```typescript
export class NameMetaExp extends Exp {
  readonly kind = ExpKind.NameMeta
}
export class IntMetaExp extends Exp {
  readonly kind = ExpKind.IntMeta
}
export class UIntMetaExp extends Exp {
  readonly kind = ExpKind.UIntMeta
}
export class FloatMetaExp extends Exp {
  readonly kind = ExpKind.FloatMeta
}
export class BoolMetaExp extends Exp {
  readonly kind = ExpKind.BoolMeta
}
```

**File: `peg/exp.ts`** — `children()` method (lines 60–115): add to leaf group:

```typescript
case ExpKind.NameMeta:
case ExpKind.IntMeta:
case ExpKind.UIntMeta:
case ExpKind.FloatMeta:
case ExpKind.BoolMeta:
  return []
```

**File: `peg/exp.ts`** — `parse()` method (lines 117–322): add 5 cases before `default`:

```typescript
case ExpKind.NameMeta: {
  const result = ctx.matchName()
  if (result === null) return null
  return result
}
case ExpKind.IntMeta: {
  const result = ctx.matchInt()
  if (result === null) return null
  return result
}
case ExpKind.UIntMeta: {
  const result = ctx.matchUInt()
  if (result === null) return null
  return result
}
case ExpKind.FloatMeta: {
  const result = ctx.matchFloat()
  if (result === null) return null
  return result
}
case ExpKind.BoolMeta: {
  const result = ctx.matchBool()
  if (result === null) return null
  return result
}
```

---

### Layer 2 — Cursor interface + StrCursor implementation

**File: `input/cursor.ts`** — add 5 methods to the `Cursor` interface (after `matchEOL`):

```typescript
matchName(): [string, boolean]
matchInt(): [string, boolean]
matchUInt(): [string, boolean]
matchFloat(): [string, boolean]
matchBool(): [string, boolean]
```

**File: `input/cursor-str.ts`** — implement 5 methods on `StrCursor` class.

Port character-by-character logic from OGoPEGo's `pkg/input/cursor_rune.go` lines
293–419 and `cursor_str.go` lines 401–531. Pure character scanning — no regex.

Key behaviors (must match TatSu exactly):
- `@name`: first char `is_alphabetic()` or `_` or `namechars`; rest `is_alphanumeric()` or `namechars`. Already have `isName()` for validation, but need a consuming `matchName()`.
- `@int`: optional `+`/`-`, then digits with optional internal `_`
- `@uint`: digits only with optional internal `_`
- `@float`: optional sign, digits, optional `.` + digits, optional `e`/`E` + optional sign + digits
- `@bool`: match `true`/`false` (case-sensitive, no True/False unlike Python)

Return `["", false]` on no match (cursor unchanged), `[matched, true]` on match
(cursor advanced).  Use shared helper functions at module level (like existing
`takeLinebreakLen`, `takeNonNewlineWhitespaceLen`).

**Key helpers to port** (from OGoPEGo `cursor_rune.go`):
- `consumeUInt(text, pos)`: scan digits + optional underscores, return consumed length
- `consumeSign(text, pos)`: scan optional `+`/`-`, return consumed length
- `consumeSignedInt(text, pos)`: sign + uint
- `cleanNumber(s)`: strip underscores and leading zeros from matched text

---

### Layer 3 — Ctx interface + Core implementation

**File: `context/ctx.ts`** — add 5 methods to the `Ctx` interface:

```typescript
matchName(): string | null
matchInt(): string | null
matchUInt(): string | null
matchFloat(): string | null
matchBool(): string | null
```

**File: `context/core.ts`** — implement 5 methods on `Core` class, following
`matchToken`/`matchPattern` pattern (nextToken, cursor call, trace, return or throw):

```typescript
matchName(): string | null {
  this.nextToken()
  const start = this.mark()
  const [slice, ok] = this._cursor.matchName()
  if (ok) {
    this._tracer.traceMatch(this, "@name", slice)
    return slice
  }
  this.reset(start)
  this._tracer.traceNoMatch(this, "", "@name")
  throw this.failure(start, new ParseError("expected @name"))
}
// matchInt, matchUInt, matchFloat, matchBool follow same pattern
// For trace view string use "@int", "@uint", etc.
```

---

### Layer 4 — Semantics refactoring (match OGoPEGo)

**File: `config/config.ts`** — replace `SemanticsFunc` type with `GrammarSemantics` interface:

```typescript
export interface GrammarSemantics {
  apply(node: TreeValue, ruleName: string, params: string[]): [TreeValue, boolean]
}
```

Update `Cfg.semantics` field type from `SemanticsFunc | null` to `GrammarSemantics | null`.

**File: `peg/grammar.ts`** — change `semantics` constructor param and field from `SemanticsFunc` to `GrammarSemantics`.

**File: `peg/analysis/compile.ts`** — add `EBNFGrammarSemantics` class near bottom,
before or after `compileGrammar`. Implement `GrammarSemantics` interface with
meta expression node production:

```typescript
export class EBNFGrammarSemantics implements GrammarSemantics {
  apply(node: TreeValue, ruleName: string, params: string[]): [TreeValue, boolean] {
    if (node instanceof NodeTree && node.typeName === "Meta") {
      const text = String(node.tree)
      switch (text) {
        case "name": return [new NameMetaExp(), true]
        case "int": return [new IntMetaExp(), true]
        case "uint": return [new UIntMetaExp(), true]
        case "float": return [new FloatMetaExp(), true]
        case "bool": return [new BoolMetaExp(), true]
      }
    }
    return [node, false]
  }
}
```

Update `compileGrammar` to create grammar with `new Grammar(name, rules, directives, keywords, undefined, new EBNFGrammarSemantics())` instead of no semantics.

**File: `context/core.ts`** — update `applySemantics` to use interface method:

```typescript
applySemantics(
  node: TreeValue,
  ruleName: string,
  params: string[],
): [TreeValue, boolean] {
  const sem = this.cfg().semantics
  if (sem !== null) {
    return sem.apply(node, ruleName, params)
  }
  return [node, false]
}
```

---

### Layer 5 — EBNF compilation (`compile.ts`)

**File: `peg/analysis/compile.ts`** — `compileExp()` switch (lines 223–401):

The boot grammar parses `@name` etc. from EBNF via semantics. When
`EBNFGrammarSemantics.apply` creates `NameMetaExp`, the compile flow should
pass it through. Since `NameMetaExp` is a leaf expression (like `NilExp`),
it needs no special compile path — the semantics produce it directly.

For JSON import path, add cases in `compileExp()` switch before the `default`:

```typescript
case "NameMeta":
  return new NameMetaExp()
case "IntMeta":
  return new IntMetaExp()
case "UIntMeta":
  return new UIntMetaExp()
case "FloatMeta":
  return new FloatMetaExp()
case "BoolMeta":
  return new BoolMetaExp()
```

---

### Layer 6 — JSON serialization/deserialization

**File: `peg/json.ts`** — `serializeExp()` switch (lines 48–181): add 5 cases:

```typescript
case ExpKind.NameMeta:
  return mapClass("NameMeta")
case ExpKind.IntMeta:
  return mapClass("IntMeta")
case ExpKind.UIntMeta:
  return mapClass("UIntMeta")
case ExpKind.FloatMeta:
  return mapClass("FloatMeta")
case ExpKind.BoolMeta:
  return mapClass("BoolMeta")
```

**File: `json/import.ts`** — `modelFromJSON()` switch (lines 182–293): add 5 cases:

```typescript
case "NameMeta":
  return new NameMetaExp()
case "IntMeta":
  return new IntMetaExp()
case "UIntMeta":
  return new UIntMetaExp()
case "FloatMeta":
  return new FloatMetaExp()
case "BoolMeta":
  return new BoolMetaExp()
```

---

### Layer 7 — Analysis passes (5 files)

**File: `peg/analysis/nullability.ts`** — `isNullable()`: meta types match nothing
(nullable = false). Add to the `case ExpKind.Token:` / `Pattern:` / `Dot:` / `Eof:` /
`Fail:` / `SkipTo:` group (lines 54–60):

```typescript
case ExpKind.NameMeta:
case ExpKind.IntMeta:
case ExpKind.UIntMeta:
case ExpKind.FloatMeta:
case ExpKind.BoolMeta:
```

**File: `peg/analysis/leftrec.ts`** — `callableRuleIDs()`: meta types are leaf terminals.
Add to the leaf group (lines 56–68):

```typescript
case ExpKind.NameMeta:
case ExpKind.IntMeta:
case ExpKind.UIntMeta:
case ExpKind.FloatMeta:
case ExpKind.BoolMeta:
  return []
```

**File: `peg/analysis/link.ts`** — `linkExp()`: meta types have no children to link.
Add to the leaf group (lines 42–54):

```typescript
case ExpKind.NameMeta:
case ExpKind.IntMeta:
case ExpKind.UIntMeta:
case ExpKind.FloatMeta:
case ExpKind.BoolMeta:
  return
```

**File: `peg/analysis/lookahead.ts`** — `computeLA()`: meta types produce `@name` etc.
as lookahead hint. Add to the `default` group (lines 86–88) or create explicit cases:

```typescript
case ExpKind.NameMeta:
  la = ["@name"]; break
case ExpKind.IntMeta:
  la = ["@int"]; break
case ExpKind.UIntMeta:
  la = ["@uint"]; break
case ExpKind.FloatMeta:
  la = ["@float"]; break
case ExpKind.BoolMeta:
  la = ["@bool"]; break
```

**File: `peg/optimize.ts`** — `optimizeExp()`: meta types are leaf terminals.
Add to the leaf group (lines 46–59):

```typescript
case ExpKind.NameMeta:
case ExpKind.IntMeta:
case ExpKind.UIntMeta:
case ExpKind.FloatMeta:
case ExpKind.BoolMeta:
  return exp
```

---

### Layer 8 — Pretty-print

**File: `peg/pretty.ts`** — `prettyPrintExp()` switch: add 5 cases (near `ExpKind.Dot` etc.):

```typescript
case ExpKind.NameMeta:
  return "@name"
case ExpKind.IntMeta:
  return "@int"
case ExpKind.UIntMeta:
  return "@uint"
case ExpKind.FloatMeta:
  return "@float"
case ExpKind.BoolMeta:
  return "@bool"
```

---

### Layer 9 — Tests

**File: `input/__tests__/cursor-str.test.ts`** — add ~40 cursor-level tests
following existing patterns (lines 1–370 for reference):

- `test matchName success` / `test matchName failure`
- `test matchInt with positive` / `negative` / `underscores`
- `test matchUInt basic` / `with underscores` / `fail on sign`
- `test matchFloat integer` / `decimal` / `scientific` / `fail`
- `test matchBool true` / `false` / `fail`

Port the 40 tests from OGoPEGo:
- `pkg/input/cursor_rune_test.go` lines 562–710
- `pkg/input/cursor_str_test.go` lines 285–432

**Integration tests** at `src/__tests__/` — add tests for:

- EBNF grammar with `@name` → compile → parse input
- JSON import of grammar with `NameMeta` exp → compile → parse
- Round-trip JSON: serialize then deserialize grammar with meta types
- Failure cases: `@int` on non-numeric input, `@bool` on `"foo"` etc.

---

## Build & Verification

```bash
bun run typecheck    # Must compile without errors
bun run lint         # No new warnings  
bun run test         # All existing tests pass + new tests pass
```

The tally of new tests should be ~40 for cursor methods + 5–10 integration tests.

---

## Testing Approach Summary

| Test level | Location | Count | What it covers |
|-----------|----------|-------|----------------|
| Unit (cursor) | `cursor-str.test.ts` | ~40 | Individual match methods: success, failure, edge cases |
| Integration | `__tests__/*.test.ts` | ~10 | Full pipeline: grammar compile + parse + JSON round-trip |

---

## Key Design Decisions

1. **Return `string | null` from Ctx match methods**: Matched text as string (not
   typed `number`/`boolean`). The PEG TreeValue system handles string results
   uniformly. TatSu returns typed Python values, but TS'emekwes tree doesn't need
   number/bool variants.

2. **Cursor methods return `[string, boolean]`**: Matches existing tsemekwes
   convention (`matchToken`, `matchPattern`). Consumed text on success, `["", false]`
   on failure (cursor unchanged).

3. **No ParseError variants for meta**: Reuse existing `ParseError("expected @name")`.
   Error tracing already shows the expression name through `traceMatch`/`traceNoMatch`.

4. **Enum variant names use `Meta` suffix**: `NameMeta` etc., not `MetaName` — follows
   TatSu JSON `__class__` naming. `Meta` suffix distinguishes from any future bare
   `Name` expression type.

5. **Semantics interface replaces function type**: `GrammarSemantics` with `apply()`
   method, matching OGoPEGo's refactoring. `EBNFGrammarSemantics` class owns the
   `"Meta"` → concrete type dispatch on boot grammar parse tree.

6. **No separate export function for meta JSON**: `serializeExp` switch handles meta
   types via `mapClass("NameMeta")` just like `mapClass("Dot")` etc. — no special
   `__export__` field needed.

---

## OGoPEGo Reference Files (study these)

| Concept | File |
|---------|------|
| Cursor interface (5 match methods) | `pkg/input/cursor.go:63-72` |
| RuneCursor implementation | `pkg/input/cursor_rune.go:293-419` |
| StrCursor implementation | `pkg/input/cursor_str.go:401-531` |
| Ctx interface + CoreCtx | `pkg/context/ctx.go` + `ctx_core.go` |
| EBNF compile dispatch | `pkg/peg/compile.go:377-390,520-531` |
| JSON import | `pkg/peg/import.go:582-595` |
| JSON export | `pkg/peg/export.go:58-67` |
| Semantics interface | `pkg/config/config.go` (`GrammarSemantics`) |
| EBNFGrammarSemantics | `pkg/peg/boot.go` |
| Model meta types | `pkg/peg/model_meta.go` |
| Cursor tests | `pkg/input/cursor_rune_test.go:562-710` |
| StrCursor tests | `pkg/input/cursor_str_test.go:285-432` |
