import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse } from "../src/api/index.js"
import { treeToJSON, type Tree } from "../src/trees/tree.js"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("naming and override", () => {
  it("named capture", () => {
    const grammar = `start: name='hello'`
    const result = parse(grammar, "hello")
    assert.deepStrictEqual(json(result), { name: "hello" })
  })

  it("override singleton", () => {
    const grammar = `start: ='hello'`
    const result = parse(grammar, "hello")
    assert.equal(json(result), "hello")
  })
})
