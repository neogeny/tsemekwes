import { ConsoleTracer, NullTracer, type Tracer } from "@context/tracer"
import { type Cfg, defaultCfg } from "@config/config"
import type { Cursor } from "@input/cursor"
import { Bool, NIL, NumberValue, Text, type Tree } from "@trees/tree"
import { type CallStack, type Ctx, ParseFailure } from "./ctx"
import { type Memo, type MemoKey, pruneMemoCache } from "./memo"

export function newCtx(cursor: Cursor, cfg?: Cfg): Core {
  return new Core(cursor, cfg)
}
export class Core implements Ctx {
  private _cursor: Cursor
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

  constructor(cursor: Cursor, cfg?: Cfg) {
    this._cursor = cursor
    this._cfg = cfg ? defaultCfg().override(cfg) : defaultCfg()
    this._cursor.configure(this._cfg)
  }

  cfg(): Cfg {
    return this._cfg
  }

  configure(cfg: Cfg): void {
    this._cfg = this._cfg.override(cfg)
    this._cursor.configure(cfg)
    this.setKeywords(cfg.keywords ?? [])
    if (cfg.trace) {
      this._tracer = new ConsoleTracer()
    } else {
      this._tracer = new NullTracer()
    }
  }

  private setKeywords(kws: string[]): void {
    this.keywords = new Set(kws)
  }

  clone(): Ctx {
    const c = new Core(this._cursor.clone(), this._cfg)
    c._callStack = [...this._callStack]
    c.cutStack = [...this.cutStack]
    c.recursionKey = this.recursionKey
    c.recursionDepth = this.recursionDepth
    c.lookaheadDepth = this.lookaheadDepth
    c.lastCutMark = this.lastCutMark
    c.furthest = this.furthest
    c.memoCache = this.memoCache
    c._tracer = this._tracer
    c.keywords = this.keywords
    return c
  }

  merge(other: Ctx): void {
    this._cursor = other.cursor()
    this.furthest = other.furthestFailure()
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

  next(): [string, boolean] {
    const ch = this._cursor.next()
    return ch == null ? ["", false] : [ch, true]
  }

  peek(): [string, boolean] {
    const ch = this._cursor.peek()
    return ch == null ? ["", false] : [ch, true]
  }

  dot(): [string, boolean] {
    const mark = this._cursor.mark()
    const ch = this._cursor.next()
    if (ch == null) {
      this.failure(mark, "expected any character")
      return ["", false]
    }
    return [ch, true]
  }

  nextToken(): void {
    this._cursor.nextToken()
  }
  matchEOL(): boolean {
    return this._cursor.matchEOL()
  }

  matchToken(token: string): boolean {
    this.nextToken()
    const result = this._cursor.matchToken(token)
    this._tracer.traceMatch(this, token, "")
    return result
  }

  matchPattern(pattern: string): string | null {
    const mark = this._cursor.mark()
    const [matched, ok] = this._cursor.matchPattern(pattern)
    if (!ok) {
      this.failure(mark, `expected pattern ${pattern}`)
      return null
    }
    this._tracer.traceMatch(this, pattern, matched)
    return matched
  }

  void_(): void {
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

  fail(): void {
    this.failure(this._cursor.mark(), "fail")
  }

  eof(): boolean {
    return this._cursor.atEnd()
  }

  eofCheck(): void {
    const mark = this._cursor.mark()
    this.nextToken()
    if (!this._cursor.atEnd()) {
      this.failure(mark, "expected end of text")
    }
  }

  eolCheck(): void {
    const mark = this._cursor.mark()
    if (!this._cursor.matchEOL()) {
      this.failure(mark, "expected end of line")
    }
  }

  constant(literal: unknown): Tree {
    if (typeof literal === "string") return new Text(literal)
    if (typeof literal === "number") return new NumberValue(literal)
    if (typeof literal === "boolean") return new Bool(literal)
    if (literal == null) return NIL
    return new Text(String(literal))
  }

  enter(name: string): void {
    this._callStack.push(name)
  }

  leave(): void {
    if (this._callStack.length > 0) {
      this._callStack.pop()
    }
  }

  failure(start: number, msg: string): ParseFailure {
    this._cursor.reset(start)
    const err = new ParseFailure(start, msg, this._cursor, this._callStack)
    if (this.furthest == null || this.furthest.mark <= this._cursor.mark()) {
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

  parseEOF(): boolean {
    this.enter("__eof__")
    this.nextToken()
    const result = this._cursor.atEnd()
    this.leave()
    return result
  }

  heartbeatTick(): void {
    // noop for now
  }

  key(name: string, canMemo: boolean): MemoKey {
    return { mark: this._cursor.mark(), name, canMemo }
  }

  memo(key: MemoKey): Memo | undefined {
    if (!key.canMemo) return undefined
    const k = `${key.mark}:${key.name}`
    return this.memoCache.get(k)
  }

  memoize(key: MemoKey, tree: Tree, mark: number): void {
    if (!key.canMemo) return
    const k = `${key.mark}:${key.name}`
    this.memoCache.set(k, { tree, mark })
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
    node: Tree,
    _ruleName: string,
    _params: string[],
  ): [Tree, boolean] {
    if (this.cfg().semantics) {
      return this.cfg().semantics?.(node, _ruleName, _params) || [node, false]
    }
    return [node, false]
  }
}
