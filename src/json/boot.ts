import type { Grammar } from "../peg/grammar.js";
import type { Tree } from "../trees/tree.js";
import { FALSE, NULL, TRUE } from "../trees/tree.js";
import { loadGrammarFromJSON } from "./import.js";
import tatsu from "./tatsu.json" with { type: "json" };

let cached: Grammar | null = null;

export function bootGrammar(): Grammar {
	if (cached) return cached;
	const g = loadGrammarFromJSON(tatsu);
	g.initialize();
	g.semantics = grammarParserSemantics;
	cached = g;
	return g;
}

function grammarParserSemantics(
	node: Tree,
	ruleName: string,
	_params: string[],
): [Tree, boolean] {
	// The boot grammar produces parse trees where certain rules
	// correspond to constant values:
	if (ruleName === "true") return [TRUE, true];
	if (ruleName === "false") return [FALSE, true];
	if (ruleName === "null") return [NULL, true];
	// All other rules pass through unchanged
	return [node, false];
}
