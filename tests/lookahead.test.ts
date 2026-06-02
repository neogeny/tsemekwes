import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse, ApiError } from "../src/api/index.js"
import { treeToJSON, type Tree } from "../src/trees/tree.js"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("lookahead and skip-to", () => {
  it("skip to", () => {
    const grammar = `start = 'x' ab $ ;
ab = 'a' 'b' | -> 'b' ;`
    const result = parse(grammar, "x yb")
    assert.deepStrictEqual(json(result), ["x", "b"])
  })
})
