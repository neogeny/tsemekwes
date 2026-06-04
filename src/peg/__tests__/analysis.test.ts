import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { linkRule } from "@peg"
import { markLeftRecursion } from "../analysis/leftrec.js"
import { isNullable } from "../analysis/nullability.js"
import { CallExp } from "../call"
import {
  AlertExp,
  AltExp,
  ChoiceExp,
  ClosureExp,
  ConstantExp,
  CutExp,
  DotExp,
  EmptyClosureExp,
  EofExp,
  EolExp,
  type Exp,
  ExpKind,
  FailExp,
  GatherExp,
  GroupExp,
  JoinExp,
  LookaheadExp,
  NamedExp,
  NamedListExp,
  NegativeLookaheadExp,
  NilExp,
  OptionalExp,
  OverrideExp,
  OverrideListExp,
  PatternExp,
  PositiveClosureExp,
  PositiveGatherExp,
  PositiveJoinExp,
  RuleIncludeExp,
  SeqExp,
  SkipGroupExp,
  SkipToExp,
  TokenExp,
  VoidExp,
} from "../exp.js"
import { Rule } from "../rule.js"

function wrap(exp: Exp, kind: ExpKind): Exp {
  switch (kind) {
    case ExpKind.Group:
      return new GroupExp(exp)
    case ExpKind.SkipGroup:
      return new SkipGroupExp(exp)
    case ExpKind.Lookahead:
      return new LookaheadExp(exp)
    case ExpKind.NegativeLookahead:
      return new NegativeLookaheadExp(exp)
    case ExpKind.Override:
      return new OverrideExp(exp)
    case ExpKind.OverrideList:
      return new OverrideListExp(exp)
    case ExpKind.Named:
      return new NamedExp("x", exp)
    case ExpKind.NamedList:
      return new NamedListExp("x", exp)
    case ExpKind.Alt:
      return new AltExp(exp)
    default:
      throw new Error(`unexpected wrapper kind: ${kind}`)
  }
}

describe("isNullable", () => {
  it("Call is not nullable", () => {
    assert.equal(isNullable(new CallExp("foo")), false)
  })

  it("RuleInclude delegates to inner exp", () => {
    const inner = new NilExp()
    const ri = new RuleIncludeExp("foo", inner)
    assert.equal(isNullable(ri), true)

    const ri2 = new RuleIncludeExp("foo")
    assert.equal(isNullable(ri2), false)
  })

  it("wrapper types delegate to inner exp", () => {
    const alwaysNullable = [
      ExpKind.Group,
      ExpKind.SkipGroup,
      ExpKind.Lookahead,
      ExpKind.NegativeLookahead,
      ExpKind.Override,
      ExpKind.OverrideList,
      ExpKind.Named,
      ExpKind.NamedList,
      ExpKind.Alt,
    ]
    for (const kind of alwaysNullable) {
      assert.equal(
        isNullable(wrap(new NilExp(), kind)),
        true,
        `${kind} with nullable inner should be nullable`,
      )
      assert.equal(
        isNullable(wrap(new TokenExp("a"), kind)),
        false,
        `${kind} with non-nullable inner should not be nullable`,
      )
    }
  })

  it("Optional is nullable", () => {
    assert.equal(isNullable(new OptionalExp(new TokenExp("a"))), true)
  })

  it("Closure is nullable", () => {
    assert.equal(isNullable(new ClosureExp(new TokenExp("a"))), true)
  })

  it("PositiveClosure depends on inner", () => {
    assert.equal(isNullable(new PositiveClosureExp(new NilExp())), true)
    assert.equal(isNullable(new PositiveClosureExp(new TokenExp("a"))), false)
  })

  it("Join and Gather are nullable", () => {
    const sep = new TokenExp(",")
    assert.equal(isNullable(new JoinExp(new TokenExp("a"), sep)), true)
    assert.equal(isNullable(new GatherExp(new TokenExp("a"), sep)), true)
  })

  it("PositiveJoin and PositiveGather depend on inner", () => {
    const sep = new TokenExp(",")
    const inner = new NilExp()
    assert.equal(isNullable(new PositiveJoinExp(inner, sep)), true)
    assert.equal(isNullable(new PositiveGatherExp(inner, sep)), true)
    const nonNull = new TokenExp("a")
    assert.equal(isNullable(new PositiveJoinExp(nonNull, sep)), false)
    assert.equal(isNullable(new PositiveGatherExp(nonNull, sep)), false)
  })

  it("Choice: nullable if any option is nullable", () => {
    const c1 = new ChoiceExp([new TokenExp("a"), new NilExp()])
    assert.equal(isNullable(c1), true)
    const c2 = new ChoiceExp([new TokenExp("a"), new TokenExp("b")])
    assert.equal(isNullable(c2), false)
  })

  it("Sequence: nullable only if all items are nullable", () => {
    const s1 = new SeqExp([new NilExp(), new CutExp(), new VoidExp()])
    assert.equal(isNullable(s1), true)
    const s2 = new SeqExp([new NilExp(), new TokenExp("a")])
    assert.equal(isNullable(s2), false)
  })

  it("trivially nullable types", () => {
    const trivial: Exp[] = [
      new EolExp(),
      new VoidExp(),
      new NilExp(),
      new EmptyClosureExp(),
      new CutExp(),
      new ConstantExp(null),
      new AlertExp("msg", 1),
    ]
    for (const exp of trivial) {
      assert.equal(isNullable(exp), true, `${exp.kind} should be nullable`)
    }
  })

  it("trivially non-nullable types", () => {
    const nonNull: Exp[] = [
      new TokenExp("a"),
      new PatternExp("."),
      new DotExp(),
      new EofExp(),
      new FailExp(),
      new SkipToExp(new TokenExp("a")),
    ]
    for (const exp of nonNull) {
      assert.equal(isNullable(exp), false, `${exp.kind} should not be nullable`)
    }
  })
})

describe("markLeftRecursion", () => {
  function makeRule(name: string, exp: Exp): Rule {
    return new Rule(name, exp)
  }

  function linkRules(rules: Rule[]): void {
    const m = new Map(rules.map((r) => [r.name, r]))
    for (const r of rules) {
      linkRule(r, m)
    }
  }

  it("no rules: no error", () => {
    markLeftRecursion([])
  })

  function assertLrecCheck(
    rules: Rule[],
    expected: Record<string, { lrec: boolean; memo: boolean }>,
  ): void {
    linkRules(rules)
    markLeftRecursion(rules)
    for (const [name, exp] of Object.entries(expected)) {
      const r = rules.find((x) => x.name === name)
      assert.ok(r, `Rule ${name} not found`)
      assert.equal(r.isLrec, exp.lrec, `${name}.isLrec`)
      assert.equal(r.isMemo, exp.memo, `${name}.isMemo`)
    }
  }

  it("single rule with direct self-call", () => {
    const a = makeRule("A", new CallExp("A"))
    assertLrecCheck([a], { A: { lrec: true, memo: false } })
  })

  it("single rule without self-call", () => {
    const a = makeRule("A", new TokenExp("hello"))
    assertLrecCheck([a], { A: { lrec: false, memo: true } })
  })

  it("direct left recursion: A → A '+' number", () => {
    const alt = new ChoiceExp([
      new SeqExp([new CallExp("A"), new TokenExp("+"), new CallExp("number")]),
      new CallExp("number"),
    ])
    const number = makeRule("number", new PatternExp("[0-9]+"))
    const a = makeRule("A", alt)
    assertLrecCheck([a, number], {
      A: { lrec: true, memo: false },
      number: { lrec: false, memo: true },
    })
  })

  it("indirect left recursion: A → B, B → A", () => {
    const a = makeRule("A", new CallExp("B"))
    const b = makeRule("B", new SeqExp([new CallExp("A"), new TokenExp("a")]))
    assertLrecCheck([a, b], {
      A: { lrec: true, memo: false },
      B: { lrec: false, memo: false },
    })
  })

  it("mutual recursion through 3 rules: A → B → C → A", () => {
    const a = makeRule("A", new CallExp("B"))
    const b = makeRule("B", new CallExp("C"))
    const c = makeRule("C", new SeqExp([new CallExp("A"), new TokenExp("x")]))
    assertLrecCheck([a, b, c], {
      A: { lrec: true, memo: false },
      B: { lrec: false, memo: false },
      C: { lrec: false, memo: false },
    })
  })

  it("no left recursion in terminal-only rules", () => {
    const start = makeRule(
      "start",
      new SeqExp([new CallExp("expr"), new EofExp()]),
    )
    const expr = makeRule("expr", new TokenExp("42"))
    assertLrecCheck([start, expr], {
      start: { lrec: false, memo: true },
      expr: { lrec: false, memo: true },
    })
  })

  it("callableRuleIDs skips Cut in Sequence", () => {
    const seq = new SeqExp([new CutExp(), new CallExp("B")])
    const a = makeRule("A", seq)
    const b = makeRule("B", new TokenExp("b"))
    assertLrecCheck([a, b], {
      A: { lrec: false, memo: true },
      B: { lrec: false, memo: true },
    })
  })
})
