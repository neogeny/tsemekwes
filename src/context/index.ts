import type { Cursor } from "../input/cursor.js";
import { Cfg } from "../config/config.js";
import { CoreCtx } from "./core-ctx.js";

export type { Ctx } from "./ctx.js";
export { ParseFailure } from "./ctx.js";
export type { Tracer } from "./ctx.js";
export type { CallStack } from "./ctx.js";
export { CoreCtx } from "./core-ctx.js";

export function newCtx(cursor: Cursor, cfg?: Cfg): CoreCtx {
  return new CoreCtx(cursor, cfg);
}
