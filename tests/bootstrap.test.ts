import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parseGrammar, compile, parseInput, parse } from "../src/api/index.js"
import { treeToJSON, type Tree } from "../src/trees/tree.js"

function json(t: Tree): unknown {
  return treeToJSON(t)
}

function jsonStr(t: Tree): string {
  return JSON.stringify(json(t))
}

describe("bootstrap :: parse grammar", () => {
  it("simple grammar", () => {
    const grammar = `
      @@grammar :: Simple
      start: 'hello'
    `
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Simple"))
    const parser = compile(grammar)
    const val = json(parseInput(parser, "hello"))
    assert.equal(val, "hello")
    assert.throws(() => parseInput(parser, "world"))
  })

  it("multiple rules", () => {
    const grammar = `@@grammar :: Multi
start = a | b | c ;
a = 'a' ;
b = 'b' ;
c = 'c' ;`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("rules"))
    const val = json(parse(grammar, "a"))
    assert.equal(val, "a")
    assert.equal(json(parse(grammar, "b")), "b")
    assert.equal(json(parse(grammar, "c")), "c")
  })

  it("directive", () => {
    const grammar = `
      @@grammar :: Directives
      @@whitespace :: /\\s+/
      start: 'hello'
    `
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("directive"))
  })
})

describe("bootstrap :: parse expressions", () => {
  it("token", () => {
    const grammar = `@@grammar :: T start: 'foo' 'bar'`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Token"))
  })

  it("pattern", () => {
    const grammar = `@@grammar :: P start: /\\d+/`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Pattern"))
  })

  it("sequence", () => {
    const grammar = `@@grammar :: S start: 'a' 'b' 'c'`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Sequence"))
  })

  it("choice", () => {
    const grammar = `@@grammar :: C start: 'a' | 'b' | 'c'`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Choice"))
  })

  it("optional", () => {
    const grammar = `@@grammar :: O start: 'a' 'b'? 'c'`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Optional"))
  })

  it("closure", () => {
    const grammar = `@@grammar :: Cl start: 'a'*`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Closure"))
  })

  it("positive closure", () => {
    const grammar = `@@grammar :: PC start: 'a'+`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("PositiveClosure"))
  })

  it("group", () => {
    const grammar = `@@grammar :: G start: ('a' 'b')*`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Group"))
  })
})

describe("bootstrap :: parse constraints", () => {
  it("lookahead", () => {
    const grammar = `@@grammar :: L start: &'a' 'a'`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Lookahead"))
  })

  it("negative lookahead", () => {
    const grammar = `@@grammar :: NL start: !'b' 'a'`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("NegativeLookahead"))
  })

  it("cut", () => {
    const grammar = `@@grammar :: Cu start: 'a' ~ 'b'`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Cut"))
  })
})

describe("bootstrap :: parse naming", () => {
  it("named", () => {
    const grammar = `@@grammar :: N start: name='a'`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Named"))
    assert.ok(str.includes("name"))
  })

  it("rule call", () => {
    const grammar = `
      @@grammar :: RC
      start: foo
      foo: 'x'
    `
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Call"))
  })

  it("rule include", () => {
    const grammar = `
      @@grammar :: RI
      start: >base
      base: 'x'
    `
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("RuleInclude"))
  })

  it("rule with params", () => {
    const grammar = `
      @@grammar :: RWP
      start: foo ;
      foo[Foo]: 'x' param ;
    `
    parseGrammar(grammar) // should not throw
  })
})

describe("bootstrap :: parse special forms", () => {
  it("void", () => {
    const grammar = `@@grammar :: V start: 'a' () 'b'`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Void"))
  })

  it("eof", () => {
    const grammar = `@@grammar :: E start: 'a' $`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("EOF"))
  })

  it("dot", () => {
    const grammar = `@@grammar :: D start: /./`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Dot"))
  })

  it("join", () => {
    const grammar = `@@grammar :: J start: ','%{'a'}*`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Join"))
  })

  it("gather", () => {
    const grammar = `@@grammar :: Gt start: ','.{'a'}*`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("Gather"))
  })

  it("skip group", () => {
    const grammar = `@@grammar :: Sk start: (?: 'a' 'b')*`
    const tree = parseGrammar(grammar)
    const str = jsonStr(tree)
    assert.ok(str.includes("SkipGroup"))
  })
})

describe("bootstrap :: integration", () => {
  it("complex grammar", () => {
    const grammar = `@@grammar :: Complex
@@whitespace :: /\\s+/
start = expression ;
expression = term ('+' term)* | term ('-' term)* ;
term = factor ('*' factor)* | factor ('/' factor)* ;
factor = NUMBER | '(' expression ')' ;
NUMBER = /\\d+/ ;`
    const tree = parseGrammar(grammar)
    assert.notEqual(tree, null)
  })
})

describe("bootstrap :: compilation", () => {
  it("compiled grammar parses input", () => {
    const grammar = `
      @@grammar :: Test
      start: 'hello' 'world'
    `
    const parser = compile(grammar)
    const tree = parseInput(parser, "helloworld")
    assert.ok(json(tree) != null)
  })
})
