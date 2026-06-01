import type { Ctx } from "@context/ctx.js";
import type { Rule } from "@peg/rule.js";
import type { Tree } from "@trees/tree.js";

export function ruleCall(
	ctx: Ctx,
	name: string,
	rule: Rule | null,
): Tree | null {
	if (rule == null) {
		ctx.failure(ctx.mark(), `rule not linked: ${name}`);
		return null;
	}
	// TODO: memo, left recursion, call stack
	ctx.enter(name);
	let result: Tree | null;
	if (rule.isToken()) {
		// Token rules: skip rule parse machinery, evaluate expression directly
		result = rule.parseAt(ctx);
	} else {
		// Non-token rules: skip leading whitespace, then go through Rule.parse()
		// which handles fold + semantics + Node wrapping
		ctx.nextToken();
		result = rule.parseAt(ctx);
	}
	ctx.leave();
	return result;
}
