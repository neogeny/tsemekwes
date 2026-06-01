import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	AlertExp,
	CallExp,
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
	GroupExp,
	JoinExp,
	LookaheadExp,
	NamedExp,
	NilExp,
	OptionalExp,
	OverrideExp,
	PatternExp,
	RuleIncludeExp,
	SeqExp,
	TokenExp,
	VoidExp,
} from "./exp.js";

describe("ExpKind", () => {
	it("has 33 variants", () => {
		const keys = Object.keys(ExpKind).filter((k) => Number.isNaN(Number(k)));
		assert.equal(keys.length, 33);
	});
});

describe("Exp subclasses", () => {
	it("NilExp has correct kind", () => {
		assert.equal(new NilExp().kind, ExpKind.Nil);
	});

	it("CutExp has correct kind", () => {
		assert.equal(new CutExp().kind, ExpKind.Cut);
	});

	it("FailExp has correct kind", () => {
		assert.equal(new FailExp().kind, ExpKind.Fail);
	});

	it("TokenExp stores value", () => {
		const exp = new TokenExp("hello");
		assert.equal(exp.kind, ExpKind.Token);
		assert.equal(exp.value, "hello");
	});

	it("PatternExp stores value", () => {
		const exp = new PatternExp("\\d+");
		assert.equal(exp.kind, ExpKind.Pattern);
		assert.equal(exp.value, "\\d+");
	});

	it("ConstantExp stores value", () => {
		const exp = new ConstantExp(42);
		assert.equal(exp.kind, ExpKind.Constant);
		assert.equal(exp.value, 42);
	});

	it("AlertExp stores value and level", () => {
		const exp = new AlertExp("warning", 1);
		assert.equal(exp.kind, ExpKind.Alert);
		assert.equal(exp.value, "warning");
		assert.equal(exp.level, 1);
	});

	it("CallExp stores name and rule", () => {
		const exp = new CallExp("expr");
		assert.equal(exp.kind, ExpKind.Call);
		assert.equal(exp.name, "expr");
		assert.equal(exp.rule, null);
	});

	it("NamedExp stores name and exp", () => {
		const inner = new TokenExp("x");
		const exp = new NamedExp("label", inner);
		assert.equal(exp.kind, ExpKind.Named);
		assert.equal(exp.name, "label");
		assert.equal(exp.exp, inner);
	});

	it("SeqExp stores items", () => {
		const items = [new TokenExp("a"), new TokenExp("b")];
		const exp = new SeqExp(items);
		assert.equal(exp.kind, ExpKind.Sequence);
		assert.equal(exp.sequence.length, 2);
		assert.equal(exp.sequence[0], items[0]);
	});

	it("ChoiceExp stores items", () => {
		const items = [new TokenExp("a"), new TokenExp("b")];
		const exp = new ChoiceExp(items);
		assert.equal(exp.kind, ExpKind.Choice);
		assert.equal(exp.options.length, 2);
	});

	it("JoinExp stores exp and sep", () => {
		const e = new TokenExp("a");
		const s = new TokenExp(",");
		const exp = new JoinExp(e, s);
		assert.equal(exp.kind, ExpKind.Join);
		assert.equal(exp.exp, e);
		assert.equal(exp.sep, s);
	});
});

describe("children()", () => {
	it("leaf kinds return empty array", () => {
		const leafKinds = [
			new NilExp(),
			new CutExp(),
			new VoidExp(),
			new FailExp(),
			new DotExp(),
			new EofExp(),
			new EolExp(),
			new EmptyClosureExp(),
			new TokenExp("a"),
			new PatternExp("b"),
			new ConstantExp(1),
			new AlertExp("x", 0),
			new CallExp("name"),
		];
		for (const exp of leafKinds) {
			assert.equal(
				exp.children().length,
				0,
				`${exp.kind} should have no children`,
			);
		}
	});

	it("unary kinds return single child", () => {
		const inner = new TokenExp("x");
		const unary: Exp[] = [
			new NamedExp("n", inner),
			new OverrideExp(inner),
			new GroupExp(inner),
			new LookaheadExp(inner),
			new OptionalExp(inner),
			new ClosureExp(inner),
		];
		for (const exp of unary) {
			const children = exp.children();
			assert.equal(children.length, 1, `${exp.kind} should have one child`);
			assert.equal(children[0], inner);
		}
	});

	it("SeqExp returns items", () => {
		const items = [new TokenExp("a"), new TokenExp("b")];
		const exp = new SeqExp(items);
		const children = exp.children();
		assert.equal(children.length, 2);
		assert.equal(children[0], items[0]);
		assert.equal(children[1], items[1]);
	});

	it("JoinExp returns exp and sep", () => {
		const e = new TokenExp("e");
		const s = new TokenExp("s");
		const exp = new JoinExp(e, s);
		const children = exp.children();
		assert.equal(children.length, 2);
		assert.equal(children[0], e);
		assert.equal(children[1], s);
	});

	it("RuleIncludeExp returns exp when set", () => {
		const inner = new TokenExp("x");
		const exp = new RuleIncludeExp("other", inner);
		const children = exp.children();
		assert.equal(children.length, 1);
		assert.equal(children[0], inner);
	});

	it("RuleIncludeExp returns empty when exp is null", () => {
		const exp = new RuleIncludeExp("other", null);
		assert.equal(exp.children().length, 0);
	});
});
