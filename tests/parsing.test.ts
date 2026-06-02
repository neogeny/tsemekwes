import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parse, parseInput, ApiError } from "../src/api/index.js"
import { treeToJSON, type Tree } from "../src/trees/tree.js"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("parsing", () => {
  it("escape sequences in tokens", () => {
    const grammar = `@@whitespace :: /\\s+/
start = 'hello\\nworld' $ ;`
    const parser = compile(grammar)
    const result = parseInput(parser, "hello\\nworld")
    assert.equal(json(result), "hello\\nworld")
  })

  it("start rule with constant", () => {
    const grammar = `@@grammar :: Test
true = 'test' @:\`True\` $ ;
false = 'test' @:\`False\` $ ;`
    const tree = parse(grammar, "test")
    assert.equal(json(tree), "True")
  })

  it("skip whitespace", () => {
    const grammar = `@@whitespace :: /\\s+/
statement = 'FOO' subject $ ;
subject = name:id ;
id = /[a-z]+/ ;`
    parse(grammar, "FOO something")
    assert.throws(() => parse(grammar, "something"), ApiError)
    assert.throws(() => parse(grammar, "FOO"), ApiError)
  })

  it("node parseinfo", () => {
    const grammar = `@@grammar :: Test
@@parseinfo :: True
start = 'test' $ ;`
    const parser = compile(grammar)
    const ast = parseInput(parser, "test")
    const j = json(ast)
    assert.equal(j, "test")
  })

  it("parseinfo directive", () => {
    const grammar = `@@parseinfo :: True
start = 'test' $ ;`
    const parser = compile(grammar)
    const ast = parseInput(parser, "test")
    assert.equal(json(ast), "test")
  })

  it("parseinfo false", () => {
    const grammar = `@@parseinfo :: False
start = 'test' $ ;`
    const parser = compile(grammar)
    const ast = parseInput(parser, "test")
    assert.equal(json(ast), "test")
  })

  it("cut scope", () => {
    const grammar = `start =
    | one
    | two
    ;

one =
    | ~ !()
    | 'abc' ;

two = 'something' ;`
    const parser = compile(grammar)
    const ast = parseInput(parser, "something")
    assert.equal(json(ast), "something")
  })
})
