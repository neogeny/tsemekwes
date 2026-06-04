import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parseInput } from "@api"
import { treeToJSON, type Tree } from "@trees"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("basic grammar", () => {
  it("simple grammar", () => {
    const grammar = `@@grammar :: Test
start: 'hello'`
    const parser = compile(grammar)
    const result = parseInput(parser, "hello")
    assert.equal(json(result), "hello")
  })

  it("multiple rules", () => {
    const grammar = `@@grammar :: Test
start: choice

choice:
    | 'a'
    | 'b'
    | 'c'`
    const parser = compile(grammar)
    const result = parseInput(parser, "a")
    assert.equal(json(result), "a")
  })

  it("rule references", () => {
    const grammar = `@@grammar :: Test
start: 'hello' 'world'`
    const parser = compile(grammar)
    const result = parseInput(parser, "helloworld")
    assert.deepStrictEqual(json(result), ["hello", "world"])
  })

  it("empty input with optional", () => {
    const grammar = `@@grammar :: Test
start: 'test'?`
    const parser = compile(grammar)
    const result = parseInput(parser, "")
    assert.equal(json(result), null)
  })
})
