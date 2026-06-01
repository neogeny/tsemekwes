import type { Cfg } from "../config/config.js";
import type { Cursor } from "../input/cursor.js";
import type { Tree } from "../trees/tree.js";
import type { MemoKey, Memo } from "./memo.js";

export type CallStack = string[];

export class ParseFailure extends Error {
  constructor(
    public readonly start: number,
    public readonly mark: number,
    msg: string,
    public readonly callStack: CallStack,
  ) {
    super(msg);
    this.name = "ParseFailure";
  }
}

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

export interface Ctx {
  configure(cfg: Cfg): void;
  clone(): Ctx;
  merge(other: Ctx): void;
  cursor(): Cursor;
  callStack(): CallStack;
  tracer(): Tracer;
  mark(): number;
  reset(mark: number): void;
  atEnd(): boolean;
  next(): [string, boolean];
  peek(): [string, boolean];
  dot(): [string, boolean];
  nextToken(): void;
  matchEOL(): boolean;
  matchToken(token: string): boolean;
  matchPattern(pattern: string): string | null;
  void_(): void;
  inLookahead(): boolean;
  enterLookahead(): void;
  leaveLookahead(): void;
  fail(): void;
  eof(): boolean;
  eofCheck(): void;
  eolCheck(): void;
  constant(literal: any): Tree;
  enter(name: string): void;
  leave(): void;
  failure(start: number, msg: string): ParseFailure;
  furthestFailure(): ParseFailure | null;
  setFurthestFailure(failure: ParseFailure): void;
  isKeyword(name: string): boolean;
  intern(s: string): string;
  parseEOF(): boolean;
  heartbeatTick(): void;
  key(name: string, canMemo: boolean): MemoKey;
  memo(key: MemoKey): Memo | undefined;
  memoize(key: MemoKey, tree: Tree, mark: number): void;
  trackRecursionDepth(key: MemoKey): boolean;
  untrack(key: MemoKey): void;
  cut(): void;
  isCutSeen(): boolean;
  cutStackPush(): void;
  cutStackPop(): boolean;
  applySemantics(node: Tree, ruleName: string, params: string[]): [Tree, boolean];
}
