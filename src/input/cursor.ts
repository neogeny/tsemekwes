import type { TokenizingPatterns } from "@input"
import type { Configurable } from "@config"

export class Location {
  constructor(
    public source: string,
    public line: number,
    public col: number,
  ) {}
}

export interface Cursor extends Configurable {
  inputSource(): string
  mark(): number
  reset(mark: number): void
  len(): number
  lineCount(): number
  lineAt(n: number): string
  linesAt(start: number, end: number): string[]
  asStr(): string
  asRef(): string
  ignoreCase(): boolean
  nameGuard(): boolean
  lookahead(start: number): string
  atEnd(): boolean
  next(): [string, boolean]
  peek(): [string, boolean]
  peekToken(token: string): [string, boolean]
  matchToken(token: string): [string, boolean]
  matchPattern(pattern: string): [string, boolean]
  getPattern(pattern: string): RegExp | null
  isNameChar(c: string): boolean
  isName(s: string): boolean
  matchEOL(): boolean
  nextToken(): void
  pos(): [number, number]
  posAt(mark: number): [number, number]
  location(): Location
  locationAt(mark: number): Location
  setTokenizingPatterns(patterns: TokenizingPatterns): void
  setIgnoreCase(ignore: boolean): void
  clone(): Cursor
}
