import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse } from "@api"
import { treeToJSON, type Tree } from "@trees"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("patterns", () => {
  it("simple pattern", () => {
    const grammar = `@@grammar :: Test
start: /\\d+/`
    const result = parse(grammar, "123")
    assert.equal(json(result), "123")
  })

  it("pattern with letters", () => {
    const grammar = `@@grammar :: Test
start: /[a-z]+/`
    const result = parse(grammar, "hello")
    assert.equal(json(result), "hello")
  })

  it("pattern with anchors", () => {
    const grammar = `@@grammar :: Test
start: /^start/`
    const result = parse(grammar, "start")
    assert.equal(json(result), "start")
  })

  it("pattern case insensitive", () => {
    const grammar = `start: /(?i)hello/`
    const result = parse(grammar, "HELLO")
    assert.equal(json(result), "HELLO")
  })

  it("regex character classes", () => {
    const grammar = `start: /[A-Za-z_]\\w*/`
    const result = parse(grammar, "hello_world")
    assert.equal(json(result), "hello_world")
  })

  it("patterns with newlines", () => {
    const grammar = `@@whitespace :: /[ \\t]/
start = blanklines $ ;
blanklines = blankline [blanklines] ;
blankline = /(?m)^[^\\n]*\\n$/ ;`
    const result = parse(grammar, "\n\n")
    assert.deepStrictEqual(json(result), ["\n", "\n"])
  })
})
