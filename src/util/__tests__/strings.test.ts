import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { dedent } from "@util/strings"

describe("dedent", () => {
  it("removes common leading whitespace", () => {
    const s = "  hello\n  world"
    assert.equal(dedent(s), "hello\nworld")
  })

  it("handles mixed indent (common prefix only)", () => {
    const s = "    hello\n  world"
    assert.equal(dedent(s), "  hello\nworld")
  })

  it("ignores empty lines for indent calculation", () => {
    const s = "\n  hello\n  world\n"
    assert.equal(dedent(s), "\nhello\nworld\n")
  })

  it("does nothing when no common indent", () => {
    const s = "hello\nworld"
    assert.equal(dedent(s), "hello\nworld")
  })

  it("handles already trimmed content", () => {
    const s = "hello\n  indented\nworld"
    assert.equal(dedent(s), "hello\n  indented\nworld")
  })

  it("handles single line", () => {
    const s = "  hello"
    assert.equal(dedent(s), "hello")
  })

  it("handles null input", () => {
    assert.equal(dedent(null as unknown as string), "")
  })

  it("handles empty string", () => {
    assert.equal(dedent(""), "")
  })

  it("handles lines with only whitespace", () => {
    const s = "  \n  hello\n  world\n  "
    assert.equal(dedent(s), "  \nhello\nworld\n  ")
  })

  it("preserves line endings", () => {
    const s = "  hello\n  world\n  foo"
    assert.equal(dedent(s), "hello\nworld\nfoo")
  })

  it("handles deeper nesting on some lines", () => {
    const s = "  hello\n    world\n  foo"
    assert.equal(dedent(s), "hello\n  world\nfoo")
  })

  it("trims all lines equally", () => {
    const s = "    def foo():\n        pass\n    "
    assert.equal(dedent(s), "def foo():\n    pass\n    ")
  })
})
