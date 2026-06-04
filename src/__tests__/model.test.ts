import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parseInput } from "@api"
import { asjson } from "@util/asjson"

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
    assert.equal(asjson(ast), "x")
  })

  it("node kwargs", () => {
    const grammar = `
      start = 'value' ;
    `
    const model = compile(grammar)
    const ast = parseInput(model, "value")
    assert.equal(asjson(ast), "value")
  })
})
