import type { Ctx } from "@context/ctx.js";

export interface Tracer {
	trace(ctx: Ctx, msg: string): void;

	traceEvent(ctx: Ctx, event: number, msg: string): void;

	traceEntry(ctx: Ctx): void;

	traceSuccess(ctx: Ctx): void;

	traceFailure(ctx: Ctx, err: string): void;

	traceRecursion(ctx: Ctx): void;

	traceCut(ctx: Ctx): void;

	traceMatch(ctx: Ctx, token: string, name: string): boolean;

	traceNoMatch(ctx: Ctx, token: string, name: string): boolean;
}

export class NullTracer implements Tracer {
	trace(_ctx: Ctx, _msg: string): void {}

	traceEvent(_ctx: Ctx, _event: number, _msg: string): void {}

	traceEntry(_ctx: Ctx): void {}

	traceSuccess(_ctx: Ctx): void {}

	traceFailure(_ctx: Ctx, _err: string): void {}

	traceRecursion(_ctx: Ctx): void {}

	traceCut(_ctx: Ctx): void {}

	traceMatch(_ctx: Ctx, _token: string, _name: string): boolean {
		return true;
	}

	traceNoMatch(_ctx: Ctx, _token: string, _name: string): boolean {
		return true;
	}
}

export class ConsoleTracer implements Tracer {
	trace(_ctx: Ctx, msg: string): void {
		console.error(msg);
	}

	traceEvent(_ctx: Ctx, event: number, msg: string): void {
		console.error(`[${event}] ${msg}`);
	}

	traceEntry(ctx: Ctx): void {
		console.error(`→ ${ctx.callStack().join(" > ")}`);
	}

	traceSuccess(ctx: Ctx): void {
		console.error(`✓ ${ctx.callStack().join(" > ")}`);
	}

	traceFailure(_ctx: Ctx, err: string): void {
		console.error(`✗ ${err}`);
	}

	traceRecursion(ctx: Ctx): void {
		console.error(`↻ ${ctx.callStack().join(" > ")}`);
	}

	traceCut(ctx: Ctx): void {
		console.error(`✂ ${ctx.callStack().join(" > ")}`);
	}

	traceMatch(_ctx: Ctx, _token: string, _name: string): boolean {
		return true;
	}

	traceNoMatch(_ctx: Ctx, _token: string, _name: string): boolean {
		return true;
	}
}
