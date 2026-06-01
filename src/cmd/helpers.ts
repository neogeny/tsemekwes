import { readFile } from "node:fs/promises";
import { type Cfg, defaultCfg } from "@config/config.js";

export async function readText(path: string): Promise<string> {
	if (path === "-") {
		const chunks: Buffer[] = [];
		for await (const chunk of process.stdin) {
			chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk));
		}
		return Buffer.concat(chunks).toString("utf-8");
	}
	return await readFile(path, "utf-8");
}

export function ext(path: string): string {
	const i = path.lastIndexOf(".");
	return i !== -1 ? path.slice(i + 1).toLowerCase() : "";
}

export function newCfg(opts: { trace?: boolean; start?: string }): Cfg {
	const c = defaultCfg();
	if (opts.trace) {
		c.trace = true;
	}
	if (opts.start) c.start = opts.start;
	return c;
}
