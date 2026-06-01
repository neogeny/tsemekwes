import { format } from "node:util";
import type { Cursor } from "../input/cursor.js";
import type { CallStack } from "./ctx.js";

export class Memento {
	public readonly mark: number;
	public readonly callStack: CallStack;

	constructor(
		public readonly start: number,
		public readonly msg: string,
		private readonly cursor: Cursor,
		callStack: CallStack,
	) {
		this.mark = cursor.mark();
		this.callStack = [...callStack];
	}

	inputSource(): string {
		return this.cursor.inputSource();
	}

	error(): string {
		const [line, col] = this.cursor.posAt(this.mark);
		const source = this.inputSource();
		const src = source !== "" ? source : "<unknown>";

		let result = "";
		result += `\nerror: ${this.msg}\n`;
		result += `  --> ${src}:${line}:${col}\n`;
		result += `      |\n`;

		const startLine0 = Math.max(0, line - 5);
		const lines = this.cursor.linesAt(startLine0, line);
		for (let i = 0; i < lines.length; i++) {
			const ln = startLine0 + i + 1;
			const disp = lines[i].replace(/\t/g, "  ").replace(/[\r\n]$/, "");
			result += `${format("%5d", ln)} | ${disp}\n`;
		}

		const pad = " ".repeat(Math.max(0, col - 1));
		result += `      | ${pad}^ ${this.msg}\n`;

		if (this.callStack.length > 0) {
			result += "\n";
			for (let i = this.callStack.length - 1; i >= 0; i--) {
				result += `  -> ${this.callStack[i]}\n`;
			}
		}

		return result;
	}
}
