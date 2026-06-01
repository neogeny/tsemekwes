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
} from "../peg/exp.js";
import { Grammar } from "../peg/grammar.js";
import { Rule } from "../peg/rule.js";

export class ImportError extends Error {
	constructor(msg: string) {
		super(msg);
		this.name = "ImportError";
	}
}

function assertString(v: unknown, path: string): string {
	if (typeof v !== "string")
		throw new ImportError(`${path}: expected string, got ${typeof v}`);
	return v;
}

function assertArray(v: unknown, path: string): unknown[] {
	if (!Array.isArray(v))
		throw new ImportError(`${path}: expected array, got ${typeof v}`);
	return v;
}

function assertObject(v: unknown, path: string): Record<string, unknown> {
	if (typeof v !== "object" || v === null || Array.isArray(v)) {
		throw new ImportError(`${path}: expected object, got ${typeof v}`);
	}
	return v as Record<string, unknown>;
}

function optString(obj: Record<string, unknown>, key: string): string {
	const v = obj[key];
	return typeof v === "string" ? v : "";
}

function optBool(
	obj: Record<string, unknown>,
	key: string,
	def: boolean,
): boolean {
	const v = obj[key];
	return typeof v === "boolean" ? v : def;
}

export function loadGrammarFromJSON(data: unknown): Grammar {
	const root = assertObject(data, "root");
	const cls = assertString(root.__class__, "root.__class__");
	if (cls !== "Grammar")
		throw new ImportError(`root: expected Grammar, got ${cls}`);

	const name = assertString(root.name, "root.name");
	const rawRules = assertArray(root.rules || [], "root.rules");

	const rules: Rule[] = [];
	for (let i = 0; i < rawRules.length; i++) {
		rules.push(ruleFromJSON(rawRules[i], `root.rules[${i}]`));
	}

	const directives = parseDirectives(root);
	const keywords = parseKeywords(root);

	return new Grammar(name, rules, directives, keywords);
}

function parseDirectives(obj: Record<string, unknown>): string[][] {
	const raw = obj.directives;
	if (!raw || typeof raw !== "object") return [];
	const dirObj = raw as Record<string, unknown>;
	const result: string[][] = [];
	for (const [k, v] of Object.entries(dirObj)) {
		if (typeof v === "string") {
			result.push([k, v]);
		} else if (typeof v === "boolean") {
			result.push([k, v ? "true" : "false"]);
		} else {
			result.push([k, String(v)]);
		}
	}
	return result;
}

function parseKeywords(obj: Record<string, unknown>): string[] {
	const raw = obj.keywords;
	if (!Array.isArray(raw)) return [];
	return raw.filter((v): v is string => typeof v === "string");
}

function ruleFromJSON(raw: unknown, path: string): Rule {
	const obj = assertObject(raw, path);
	const cls = assertString(obj.__class__, `${path}.__class__`);
	if (cls !== "Rule")
		throw new ImportError(`${path}: expected Rule, got ${cls}`);

	const name = assertString(obj.name, `${path}.name`);
	const expRaw = obj.exp;
	const exp = modelFromJSON(expRaw, `${path}.exp`);

	const paramsRaw = obj.params;
	const params = Array.isArray(paramsRaw)
		? paramsRaw.filter((v): v is string => typeof v === "string")
		: [];

	const kwparams = new Map<string, string>();
	const kwRaw = obj.kwparams;
	if (typeof kwRaw === "object" && kwRaw !== null && !Array.isArray(kwRaw)) {
		for (const [k, v] of Object.entries(kwRaw)) {
			if (typeof v === "string") kwparams.set(k, v);
		}
	}

	const decorators = Array.isArray(obj.decorators)
		? obj.decorators.filter((v): v is string => typeof v === "string")
		: [];

	const base = optString(obj, "base");
	const isName =
		optBool(obj, "is_name", false) ||
		decorators.includes("name") ||
		decorators.includes("isname");
	const isTokn = optBool(obj, "is_tokn", false);
	const noMemo =
		optBool(obj, "no_memo", false) || decorators.includes("nomemo");
	const noStak =
		optBool(obj, "no_stak", false) || decorators.includes("nostak");
	const isMemo = optBool(obj, "is_memo", true);
	const isLrec = optBool(obj, "is_lrec", false);

	return new Rule(
		name,
		exp,
		params,
		kwparams,
		decorators,
		base,
		isName,
		isTokn,
		noMemo,
		noStak,
		isMemo,
		isLrec,
	);
}

function modelFromJSON(raw: unknown, path: string): Exp {
	const obj = assertObject(raw, path);
	const cls = assertString(obj.__class__, `${path}.__class__`);

	switch (cls) {
		case "Sequence": {
			const itemsRaw = assertArray(obj.sequence || [], `${path}.sequence`);
			const items = itemsRaw.map((v, i) =>
				modelFromJSON(v, `${path}.sequence[${i}]`),
			);
			return new SeqExp(items);
		}
		case "Choice": {
			const optsRaw = assertArray(obj.options || [], `${path}.options`);
			const items = optsRaw.map((v, i) => {
				const opt = assertObject(v, `${path}.options[${i}]`);
				// Option wrapper — extract inner exp
				if (opt.__class__ === "Option") {
					return modelFromJSON(opt.exp, `${path}.options[${i}].exp`);
				}
				return modelFromJSON(v, `${path}.options[${i}]`);
			});
			return new ChoiceExp(items);
		}
		case "Named": {
			const name = assertString(obj.name, `${path}.name`);
			const exp = modelFromJSON(obj.exp, `${path}.exp`);
			return new NamedExp(name, exp);
		}
		case "NamedList": {
			const name = assertString(obj.name, `${path}.name`);
			const exp = modelFromJSON(obj.exp, `${path}.exp`);
			return new NamedListExp(name, exp);
		}
		case "Call": {
			const name = assertString(obj.name, `${path}.name`);
			return new CallExp(name);
		}
		case "Token": {
			const token = assertString(obj.token, `${path}.token`);
			return new TokenExp(token);
		}
		case "Pattern": {
			const pat = assertString(obj.pattern, `${path}.pattern`);
			return new PatternExp(pat);
		}
		case "Constant": {
			return new ConstantExp(optString(obj, "literal"));
		}
		case "Alert": {
			const lit = optString(obj, "literal");
			const level = typeof obj.level === "number" ? obj.level : 0;
			return new AlertExp(lit, level);
		}
		case "Group":
			return new GroupExp(modelFromJSON(obj.exp, `${path}.exp`));
		case "Optional":
			return new OptionalExp(modelFromJSON(obj.exp, `${path}.exp`));
		case "Closure":
			return new ClosureExp(modelFromJSON(obj.exp, `${path}.exp`));
		case "PositiveClosure":
			return new PositiveClosureExp(modelFromJSON(obj.exp, `${path}.exp`));
		case "Lookahead":
			return new LookaheadExp(modelFromJSON(obj.exp, `${path}.exp`));
		case "NegativeLookahead":
			return new NegativeLookaheadExp(modelFromJSON(obj.exp, `${path}.exp`));
		case "SkipGroup":
			return new SkipGroupExp(modelFromJSON(obj.exp, `${path}.exp`));
		case "SkipTo":
			return new SkipToExp(modelFromJSON(obj.exp, `${path}.exp`));
		case "Override":
			return new OverrideExp(modelFromJSON(obj.exp, `${path}.exp`));
		case "OverrideList":
			return new OverrideListExp(modelFromJSON(obj.exp, `${path}.exp`));
		case "Join":
			return new JoinExp(
				modelFromJSON(obj.exp, `${path}.exp`),
				modelFromJSON(obj.sep, `${path}.sep`),
			);
		case "PositiveJoin":
			return new PositiveJoinExp(
				modelFromJSON(obj.exp, `${path}.exp`),
				modelFromJSON(obj.sep, `${path}.sep`),
			);
		case "Gather":
			return new GatherExp(
				modelFromJSON(obj.exp, `${path}.exp`),
				modelFromJSON(obj.sep, `${path}.sep`),
			);
		case "PositiveGather":
			return new PositiveGatherExp(
				modelFromJSON(obj.exp, `${path}.exp`),
				modelFromJSON(obj.sep, `${path}.sep`),
			);
		case "Void":
			return new VoidExp();
		case "Null":
			return new NilExp();
		case "Fail":
			return new FailExp();
		case "Dot":
			return new DotExp();
		case "Cut":
			return new CutExp();
		case "EOF":
			return new EofExp();
		case "EOL":
			return new EolExp();
		case "EmptyClosure":
			return new EmptyClosureExp();
		case "RuleInclude": {
			const name = assertString(obj.name, `${path}.name`);
			return new RuleIncludeExp(name);
		}
		default:
			throw new ImportError(`${path}: unsupported expression type: ${cls}`);
	}
}
