import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parseInput } from "../src/api/index.js"
import { treeToJSON, type Tree } from "../src/trees/tree.js"

function json(t: Tree): unknown {
  return treeToJSON(t)
}

describe("model", () => {
  it("children", () => {
    const grammar = `
      @@grammar :: Calc
      start = expression $ ;
      expression = term ;
      term = 'x' ;
    `
    const model = compile(grammar)
    const ast = parseInput(model, "x")
    assert.equal(json(ast), "x")
  })

  it("node kwargs", () => {
    const grammar = `
      start = 'value' ;
    `
    const model = compile(grammar)
    const ast = parseInput(model, "value")
    assert.equal(json(ast), "value")
  })
})
