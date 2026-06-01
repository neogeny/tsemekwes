import type { Ctx } from "@context/ctx.js";
import type { Exp } from "@peg/exp.js";
import type { Tree } from "@trees/tree.js";

export function parseChoice(ctx: Ctx, options: Exp[]): Tree | null {
	const mark = ctx.mark();
	for (const opt of options) {
		ctx.reset(mark);

		ctx.cutStackPush();
		const result = opt.parseAt(ctx);
		const cutSeen = ctx.cutStackPop();

		if (result != null) {
			return result;
		} else if (cutSeen) {
			ctx.reset(mark);
			return null;
		}
	}
	ctx.reset(mark);
	return null;
}
