import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse } from "../src/api/index.js"
import { treeToJSON, type Tree } from "../src/trees/tree.js"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("keywords", () => {
  it("rule named whitespace", () => {
    const grammar = `start = whitespace ;
whitespace = {'x'}+ ;`
    const result = parse(grammar, "x")
    assert.equal(json(result), "x")
  })
})
