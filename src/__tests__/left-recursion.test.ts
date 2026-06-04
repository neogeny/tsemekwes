import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse, ApiError } from "@api"
import { treeToJSON, type Tree } from "@trees"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("left recursion", () => {
  it("direct left recursion", () => {
    const grammar = `@@left_recursion :: True
@@whitespace :: /\\s+/
start = expression $ ;
expression = expression '+' factor | expression '-' factor | factor ;
factor = number ;
number = /[0-9]+/ ;`
    const result = parse(grammar, "10 - 20")
    assert.deepStrictEqual(json(result), ["10", "-", "20"])
  })

  it("indirect left recursion y", () => {
    const grammar = `@@left_recursion :: True
@@whitespace :: /\\s+/
start = A $ ;
A = B | 'x' ;
B = A | 'y' ;`
    const result = parse(grammar, "y")
    assert.equal(json(result), "y")
  })

  it("indirect left recursion x", () => {
    const grammar = `@@left_recursion :: True
@@whitespace :: /\\s+/
start = A $ ;
A = B | 'x' ;
B = A | 'y' ;`
    const result = parse(grammar, "x")
    assert.equal(json(result), "x")
  })

  it("LR disabled via directive", () => {
    const grammar = `@@left_recursion :: False
@@whitespace :: /\\s+/
start = expression $ ;
expression = expression '+' factor | expression '-' factor | factor ;
factor = number ;
number = /[0-9]+/ ;`
    assert.throws(() => parse(grammar, "10 - 20"), ApiError)
  })

  it("LR disabled with parens", () => {
    const grammar = `@@left_recursion :: False
@@whitespace :: /\\s+/
start = expr $ ;
expr = '(' expr ')' | number ;
number = /[0-9]+/ ;`
    const result = parse(grammar, "((1))")
    assert.deepStrictEqual(json(result), ["(", ["(", "1", ")"], ")"])
  })
})
