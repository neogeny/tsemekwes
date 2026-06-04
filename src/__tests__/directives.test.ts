import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parse } from "@api"
import { treeToJSON, type Tree } from "@trees"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("directives", () => {
  it("grammar directive sets name", () => {
    const grammar = `@@grammar :: MyGrammar
start: 'test'`
    const parser = compile(grammar)
    assert.equal(parser.name, "MyGrammar")
  })

  it("whitespace directive", () => {
    const grammar = `@@whitespace :: /[\\t ]+/
start: 'a' 'b'`
    const result = parse(grammar, "a b")
    assert.deepStrictEqual(json(result), ["a", "b"])
  })

  it("left_recursion directive", () => {
    const grammar = `@@left_recursion :: False
start: 'test'`
    const result = parse(grammar, "test")
    assert.equal(json(result), "test")
  })

  it("parseinfo directive", () => {
    const grammar = `@@parseinfo :: True
start: 'test'`
    const result = parse(grammar, "test")
    assert.equal(json(result), "test")
  })

  it("nameguard directive", () => {
    const grammar = `@@nameguard :: False
start: 'ab'`
    const result = parse(grammar, "ab")
    assert.equal(json(result), "ab")
  })

  it("comments directive", () => {
    const grammar = `@@comments :: /#[^\\n]*/
start: 'a'`
    const result = parse(grammar, "a")
    assert.equal(json(result), "a")
  })

  it("whitespace directive with double quote token", () => {
    const grammar = `@@whitespace :: /[\\t ]+/
@@grammar :: Test
test := "test" $`
    const result = parse(grammar, "test")
    assert.equal(json(result), "test")
  })
})
