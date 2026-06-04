import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse } from "@api"
import { asjson } from "@util/asjson"

describe("patterns", () => {
  it("simple pattern", () => {
    const grammar = `@@grammar :: Test
start: /\\d+/`
    const result = parse(grammar, "123")
    assert.equal(asjson(result), "123")
  })

  it("pattern with letters", () => {
    const grammar = `@@grammar :: Test
start: /[a-z]+/`
    const result = parse(grammar, "hello")
    assert.equal(asjson(result), "hello")
  })

  it("pattern with anchors", () => {
    const grammar = `@@grammar :: Test
start: /^start/`
    const result = parse(grammar, "start")
    assert.equal(asjson(result), "start")
  })

  it("pattern case insensitive", () => {
    const grammar = `start: /(?i)hello/`
    const result = parse(grammar, "HELLO")
    assert.equal(asjson(result), "HELLO")
  })

  it("regex character classes", () => {
    const grammar = `start: /[A-Za-z_]\\w*/`
    const result = parse(grammar, "hello_world")
    assert.equal(asjson(result), "hello_world")
  })

  it("patterns with newlines", () => {
    const grammar = `@@whitespace :: /[ \\t]/
start = blanklines $ ;
blanklines = blankline [blanklines] ;
blankline = /(?m)^[^\\n]*\\n$/ ;`
    const result = parse(grammar, "\n\n")
    assert.deepStrictEqual(asjson(result), ["\n", "\n"])
  })
})
