import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse } from "@api"
import { treeToJSON, type Tree } from "@trees"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("tokens and sequences", () => {
  it("token sequence with whitespace", () => {
    const grammar = `@@whitespace :: /\\s+/
start: 'hello' 'world'`
    const result = parse(grammar, "hello world")
    assert.deepStrictEqual(json(result), ["hello", "world"])
  })

  it("optional token present", () => {
    const grammar = `@@whitespace :: /\\s+/
start: 'a' 'b'?`
    const result = parse(grammar, "a b")
    assert.deepStrictEqual(json(result), ["a", "b"])
  })

  it("optional token absent", () => {
    const grammar = `@@whitespace :: /\\s+/
start: 'a' 'b'?`
    const result = parse(grammar, "a")
    assert.equal(json(result), "a")
  })

  it("closure tokens", () => {
    const grammar = `start: 'a'*`
    const result = parse(grammar, "aaa")
    assert.deepStrictEqual(json(result), ["a", "a", "a"])
  })

  it("positive closure", () => {
    const grammar = `start: 'a'+`
    const result = parse(grammar, "aaa")
    assert.deepStrictEqual(json(result), ["a", "a", "a"])
  })

  it("choice alternatives - a", () => {
    const grammar = `start: 'a' | 'b' | 'c'`
    const result = parse(grammar, "a")
    assert.equal(json(result), "a")
  })

  it("choice alternatives - b", () => {
    const grammar = `start: 'a' | 'b' | 'c'`
    const result = parse(grammar, "b")
    assert.equal(json(result), "b")
  })

  it("choice alternatives - c", () => {
    const grammar = `start: 'a' | 'b' | 'c'`
    const result = parse(grammar, "c")
    assert.equal(json(result), "c")
  })
})
