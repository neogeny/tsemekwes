import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse, ApiError } from "../src/api/index.js"
import { treeToJSON, type Tree } from "../src/trees/tree.js"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("constraints", () => {
  it("positive lookahead", () => {
    const grammar = `start: &'a' 'a'`
    const result = parse(grammar, "a")
    assert.equal(json(result), "a")
  })

  it("negative lookahead", () => {
    const grammar = `start: !'b' 'a'`
    const result = parse(grammar, "a")
    assert.equal(json(result), "a")
  })

  it("cut with whitespace", () => {
    const grammar = `@@whitespace :: /\\s+/
start: 'a'~'b'`
    const result = parse(grammar, "a b")
    assert.deepStrictEqual(json(result), ["a", "b"])
  })
})
