import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse, ApiError } from "../src/api/index.js"
import { treeToJSON, type Tree } from "../src/trees/tree.js"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("join", () => {
  it("positive join", () => {
    const grammar = `@@whitespace :: /\\s+/
@@nameguard :: False
start = ','%{'x' 'y'}+ ;`
    const result = parse(grammar, "x y, x y")
    assert.deepStrictEqual(json(result), [["x", "y"], ",", ["x", "y"]])
  })

  it("positive join single match", () => {
    const grammar = `@@whitespace :: /\\s+/
@@nameguard :: False
start = ','%{'x' 'y'}+ ;`
    const result = parse(grammar, "x y x y")
    assert.deepStrictEqual(json(result), [["x", "y"]])
  })

  it("positive join fails without match", () => {
    const grammar = `@@whitespace :: /\\s+/
@@nameguard :: False
start = ','%{'x' 'y'}+ ;`
    assert.throws(() => parse(grammar, "y x"), ApiError)
  })
})
