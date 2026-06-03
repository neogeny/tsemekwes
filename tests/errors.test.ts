import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parse, ApiError } from "../src/api/index.js"
import { treeToJSON, type Tree } from "../src/trees/tree.js"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

// describe("errors", () => {
//   it("missing rule throws", () => {
//     const grammar = `@@grammar :: TestGrammar
// block = test ;`
//     assert.throws(() => compile(grammar), Error)
//   })
//
//   it("valid grammar", () => {
//     const grammar = `start = 'test' $ ;`
//     const result = parse(grammar, "test")
//     assert.equal(json(result), "test")
//   })
//
//   it("invalid input fails", () => {
//     const grammar = `start: 'a'`
//     assert.throws(() => parse(grammar, "b"), ApiError)
//   })
//
//   it("partial match fails", () => {
//     const grammar = `start: 'a' 'b'`
//     assert.throws(() => parse(grammar, "a"), ApiError)
//   })
//
//   it("empty input fails when required", () => {
//     const grammar = `start: 'a'`
//     assert.throws(() => parse(grammar, ""), ApiError)
//   })
// })
