import {
	type AlertExp,
	type CallExp,
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
} from "./exp.js";
import type { Grammar } from "./grammar.js";
import type { Rule } from "./rule.js";

function mapClass(cls: string, ...kv: unknown[]): Record<string, unknown> {
	const out: Record<string, unknown> = { __class__: cls };
	for (let i = 0; i < kv.length; i += 2) {
		out[kv[i] as string] = kv[i + 1];
	}
	return out;
}

export function expToJSON(exp: Exp): Record<string, unknown> {
	switch (exp.kind) {
		case ExpKind.Token:
			return mapClass("Token", "token", (exp as TokenExp).value);
		case ExpKind.Pattern:
			return mapClass("Pattern", "pattern", (exp as PatternExp).value);
		case ExpKind.Constant:
			return mapClass("Constant", "literal", (exp as ConstantExp).value);
		case ExpKind.Alert:
			return mapClass(
				"Alert",
				"literal",
				(exp as AlertExp).value,
				"level",
				(exp as AlertExp).level,
			);
		case ExpKind.Dot:
			return mapClass("Dot");
		case ExpKind.Eof:
			return mapClass("EOF");
		case ExpKind.Eol:
			return mapClass("EOL");
		case ExpKind.Fail:
			return mapClass("Fail");
		case ExpKind.Void:
			return mapClass("Void");
		case ExpKind.Nil:
			return mapClass("Null");
		case ExpKind.Cut:
			return mapClass("Cut");
		case ExpKind.EmptyClosure:
			return mapClass("EmptyClosure");
		case ExpKind.Call:
			return mapClass("Call", "name", (exp as CallExp).name);
		case ExpKind.RuleInclude:
			return mapClass("RuleInclude", "name", (exp as RuleIncludeExp).name);
		case ExpKind.Group:
			return mapClass("Group", "exp", expToJSON((exp as GroupExp).exp));
		case ExpKind.SkipGroup:
			return mapClass("SkipGroup", "exp", expToJSON((exp as SkipGroupExp).exp));
		case ExpKind.Lookahead:
			return mapClass("Lookahead", "exp", expToJSON((exp as LookaheadExp).exp));
		case ExpKind.NegativeLookahead:
			return mapClass(
				"NegativeLookahead",
				"exp",
				expToJSON((exp as NegativeLookaheadExp).exp),
			);
		case ExpKind.SkipTo:
			return mapClass("SkipTo", "exp", expToJSON((exp as SkipToExp).exp));
		case ExpKind.Alt:
			return mapClass("Option", "exp", expToJSON((exp as OverrideExp).exp));
		case ExpKind.Optional:
			return mapClass("Optional", "exp", expToJSON((exp as OptionalExp).exp));
		case ExpKind.Closure:
			return mapClass("Closure", "exp", expToJSON((exp as ClosureExp).exp));
		case ExpKind.PositiveClosure:
			return mapClass(
				"PositiveClosure",
				"exp",
				expToJSON((exp as PositiveClosureExp).exp),
			);
		case ExpKind.Override:
			return mapClass("Override", "exp", expToJSON((exp as OverrideExp).exp));
		case ExpKind.OverrideList:
			return mapClass(
				"OverrideList",
				"exp",
				expToJSON((exp as OverrideListExp).exp),
			);
		case ExpKind.Named:
			return mapClass(
				"Named",
				"name",
				(exp as NamedExp).name,
				"exp",
				expToJSON((exp as NamedExp).exp),
			);
		case ExpKind.NamedList:
			return mapClass(
				"NamedList",
				"name",
				(exp as NamedListExp).name,
				"exp",
				expToJSON((exp as NamedListExp).exp),
			);
		case ExpKind.Join:
			return mapClass(
				"Join",
				"exp",
				expToJSON((exp as JoinExp).exp),
				"sep",
				expToJSON((exp as JoinExp).sep),
			);
		case ExpKind.PositiveJoin:
			return mapClass(
				"PositiveJoin",
				"exp",
				expToJSON((exp as PositiveJoinExp).exp),
				"sep",
				expToJSON((exp as PositiveJoinExp).sep),
			);
		case ExpKind.Gather:
			return mapClass(
				"Gather",
				"exp",
				expToJSON((exp as GatherExp).exp),
				"sep",
				expToJSON((exp as GatherExp).sep),
			);
		case ExpKind.PositiveGather:
			return mapClass(
				"PositiveGather",
				"exp",
				expToJSON((exp as PositiveGatherExp).exp),
				"sep",
				expToJSON((exp as PositiveGatherExp).sep),
			);
		case ExpKind.Sequence:
			return mapClass(
				"Sequence",
				"sequence",
				(exp as SeqExp).sequence.map((item) => expToJSON(item)),
			);
		case ExpKind.Choice:
			return mapClass(
				"Choice",
				"options",
				(exp as ChoiceExp).options.map((item) => expToJSON(item)),
			);
		default:
			throw new Error(`modelToJSON: unhandled ExpKind: ${exp.kind}`);
	}
}

function serializeRule(rule: Rule): Record<string, unknown> {
	const kwp: Record<string, string> = {};
	for (const [k, v] of rule.kwParams) {
		kwp[k] = v;
	}
	return {
		__class__: "Rule",
		name: rule.name,
		exp: expToJSON(rule.exp),
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
	};
}

function serializeDirectives(dirs: string[][]): Record<string, unknown> {
	const out: Record<string, unknown> = {};
	for (const [k, v] of dirs) {
		let value: unknown = v;
		switch (v) {
			case "true":
			case "True":
				value = true;
				break;
			case "false":
			case "False":
				value = false;
				break;
			case "null":
			case "None":
				value = null;
				break;
		}
		out[k] = value;
	}
	return out;
}

export function serializeGrammar(g: Grammar): Record<string, unknown> {
	return {
		__class__: "Grammar",
		name: g.name,
		directives: serializeDirectives(g.directives),
		keywords: [...g.keywords],
		rules: g.rules.map((r) => serializeRule(r)),
	};
}

export function modelToJSONStr(g: Grammar): string {
	return JSON.stringify(serializeGrammar(g), null, 2);
}
