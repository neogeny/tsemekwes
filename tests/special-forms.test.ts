import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse } from "#api/api"
import { treeToJSON, type Tree } from "../src/trees"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("special forms", () => {
  it("group", () => {
    const grammar = `start: ('a' 'b')*`
    const result = parse(grammar, "abab")
    assert.deepStrictEqual(json(result), [
      ["a", "b"],
      ["a", "b"],
    ])
  })

  it("skip group", () => {
    const grammar = `start: (?: 'a' 'b')*`
    const result = parse(grammar, "abab")
    assert.deepStrictEqual(json(result), [null, null])
  })

  it("void", () => {
    const grammar = `@@whitespace :: /\\s+/
start: 'a' () 'b'`
    const result = parse(grammar, "a b")
    assert.deepStrictEqual(json(result), ["a", "b"])
  })

  it("eof", () => {
    const grammar = `start: 'a' $`
    const result = parse(grammar, "a")
    assert.equal(json(result), "a")
  })

  it("dot", () => {
    const grammar = `start: /./ 'b'`
    const result = parse(grammar, "ab")
    assert.deepStrictEqual(json(result), ["a", "b"])
  })
})
