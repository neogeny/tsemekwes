import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { Cfg } from "../../config/config.js"
import { TokenizingPatterns } from "../patterns"
import { StrCursor } from "../cursor-str.js"

describe("StrCursor", () => {
  it("MatchPattern returns false when pattern does not match at position", () => {
    const s = new StrCursor("abc123def")
    const [, ok] = s.matchPattern(`\\d+`)
    assert.equal(ok, false)
  })

  it("MatchToken consumes matching token", () => {
    const s = new StrCursor("hello world")
    assert.equal(s.matchToken("hello"), true)
    assert.equal(s.mark(), 5)
  })

  it("PeekToken checks without consuming", () => {
    const s = new StrCursor("hello")
    assert.equal(s.peekToken("hello"), true)
    assert.equal(s.mark(), 0)
  })

  it("PeekToken returns false for wrong token", () => {
    const s = new StrCursor("hello")
    assert.equal(s.peekToken("world"), false)
  })

  it("Next and Peek advance correctly", () => {
    const s = new StrCursor("ab")
    const r1 = s.peek()
    assert.equal(r1, "a")
    const r2 = s.next()
    assert.equal(r2, "a")
    assert.equal(s.mark(), 1)
  })

  it("AtEnd detects end of input", () => {
    const s = new StrCursor("a")
    assert.equal(s.atEnd(), false)
    s.next()
    assert.equal(s.atEnd(), true)
  })

  it("Pos tracks line and column across newlines", () => {
    const s = new StrCursor("hello\nworld")
    let [line, col] = s.pos()
    assert.equal(line, 1)
    assert.equal(col, 1)
    for (let i = 0; i < 6; i++) {
      s.next()
    }
    ;[line, col] = s.pos()
    assert.equal(line, 2)
    assert.equal(col, 1)
  })

  it("clone has independent offset", () => {
    const s = new StrCursor("hello")
    const c = s.clone()
    s.next()
    assert.notEqual(s.mark(), c.mark())
  })

  it("MatchPattern succeeds with group capture", () => {
    const s = new StrCursor("abc123def")
    s.next()
    s.next()
    s.next()
    const [m, ok] = s.matchPattern(`\\d+`)
    assert.equal(ok, true)
    assert.equal(m, "123")
    assert.equal(s.mark(), 6)
  })

  it("MatchPattern returns group 1 when present", () => {
    const s = new StrCursor("foo bar baz")
    const [m, ok] = s.matchPattern(`(foo)\\s+(bar)`)
    assert.equal(ok, true)
    assert.equal(m, "foo")
  })

  it("MatchEOL matches linebreak sequences", () => {
    const cases: [string, boolean, number][] = [
      ["\n", true, 1],
      ["\r\n", true, 2],
      ["\r", true, 1],
      ["abc", false, 0],
      ["", false, 0],
    ]
    for (const [input, want, off] of cases) {
      const s = new StrCursor(input)
      const got = s.matchEOL()
      assert.equal(got, want, `matchEOL(${JSON.stringify(input)})`)
      assert.equal(s.mark(), off, `matchEOL(${JSON.stringify(input)}) offset`)
    }
  })

  it("MatchEOL skips whitespace before newline", () => {
    const wsp = /[ \t]+/
    const s = new StrCursor("   \nnext")
    s.setPatterns(new TokenizingPatterns(wsp, null, null))
    assert.equal(s.matchEOL(), true)
    assert.equal(s.mark(), 4)
  })

  it("PosAt returns position at given mark", () => {
    const s = new StrCursor("hello\nworld\nfoo")
    const cases: [number, number, number][] = [
      [0, 1, 1],
      [5, 1, 5],
      [3, 1, 3],
      [6, 2, 1],
      [11, 2, 5],
      [12, 3, 1],
      [15, 3, 3],
    ]
    for (const [pos, eline, ecol] of cases) {
      const [line, col] = s.posAt(pos)
      assert.equal(line, eline, `posAt(${pos}) line`)
      assert.equal(col, ecol, `posAt(${pos}) col`)
    }
  })

  it("PosAt past end clamps to last position", () => {
    const s = new StrCursor("hi")
    const [line, col] = s.posAt(100)
    assert.equal(line, 1)
    assert.equal(col, 2)
  })

  it("Location returns source, line, col", () => {
    const s = new StrCursor("hello\nworld", "test.txt", 0)
    let loc = s.location()
    assert.equal(loc.source, "test.txt")
    assert.equal(loc.line, 1)
    assert.equal(loc.col, 1)
    for (let i = 0; i < 6; i++) {
      s.next()
    }
    loc = s.location()
    assert.equal(loc.source, "test.txt")
    assert.equal(loc.line, 2)
    assert.equal(loc.col, 1)
  })

  it("LocationAt returns location at given mark", () => {
    const s = new StrCursor("abc\ndef", "src", 0)
    const loc = s.locationAt(4)
    assert.equal(loc.source, "src")
    assert.equal(loc.line, 2)
    assert.equal(loc.col, 1)
  })

  it("InputSource returns source name", () => {
    const s = new StrCursor("grammar", "myfile.ebnf", 0)
    assert.equal(s.inputSource(), "myfile.ebnf")
  })

  it("AsStr returns full input", () => {
    const s = new StrCursor("some text")
    assert.equal(s.asStr(), "some text")
  })

  it("AsRef returns full input", () => {
    const s = new StrCursor("ref text")
    assert.equal(s.asRef(), "ref text")
  })

  it("IgnoreCase is false by default", () => {
    const s = new StrCursor("HELLO")
    assert.equal(s.ignoreCase(), false)
  })

  it("NameGuard is false by default", () => {
    const s = new StrCursor("hello")
    assert.equal(s.nameGuard(), false)
  })

  it("Lookahead returns line from offset", () => {
    const s = new StrCursor("hello world\nnext line")
    assert.equal(s.lookahead(0), "hello world")
    assert.equal(s.lookahead(12), "next line")
    assert.equal(s.lookahead(100), "")
  })

  it("Lookahead on single line", () => {
    const s = new StrCursor("single line")
    assert.equal(s.lookahead(0), "single line")
  })

  it("constructor with source and start offset", () => {
    const s = new StrCursor("hello world", "src", 6)
    assert.equal(s.mark(), 6)
    assert.equal(s.inputSource(), "src")
  })

  it("constructor clamps start to text length", () => {
    const s = new StrCursor("hi", "src", 100)
    assert.equal(s.mark(), 2)
  })

  it("SetPatterns and NextToken skip whitespace and comments", () => {
    const wsp = /[ \t]+/
    const cmt = /#[^\n]*/
    const eol = /\r?\n/
    const s = new StrCursor("  # comment \n  hello")
    s.setPatterns(new TokenizingPatterns(wsp, cmt, eol))
    s.nextToken()
    assert.equal(s.matchToken("hello"), true)
  })

  it("SetPatterns with null resets to defaults", () => {
    const s = new StrCursor("hello")
    s.setPatterns(null)
    s.nextToken()
    assert.equal(s.matchToken("hello"), true)
  })

  it("Reset moves position", () => {
    const s = new StrCursor("hello")
    s.reset(1)
    assert.equal(s.mark(), 1)
  })

  it("Clone is independent after original moves", () => {
    const s = new StrCursor("hello world")
    const c = s.clone()
    assert.equal(c.mark(), 0)
    s.reset(6)
    assert.equal(c.mark(), 0)
  })

  it("Pos on empty input returns (1, 1)", () => {
    const s = new StrCursor("")
    const [line, col] = s.pos()
    assert.equal(line, 1)
    assert.equal(col, 1)
  })

  it("GetPattern caches compiled regexps", () => {
    const s = new StrCursor("")
    const p1 = s.getPattern(`\\d+`)
    assert.ok(p1 !== null)
    const p2 = s.getPattern(`\\d+`)
    assert.equal(p2, p1)
  })

  it("GetPattern returns null for invalid pattern", () => {
    const s = new StrCursor("")
    const p = s.getPattern(`[invalid`)
    assert.equal(p, null)
  })

  it("Peek returns null at end", () => {
    const s = new StrCursor("")
    assert.equal(s.peek(), null)
  })

  it("Next returns null at end", () => {
    const s = new StrCursor("")
    assert.equal(s.next(), null)
  })

  it("NextToken with default patterns skips whitespace", () => {
    const s = new StrCursor("   hello")
    s.nextToken()
    assert.equal(s.mark(), 3)
  })

  it("LineCount on empty input", () => {
    const s = new StrCursor("")
    assert.equal(s.lineCount(), 0)
  })

  it("LineCount on single line", () => {
    const s = new StrCursor("hello")
    assert.equal(s.lineCount(), 1)
  })

  it("LineCount on multi-line", () => {
    const s = new StrCursor("hello\nworld\nfoo")
    assert.equal(s.lineCount(), 3)
  })

  it("LineAt returns specific line", () => {
    const s = new StrCursor("line1\nline2\nline3")
    assert.equal(s.lineAt(0), "line1\n")
    assert.equal(s.lineAt(1), "line2\n")
    assert.equal(s.lineAt(2), "line3")
  })

  it("LineAt returns empty for out of range", () => {
    const s = new StrCursor("hello")
    assert.equal(s.lineAt(5), "")
  })

  it("LinesAt returns range of lines", () => {
    const s = new StrCursor("a\nb\nc\nd\n")
    const lines = s.linesAt(1, 3)
    assert.equal(lines.length, 2)
    assert.equal(lines[0], "b\n")
    assert.equal(lines[1], "c\n")
  })

  it("LinesAt returns empty for invalid range", () => {
    const s = new StrCursor("hello")
    assert.equal(s.linesAt(2, 1).length, 0)
  })

  it("IsNameChar detects valid name characters", () => {
    const s = new StrCursor("")
    assert.equal(s.isNameChar("_"), true)
    assert.equal(s.isNameChar("a"), true)
    assert.equal(s.isNameChar("Z"), true)
    assert.equal(s.isNameChar("0"), true)
    assert.equal(s.isNameChar("$"), false)
  })

  it("IsNameChar with custom NameChars", () => {
    const s = new StrCursor("")
    const cfg = new Cfg()
    cfg.nameChars = "$"
    s.configure(cfg)
    assert.equal(s.isNameChar("$"), true)
  })

  it("IsName validates names", () => {
    const s = new StrCursor("")
    assert.equal(s.isName("hello"), true)
    assert.equal(s.isName("_foo"), true)
    assert.equal(s.isName(""), false)
    assert.equal(s.isName("123"), false)
  })

  it("MatchToken with nameguard prevents partial match", () => {
    const s = new StrCursor("hello_world")
    const cfg = new Cfg()
    cfg.nameChars = "_"
    s.configure(cfg)
    assert.equal(s.matchToken("hello"), false)
    assert.equal(s.mark(), 0)
  })

  it("configure sets source", () => {
    const s = new StrCursor("text")
    const cfg = new Cfg()
    cfg.source = "custom.ebnf"
    s.configure(cfg)
    assert.equal(s.inputSource(), "custom.ebnf")
  })

  it("PeekToken is case-sensitive by default", () => {
    const s = new StrCursor("Hello")
    assert.equal(s.peekToken("hello"), false)
  })

  it("PeekToken is case-insensitive with ignoreCase", () => {
    const s = new StrCursor("Hello")
    const cfg = new Cfg()
    cfg.ignoreCase = true
    s.configure(cfg)
    assert.equal(s.peekToken("hello"), true)
  })

  it("LineAt empty string returns empty lines", () => {
    const s = new StrCursor("")
    assert.equal(s.lineAt(0), "")
  })
})
