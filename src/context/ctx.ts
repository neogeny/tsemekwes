import type { Cfg } from "@config"
import type { Cursor } from "@input"
import type { TreeValue } from "@trees"
import { ParseError, ParseFailure } from "./error"
import type { Memo, MemoKey } from "./memo.js"
import type { Tracer } from "./tracer"

export type CallStack = string[]

export interface Ctx {
  configure(cfg: Cfg): void
  cfg(): Cfg
  cursor(): Cursor
  mark(): number
  reset(mark: number): void
  atEnd(): boolean
  peek(): [string, boolean]

  nextToken(): void
  matchDot(): [string, boolean]
  matchFail(): ParseFailure
  matchVoid(): void
  matchEOF(): boolean
  matchEOL(): boolean
  matchToken(token: string): string
  matchPattern(pattern: string): string | null
  mtchConstant(literal: unknown): TreeValue

  enterLookahead(): void
  leaveLookahead(): void
  inLookahead(): boolean

  eof(): boolean

  failure(start: number, cause: ParseError): ParseFailure
  furthestFailure(): ParseFailure | null
  setFurthestFailure(failure: ParseFailure): void

  isKeyword(name: string): boolean
  intern(s: string): string

  enter(name: string): void
  leave(): void

  heartbeatTick(): void

  key(name: string, canMemo: boolean): MemoKey
  memo(key: MemoKey): Memo | undefined
  memoize(key: MemoKey, tree: TreeValue, mark: number): void

  recursionDepthExceeded(): boolean

  track(key: MemoKey): void
  untrack(key: MemoKey): void

  cut(): void
  isCutSeen(): boolean
  cutStackPush(): void
  cutStackPop(): boolean

  callStack(): CallStack
  tracer(): Tracer
  applySemantics(
    node: TreeValue,
    ruleName: string,
    params: string[],
  ): [TreeValue, boolean]
}

export default Ctx
