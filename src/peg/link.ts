import {
	type CallExp,
	type Exp,
	ExpKind,
	type JoinExp,
	type RuleIncludeExp,
	type SeqExp,
} from "./exp.js";
import type { Rule } from "./rule.js";
import { LinkError } from "@peg/error.js";

export function linkExp(exp: Exp | null, rules: Map<string, Rule>): void {
	if (exp == null) return;
	switch (exp.kind) {
		case ExpKind.Call: {
			const call = exp as CallExp;
			const rule = rules.get(call.name);
			if (!rule) throw new LinkError(`call to undefined rule: ${call.name}`);
			call.rule = rule;
			return;
		}
		case ExpKind.RuleInclude: {
			const ri = exp as RuleIncludeExp;
			const rule = rules.get(ri.name);
			if (!rule)
				throw new LinkError(
					`rule include references undefined rule: ${ri.name}`,
				);
			ri.exp = rule.exp;
			return;
		}
		// Leaves — nothing to link
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
			return;
		// Unary — recurse into child
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
			exp.link(rules);
			return;
		// Binary — recurse into both
		case ExpKind.Join:
		case ExpKind.PositiveJoin:
		case ExpKind.Gather:
		case ExpKind.PositiveGather: {
			exp.link(rules);
			const join = exp as unknown as JoinExp;
			linkExp(join.exp, rules);
			linkExp(join.sep, rules);
			return;
		}
		// Collection — recurse into all
		case ExpKind.Sequence:
		case ExpKind.Choice: {
			for (const child of (exp as SeqExp).sequence) {
				linkExp(child, rules);
			}
			return;
		}
		default:
			throw new Error(`unhandled ExpKind: ${exp.kind}`);
	}
}

export function linkRule(rule: Rule, rules: Map<string, Rule>): void {
	linkExp(rule.exp, rules);
}

export function linkGrammar(
	grammar: { rules: Rule[] },
	rules: Map<string, Rule>,
): void {
	for (const rule of grammar.rules) {
		linkRule(rule, rules);
	}
}
