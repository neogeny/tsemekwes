import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parseInput } from "../src/api/index.js"
import { treeToJSON, type Tree } from "../src/trees/tree.js"

function json(t: Tree): unknown {
  return treeToJSON(t)
}

describe("input positions", () => {
  it("basic position tracking", () => {
    const grammar = `
      start: 'hello'
    `
    const model = compile(grammar)
    const tree = parseInput(model, "hello")
    assert.equal(json(tree), "hello")
  })

  it("multiline input", () => {
    const grammar = `
      @@whitespace :: /\\s+/
      start: 'hello' 'world'
    `
    const tree = parseInput(compile(grammar), "hello\nworld")
    assert.deepStrictEqual(json(tree), ["hello", "world"])
  })
})
