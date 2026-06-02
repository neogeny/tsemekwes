import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parseInput } from "../src/api/index.js"
import { treeToJSON, type Tree } from "../src/trees/tree.js"

function json(t: Tree): unknown {
  return treeToJSON(t)
}

describe("complex grammars", () => {
  it("calculator grammar", () => {
    const grammar = `@@left_recursion :: True
@@whitespace :: /\\s+/
start = expression $ ;
expression = expression '+' term | expression '-' term | term ;
term = term '*' factor | term '/' factor | factor ;
factor = NUMBER | '(' expression ')' ;
NUMBER = /\\d+/ ;`
    const model = compile(grammar)
    const tree = parseInput(model, "3 + 5 * (10 - 20 )")
    const val = json(tree)
    assert.notEqual(val, null)
  })

  it("json-like grammar", () => {
    const grammar = `@@nameguard :: False
@@whitespace :: /\\s+/
start = value $ ;
value = object | array | string | number | 'true' | 'false' | 'null' ;
object = '{' members? '}' ;
array = '[' elements? ']' ;
members = pair (',' pair)* ;
elements = value (',' value)* ;
pair = string ':' value ;
string = '"' CONTENT '"' ;
CONTENT = /[^"]*/ ;
number = /-?\\d+(\\.\\d+)?/ ;`
    const model = compile(grammar)
    const tree = parseInput(model, '{"key": "value"}')
    const val = json(tree)
    assert.notEqual(val, null)
  })

  it("lisp-like grammar", () => {
    const grammar = `@@nameguard :: False
@@whitespace :: /\\s+/
start = sexp $ ;
sexp = atom | list ;
list = '(' items ')' ;
items = sexp* ;
atom = WORD ;
WORD = /\\w+/ ;`
    const model = compile(grammar)
    const tree = parseInput(model, "(hello world)")
    const val = json(tree)
    assert.notEqual(val, null)
  })
})
