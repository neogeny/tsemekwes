import type { Tracer } from "@context/tracer.js"
import type { Cfg } from "@config/config"
import type { Cursor } from "@input/cursor"
import type { Tree } from "@trees/tree"
import { Memento } from "./memento.js"
import type { Memo, MemoKey } from "./memo.js"

export type CallStack = string[]

export class ParseFailure extends Error {
  public readonly memento: Memento

  constructor(
    public readonly start: number,
    msg: string,
    cursor: Cursor,
    callStack: CallStack,
  ) {
    super(msg)
    this.name = "ParseFailure"
    this.memento = new Memento(start, msg, cursor, callStack)
  }

  get mark(): number {
    return this.memento.mark
  }
}

export interface Ctx {
  cfg(): Cfg
  configure(cfg: Cfg): void
  clone(): Ctx
  merge(other: Ctx): void
  cursor(): Cursor
  callStack(): CallStack
  tracer(): Tracer
  mark(): number
  reset(mark: number): void
  atEnd(): boolean
  next(): [string, boolean]
  peek(): [string, boolean]
  dot(): [string, boolean]
  nextToken(): void
  matchEOL(): boolean
  matchToken(token: string): boolean
  matchPattern(pattern: string): string | null
  void_(): void
  inLookahead(): boolean
  enterLookahead(): void
  leaveLookahead(): void
  fail(): void
  eof(): boolean
  eofCheck(): void
  eolCheck(): void
  constant(literal: unknown): Tree
  enter(name: string): void
  leave(): void
  failure(start: number, msg: string): ParseFailure
  furthestFailure(): ParseFailure | null
  setFurthestFailure(failure: ParseFailure): void
  isKeyword(name: string): boolean
  intern(s: string): string
  parseEOF(): boolean
  heartbeatTick(): void
  key(name: string, canMemo: boolean): MemoKey
  memo(key: MemoKey): Memo | undefined
  memoize(key: MemoKey, tree: Tree, mark: number): void
  recursionDepthExceeded(): boolean
  track(key: MemoKey): void
  untrack(key: MemoKey): void
  cut(): void
  isCutSeen(): boolean
  cutStackPush(): void
  cutStackPop(): boolean
  applySemantics(
    node: Tree,
    ruleName: string,
    params: string[],
  ): [Tree, boolean]
}
