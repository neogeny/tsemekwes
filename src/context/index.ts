import type { Cfg } from "../config/config.js";
import type { Cursor } from "../input/cursor.js";
import { CoreCtx } from "./core-ctx.js";

export { CoreCtx } from "./core-ctx.js";
export type { CallStack, Ctx, Tracer } from "./ctx.js";
export { ParseFailure } from "./ctx.js";
export { Memento } from "./memento.js";

export function newCtx(cursor: Cursor, cfg?: Cfg): CoreCtx {
  return new CoreCtx(cursor, cfg);
}
