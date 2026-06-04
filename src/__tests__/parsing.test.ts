import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { ApiError, compile, parse, parseInput } from "@api"
import { asjson } from "@util/asjson"

describe("parsing", () => {
  it("escape sequences in tokens", () => {
    const grammar = `@@whitespace :: /\\s+/
start = 'hello\\nworld' $ ;`
    const parser = compile(grammar)
    const result = parseInput(parser, "hello\\nworld")
    assert.equal(asjson(result), "hello\\nworld")
  })

  it("start rule with constant", () => {
    const grammar = `@@grammar :: Test
true = 'test' @:\`True\` $ ;
false = 'test' @:\`False\` $ ;`
    const tree = parse(grammar, "test")
    assert.equal(asjson(tree), "True")
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
    const j = asjson(ast)
    assert.equal(j, "test")
  })

  it("parseinfo directive", () => {
    const grammar = `@@parseinfo :: True
start = 'test' $ ;`
    const parser = compile(grammar)
    const ast = parseInput(parser, "test")
    assert.equal(asjson(ast), "test")
  })

  it("parseinfo false", () => {
    const grammar = `@@parseinfo :: False
start = 'test' $ ;`
    const parser = compile(grammar)
    const ast = parseInput(parser, "test")
    assert.equal(asjson(ast), "test")
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
    assert.equal(asjson(ast), "something")
  })
})
