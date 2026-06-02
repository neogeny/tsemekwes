import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parse, parseInput, ApiError } from "../src/api/index.js"
import { treeToJSON, type Tree } from "../src/trees/tree.js"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("sanity", () => {
  it("simple grammar compile and parse", () => {
    const grammar = `@@grammar :: Test
start = 'hello' $ ;`
    const result = parse(grammar, "hello")
    assert.equal(json(result), "hello")
  })

  it("parse fails on invalid input", () => {
    const grammar = `@@grammar :: Test
start = 'hello' $ ;`
    assert.throws(() => parse(grammar, "world"), ApiError)
  })

  it("two-step compile + parseInput", () => {
    const grammar = `@@grammar :: Test
start = 'hello' 'world' $ ;`
    const parser = compile(grammar)
    const result = parseInput(parser, "helloworld")
    assert.deepStrictEqual(json(result), ["hello", "world"])
  })

  it("rule with : separator", () => {
    const grammar = `@@grammar :: Test
start: 'hello' $ ;`
    const result = parse(grammar, "hello")
    assert.equal(json(result), "hello")
  })

  it("directive without space before value", () => {
    const g = `@@grammar :: Test
@@whitespace :: None
start = 'hello' $ ;`
    const result = parse(g, "hello")
    assert.equal(json(result), "hello")
  })

  it("::= separator", () => {
    const g = `@@grammar :: Test
start ::= 'hello' $ ;`
    const result = parse(g, "hello")
    assert.equal(json(result), "hello")
  })
})
