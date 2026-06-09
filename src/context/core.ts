import { type Cfg, defaultCfg } from "@config"
import {
  ConsoleTracer,
  type MemoValue,
  NullTracer,
  ParseError,
  type Tracer,
} from "@context"
import type { Cursor } from "@input"
import type { TreeValue } from "@trees"
import { DeadHeart, type Heart } from "@util/heartbeat"
import type Ctx from "./ctx"
import type { CallStack } from "./ctx"
import { ParseFailure } from "./error"
import { type Memo, type MemoKey, pruneMemoCache } from "./memo"

export function newCtx(cursor: Cursor, cfg?: Cfg): Core {
  return new Core(cursor, cfg)
}
export class Core implements Ctx {
  private readonly _cursor: Cursor
  private _callStack: CallStack = []
  private cutStack: boolean[] = [false]
  private recursionKey: MemoKey | null = null
  private recursionDepth = 0
  private lookaheadDepth = 0
  private lastCutMark = 0
  private furthest: ParseFailure | null = null

  private _cfg: Cfg
  private memoCache = new Map<string, Memo>()
  private _tracer: Tracer = new NullTracer()
  private keywords = new Set<string>()
  private _heart: Heart = new DeadHeart()
  private _lastHeartbeat = 0

  constructor(cursor: Cursor, cfg?: Cfg) {
    this._cursor = cursor
    this._cfg = cfg ? defaultCfg().merge(cfg) : defaultCfg()
    this._cursor.configure(this._cfg)
  }

  cfg(): Cfg {
    return this._cfg
  }

  configure(cfg: Cfg): void {
    this._cfg = this._cfg.merge(cfg)
    this._cursor.configure(cfg)
    this.setKeywords(cfg.keywords ?? [])
    if (cfg.trace) {
      this._tracer = new ConsoleTracer()
    } else {
      this._tracer = new NullTracer()
    }
    if (cfg.heart) {
      this._heart = cfg.heart
    }
  }

  private setKeywords(kws: string[]): void {
    this.keywords = new Set(kws)
  }

  cursor(): Cursor {
    return this._cursor
  }
  callStack(): CallStack {
    return [...this._callStack]
  }
  tracer(): Tracer {
    return this._tracer
  }
  mark(): number {
    return this._cursor.mark()
  }
  reset(mark: number): void {
    this._cursor.reset(mark)
  }
  atEnd(): boolean {
    return this._cursor.atEnd()
  }

  peek(): [string, boolean] {
    return this._cursor.peek()
  }

  matchDot(): [string, boolean] {
    const mark = this._cursor.mark()
    const [ch, ok] = this._cursor.next()
    if (!ok) {
      throw this.failure(mark, new ParseError("expected any character"))
    }
    return [ch, true]
  }

  nextToken(): void {
    this._cursor.nextToken()
    this.heartbeat()
  }

  matchToken(token: string): string {
    this.nextToken()
    const start = this.mark()
    const [slice, ok] = this._cursor.matchToken(token)
    if (ok) {
      this._tracer.traceMatch(this, token, slice)
      return slice
    }
    this.reset(start)
    this._tracer.traceNoMatch(this, "", token)
    throw this.failure(start, new ParseError(`expected: "${token}"`))
  }

  matchPattern(pattern: string): string {
    // let view = pattern.replace(/\//g, "\\/")
    let view = pattern
    view = `${view.slice(0, 16)}...`.slice(0, view.length)

    const mark = this._cursor.mark()
    const [slice, ok] = this._cursor.matchPattern(pattern)
    if (ok) {
      this._tracer.traceMatch(this, view, slice)
      return slice
    }
    this._tracer.traceNoMatch(this, view, slice)
    const p = this._cursor.getPattern(pattern)
    throw this.failure(mark, new ParseError(`expected pattern ${p}`))
  }

  matchVoid(): void {
    this.nextToken()
  }
  inLookahead(): boolean {
    return this.lookaheadDepth > 0
  }
  enterLookahead(): void {
    this.lookaheadDepth++
  }
  leaveLookahead(): void {
    this.lookaheadDepth--
  }

  matchFail(): ParseFailure {
    throw this.failure(this._cursor.mark(), new ParseError("fail"))
  }

  eof(): boolean {
    return this._cursor.atEnd()
  }

  matchEOF(): null {
    const mark = this._cursor.mark()
    this.nextToken()
    if (!this._cursor.atEnd()) {
      this.reset(mark)
      throw this.failure(mark, new ParseError("expected end of text"))
    }
    return null
  }

  matchEOL(): null {
    const mark = this._cursor.mark()
    if (!this._cursor.matchEOL()) {
      this.reset(mark)
      throw this.failure(mark, new ParseError("expected end of line"))
    }
    return null
  }

  matchName(): string | null {
    this.nextToken()
    const start = this.mark()
    const [slice, ok] = this._cursor.matchName()
    if (ok) {
      this._tracer.traceMatch(this, "@name", slice)
      return slice
    }
    this.reset(start)
    this._tracer.traceNoMatch(this, "", "@name")
    throw this.failure(start, new ParseError("expected @name"))
  }

  matchInt(): string | null {
    this.nextToken()
    const start = this.mark()
    const [slice, ok] = this._cursor.matchInt()
    if (ok) {
      this._tracer.traceMatch(this, "@int", slice)
      return slice
    }
    this.reset(start)
    this._tracer.traceNoMatch(this, "", "@int")
    throw this.failure(start, new ParseError("expected @int"))
  }

  matchUInt(): string | null {
    this.nextToken()
    const start = this.mark()
    const [slice, ok] = this._cursor.matchUInt()
    if (ok) {
      this._tracer.traceMatch(this, "@uint", slice)
      return slice
    }
    this.reset(start)
    this._tracer.traceNoMatch(this, "", "@uint")
    throw this.failure(start, new ParseError("expected @uint"))
  }

  matchFloat(): string | null {
    this.nextToken()
    const start = this.mark()
    const [slice, ok] = this._cursor.matchFloat()
    if (ok) {
      this._tracer.traceMatch(this, "@float", slice)
      return slice
    }
    this.reset(start)
    this._tracer.traceNoMatch(this, "", "@float")
    throw this.failure(start, new ParseError("expected @float"))
  }

  matchBool(): string | null {
    this.nextToken()
    const start = this.mark()
    const [slice, ok] = this._cursor.matchBool()
    if (ok) {
      this._tracer.traceMatch(this, "@bool", slice)
      return slice
    }
    this.reset(start)
    this._tracer.traceNoMatch(this, "", "@bool")
    throw this.failure(start, new ParseError("expected @bool"))
  }

  mtchConstant(literal: unknown): TreeValue {
    if (
      typeof literal === "string" ||
      typeof literal === "number" ||
      typeof literal === "boolean"
    ) {
      return literal
    }
    if (literal === null) return null
    return String(literal)
  }

  enter(name: string): void {
    this._callStack.push(name)
  }

  leave(): void {
    if (this._callStack.length > 0) {
      this._callStack.pop()
    }
  }

  failure(start: number, cause: ParseError): ParseFailure {
    this._cursor.reset(start)
    const err = new ParseFailure(this, start, cause)
    if (this.furthest === null || this.furthest.mark <= this._cursor.mark()) {
      this.setFurthestFailure(err)
    }
    return err
  }

  furthestFailure(): ParseFailure | null {
    return this.furthest
  }

  setFurthestFailure(failure: ParseFailure): void {
    this.furthest = failure
  }

  isKeyword(name: string): boolean {
    return this.keywords.has(name)
  }

  intern(s: string): string {
    return s
  }

  heartbeat(): void {
    const hb = this._heart
    if (hb instanceof DeadHeart) return

    const now = Date.now()
    if (now - this._lastHeartbeat < 128) return
    this._lastHeartbeat = now

    const mark = this._cursor.mark()
    const total = this._cursor.len()
    hb.heartbeat(mark, total)
  }

  key(name: string, canMemo: boolean): MemoKey {
    return { mark: this._cursor.mark(), name, canMemo }
  }

  memo(key: MemoKey): Memo | undefined {
    if (!key.canMemo) return undefined
    const k = `${key.mark}:${key.name}`
    return this.memoCache.get(k)
  }

  memoize(key: MemoKey, value: MemoValue, mark: number): void {
    if (!key.canMemo) return
    const k = `${key.mark}:${key.name}`
    this.memoCache.set(k, { value, mark })
  }

  recursionDepthExceeded(): boolean {
    return this.recursionDepth >= 64
  }

  track(key: MemoKey): void {
    if (
      this.recursionKey != null &&
      this.recursionKey.mark === key.mark &&
      this.recursionKey.name === key.name
    ) {
      this.recursionDepth++
    } else {
      this.recursionKey = key
      this.recursionDepth = 1
    }
  }

  untrack(key: MemoKey): void {
    if (
      this.recursionKey != null &&
      this.recursionKey.mark === key.mark &&
      this.recursionKey.name === key.name
    ) {
      this.recursionDepth--
      if (this.recursionDepth <= 0) {
        this.recursionKey = null
        this.recursionDepth = 0
      }
    }
  }

  cut(): void {
    this.cutStack[this.cutStack.length - 1] = true
    this._tracer.traceCut(this)
    const mark = this._cursor.mark()
    if (!this.cfg().noPruneMemosOnCut && !this.inLookahead()) {
      if (mark > this.lastCutMark) {
        pruneMemoCache(this.memoCache, this.lastCutMark)
        this.lastCutMark = mark
      }
    }
  }

  isCutSeen(): boolean {
    return this.cutStack[this.cutStack.length - 1]
  }

  cutStackPush(): void {
    this.cutStack.push(false)
  }

  cutStackPop(): boolean {
    const seen = this.isCutSeen()
    this.cutStack.pop()
    return seen
  }

  applySemantics(
    node: TreeValue,
    ruleName: string,
    params: string[],
  ): [TreeValue, boolean] {
    const sem = this.cfg().semantics
    if (sem !== null && sem !== undefined) {
      return sem.apply(node, ruleName, params)
    }
    return [node, false]
  }
}
