import type { Cfg } from "@config"
import { type Cursor, Location } from "./cursor.js"
import { lines, splitlines, stripRight } from "@util"
import { isAlphabetic, isAlphanumeric } from "@util/strings"
import XRegExp from "xregexp"

import {
  configurePatterns,
  defaultPatterns,
  resetPatterns,
  type TokenizingPatterns,
} from "./patterns.js"

// FIXME
// const nameCharRe = /^[\p{L}\p{N}_]$/u

export class CursorHeavy {
  ignoreCase = false
  nameGuard = false
  nameChars = ""
  source = ""
  patterns: TokenizingPatterns = defaultPatterns()
  patternCache = new Map<string, RegExp>()
}

export class StrCursor implements Cursor {
  private readonly text: string
  private offset: number = 0
  // noinspection TypeScriptFieldCanBeMadeReadonly
  private heavy: CursorHeavy

  constructor(text: string)
  constructor(text: string, source: string, start: number)
  constructor(text: string, source?: string, start?: number) {
    this.text = text
    this.heavy = new CursorHeavy()

    if (source !== undefined) {
      this.heavy.source = source
    } else {
      this.offset = 0
    }
    if (start !== undefined) {
      if (start > text.length) {
        start = text.length
      }
      while (start < text.length && !isRuneStart(text, start)) {
        start++
      }
      this.offset = start
    } else {
      this.offset = 0
    }
  }

  configure(cfg: Cfg): void {
    if (cfg.source) {
      this.heavy.source = cfg.source
    }

    this.heavy.ignoreCase = cfg.ignoreCase ?? false
    this.heavy.nameChars = cfg.nameChars ?? ""
    configurePatterns(this.heavy.patterns, cfg)

    const nc = cfg.nameChars ?? ""
    if (cfg.nameGuard !== undefined && cfg.nameGuard !== null) {
      this.heavy.nameGuard = cfg.nameGuard
    } else {
      this.heavy.nameGuard =
        nc !== "" ||
        (this.heavy.patterns.nonDefault &&
          this.heavy.patterns.wsp !== null &&
          !this.heavy.patterns.wsp.test(""))
    }
  }

  inputSource(): string {
    return this.heavy.source
  }

  mark(): number {
    return this.offset
  }

  reset(mark: number): void {
    this.offset = mark
  }

  len(): number {
    return this.text.length
  }

  lineCount(): number {
    if (this.text.length === 0) return 0
    let count = 0
    for (let i = 0; i < this.text.length; i++) {
      if (this.text[i] === "\n") {
        count++
      }
    }
    if (this.text[this.text.length - 1] !== "\n") {
      count++
    }
    return count
  }

  lineAt(mark: number, keepend: boolean = true): string {
    const lines = this.linesAt(mark, mark + 1, keepend)
    if (lines && lines.length > 0) {
      return lines[0]
    }
    return ""
  }

  linesAt(start: number, end: number, keepend: boolean = false): string[] {
    if (end <= start || start < 0) {
      return []
    }

    const out: string[] = []
    let i = 0
    for (const line of lines(this.text, keepend)) {
      if (i >= end) {
        break
      }
      if (i >= start) {
        out.push(line)
      }
      i++
    }
    return out
  }

  asStr(): string {
    return this.text
  }

  asRef(): string {
    return this.text
  }

  ignoreCase(): boolean {
    return this.heavy.ignoreCase
  }

  nameGuard(): boolean {
    return this.heavy.nameGuard
  }

  lookahead(start: number): string {
    const text = this.text
    if (start >= text.length) {
      return ""
    }
    const lines = splitlines(text.slice(start))
    return stripRight(lines[0])
  }

  atEnd(): boolean {
    return this.offset >= this.text.length
  }

  next(): [string, boolean] {
    const [ch, ok] = this.peek()
    if (ok) {
      this.offset += ch.length
      return [ch, ok]
    }
    return ["", false]
  }

  peek(): [string, boolean] {
    if (this.atEnd()) {
      return ["", false]
    }
    const cp = this.text.codePointAt(this.offset)
    if (cp === undefined) {
      return ["", false]
    }
    return [String.fromCodePoint(cp), true]
  }

  isNameChar(c: string): boolean {
    return c === "_" || isAlphanumeric(c) || this.heavy.nameChars.includes(c)
  }

  isName(token: string): boolean {
    if (token === "") {
      return false
    }
    const cp = token.codePointAt(0)
    if (cp === undefined) {
      return false
    }
    const first = String.fromCodePoint(cp)

    if (
      !isAlphabetic(first) &&
      first !== "_" &&
      !this.heavy.nameChars.includes(first)
    ) {
      return false
    }

    let i = first.length
    while (i < token.length) {
      const cp = token.codePointAt(i)
      if (cp === undefined) {
        return false
      }
      const ch = String.fromCodePoint(cp)

      if (!this.isNameChar(ch)) {
        return false
      }
      i += ch.length
    }
    return true
  }

  peekToken(token: string): [string, boolean] {
    if (this.offset + token.length > this.text.length) {
      return ["", false]
    }
    const slice = this.text.slice(this.offset, this.offset + token.length)
    if (this.heavy.ignoreCase) {
      if (slice.toLowerCase() === token.toLowerCase()) {
        return [slice, true]
      }
    } else if (slice === token) {
      return [slice, true]
    }
    return ["", false]
  }

  matchToken(token: string): [string, boolean] {
    const mark = this.offset

    const [slice, ok] = this.peekToken(token)
    if (!ok) {
      return ["", false]
    }
    // NOTE already a match
    this.offset += token.length
    if (this.offset >= this.text.length) {
      return [slice, true]
    }

    if (!(this.heavy.nameGuard && this.isName(token))) {
      return [slice, true]
    }

    // check righmost boundary
    const cp = this.text.codePointAt(this.offset)
    if (cp === undefined) {
      return [slice, true]
    }

    const next = String.fromCodePoint(cp)
    if (!this.isNameChar(next)) {
      return [slice, true]
    }
    this.offset = mark
    return ["", false]
  }

  matchPattern(pattern: string): [string, boolean] {
    const pat = this.getPattern(pattern)
    if (pat === null) {
      return ["", false]
    }
    const text = this.text.slice(this.offset)
    const m = text.match(pat)
    if (m === null || m.index !== 0) {
      return ["", false]
    }
    this.offset += m[0].length
    if (m[1] !== undefined) {
      return [m[1], true]
    }
    if (m[0] !== undefined) {
      return [m[0], true]
    }
    return ["", false]
  }

  getPattern(pattern: string): RegExp | null {
    const cached = this.heavy.patternCache.get(pattern)
    if (cached !== undefined) {
      return cached
    }
    try {
      const re = XRegExp(pattern)
      this.heavy.patternCache.set(pattern, re as RegExp)
      return re as RegExp
    } catch {
      return null
    }
  }

  matchEOL(): boolean {
    const mark = this.offset
    this.eatSpacesNoNewlines()
    const [n, ok] = takeLinebreakLen(this.text, this.offset)
    if (ok) {
      this.offset += n
      this.eatSpacesNoNewlines()
      return true
    }
    this.offset = mark
    return false
  }

  nextToken(): void {
    const wsp = this.heavy.patterns.wsp
    const eol = this.heavy.patterns.eol
    const cmt = this.heavy.patterns.cmt

    while (true) {
      const prev = this.offset
      this.eatPattern(wsp)
      if (this.eatPattern(eol)) {
        this.eatPattern(wsp)
      }
      this.eatPattern(cmt)
      if (this.atEnd() || this.offset === prev) {
        break
      }
    }
  }

  pos(): [number, number] {
    return this.posAt(this.offset)
  }

  posAt(mark: number): [number, number] {
    const text = this.text
    if (mark <= 0 || text.length === 0) {
      return [1, 1]
    }
    if (mark > text.length) {
      mark = text.length
    }
    const prefix = text.slice(0, mark)
    const lines = splitlines(prefix, true)
    const line = lines[lines.length - 1]

    let lineno = lines.length
    let colno = stripRight(line).length

    if (colno < line.length) {
      lineno += 1
      colno = 1
    } else if (colno <= 0) {
      colno = 1
    }
    return [lineno, colno]
  }

  location(): Location {
    const [line, col] = this.pos()
    return new Location(this.heavy.source, line, col)
  }

  locationAt(mark: number): Location {
    const [line, col] = this.posAt(mark)
    return new Location(this.heavy.source, line, col)
  }

  setTokenizingPatterns(patterns: TokenizingPatterns | null): void {
    if (patterns === null) {
      resetPatterns(this.heavy.patterns)
    } else {
      this.heavy.patterns = patterns
    }
  }

  setIgnoreCase(ignore: boolean): void {
    this.heavy.ignoreCase = ignore
  }

  clone(): Cursor {
    const c = new StrCursor(this.text)
    c.offset = this.offset
    c.heavy = this.heavy
    return c
  }

  private eatPattern(pat: RegExp | null): boolean {
    if (pat === null || this.atEnd() || pat.source === "") {
      return false
    }
    const text = this.text.slice(this.offset)
    const m = text.match(pat)
    if (m !== null && m.index === 0 && m[0].length > 0) {
      this.offset += m[0].length
      return true
    }
    return false
  }

  private eatSpacesNoNewlines(): void {
    for (;;) {
      const prev = this.offset
      this.offset += takeNonNewlineWhitespaceLen(this.text, this.offset)
      if (this.eatPattern(this.heavy.patterns.eol)) {
        this.offset += takeNonNewlineWhitespaceLen(this.text, this.offset)
      }
      this.eatPattern(this.heavy.patterns.cmt)
      if (this.offset === prev) {
        break
      }
    }
  }
}

function isRuneStart(s: string, i: number): boolean {
  const cp = s.charCodeAt(i)
  return cp < 0xdc00 || cp > 0xdfff
}

function takeLinebreakLen(s: string, pos: number): [number, boolean] {
  if (pos >= s.length) {
    return [0, false]
  }
  switch (s[pos]) {
    case "\n":
      return [1, true]
    case "\r":
      if (pos + 1 < s.length && s[pos + 1] === "\n") {
        return [2, true]
      }
      return [1, true]
  }
  return [0, false]
}

function takeNonNewlineWhitespaceLen(s: string, pos: number): number {
  let i = pos
  while (i < s.length) {
    const c = s[i]
    if (c !== " " && c !== "\t" && c !== "\f") {
      break
    }
    i++
  }
  return i - pos
}
