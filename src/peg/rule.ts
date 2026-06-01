import type { Ctx } from "../context/ctx.js";
import { fold, Node as NodeTree, type Tree } from "../trees/tree.js";
import { BoxExp, type Exp, ExpKind } from "./exp.js";

export class Rule extends BoxExp {
	readonly kind = ExpKind.Rule;
	constructor(
		public name: string,
		public exp: Exp,
		public params: string[] = [],
		public kwParams: Map<string, string> = new Map(),
		public decorators: string[] = [],
		public base: string = "",
		public isName: boolean = false,
		public isTokn: boolean = false,
		public noMemo: boolean = false,
		public noStak: boolean = false,
		public isMemo: boolean = false,
		public isLrec: boolean = false,
	) {
		super(exp);
	}

	parseAt(ctx: Ctx): Tree | null {
		const mark = ctx.mark();
		const result = this.exp.parseAt(ctx);
		if (result == null) {
			ctx.reset(mark);
			return null;
		}

		const folded = fold(result);

		const [newTree, overridden] = ctx.applySemantics(
			folded,
			this.name,
			this.params,
		);
		if (overridden) {
			return newTree;
		}

		if (this.params.length === 0 || this.params[0] === "bool") {
			return folded;
		}

		return new NodeTree(this.params[0], folded);
	}

	isToken(): boolean {
		if (this.isTokn) return true;
		for (const c of this.name) {
			if (c !== "_") return c === c.toUpperCase() && c !== c.toLowerCase();
		}
		return false;
	}

	isLeftRecursive(): boolean {
		return this.isLrec;
	}

	isMemoizable(): boolean {
		return this.isLrec || (this.isMemo && !this.noMemo);
	}

	shouldTrace(): boolean {
		return !this.noStak && !this.isToken();
	}

	normalize(): void {
		// No-op in TS: defaults handled by constructor params
	}
}
