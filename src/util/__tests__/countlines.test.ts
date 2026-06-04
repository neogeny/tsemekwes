import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { countLines } from "../countlines"

describe("countLines", () => {
  it("empty string", () => {
    const got = countLines("")
    assert.deepEqual(got, { total: 0, blank: 0, comment: 0, code: 0 })
  })

  it("trailing newline", () => {
    const got = countLines("hello\n")
    assert.deepEqual(got, { total: 2, blank: 1, comment: 0, code: 1 })
  })

  it("no trailing newline", () => {
    const got = countLines("hello")
    assert.deepEqual(got, { total: 1, blank: 0, comment: 0, code: 1 })
  })

  it("default comment prefix", () => {
    const s = "code\n// comment\n  // indented comment\nnot a comment\n"
    const got = countLines(s)
    assert.deepEqual(got, { total: 5, blank: 1, comment: 2, code: 2 })
  })

  it("whitespace only line", () => {
    const got = countLines("code\n   \nmore")
    assert.deepEqual(got, { total: 3, blank: 1, comment: 0, code: 2 })
  })

  it("multi char prefix", () => {
    const s = "x := 1\n--[[ block ]]\ny := 2\n"
    const got = countLines(s, "--")
    assert.deepEqual(got, { total: 4, blank: 1, comment: 1, code: 2 })
  })

  it("only newline", () => {
    const got = countLines("\n")
    assert.deepEqual(got, { total: 2, blank: 2, comment: 0, code: 0 })
  })

  it("CRLF", () => {
    const s = "line1\r\nline2\r\n"
    const got = countLines(s)
    assert.deepEqual(got, { total: 3, blank: 1, comment: 0, code: 2 })
  })

  it("shebang is code", () => {
    const s = "#!/bin/sh\necho hi\n"
    const got = countLines(s)
    assert.deepEqual(got, { total: 3, blank: 1, comment: 0, code: 2 })
  })

  it("hash comment", () => {
    const s = "# shell script\necho hello\n"
    const got = countLines(s, "#")
    assert.deepEqual(got, { total: 3, blank: 1, comment: 1, code: 1 })
  })
})
