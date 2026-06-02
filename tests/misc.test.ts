import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse } from "../src/api/index.js"
import { treeToJSON, type Tree } from "../src/trees/tree.js"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("misc", () => {
  it("mapping with named captures", () => {
    const grammar = `@@whitespace :: /\\s+/
start = key:key value:value ;
key = /\\w+/ ;
value = /\\w+/ ;`
    const result = parse(grammar, "foo bar")
    const j = json(result) as Record<string, unknown>
    assert.equal(j.key, "foo")
    assert.equal(j.value, "bar")
  })
})
