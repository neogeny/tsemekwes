import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { ApiError, parse } from "@api"
import { asjson } from "@util/asjson"

describe("syntax", () => {
  it("optional closure with named", () => {
    const grammar = `start = foo+:"x" foo:{"y"}* {foo:"z"}* ;`
    const result = parse(grammar, "xyyzz")
    const j = asjson(result) as Record<string, unknown>
    assert.deepStrictEqual(j.foo, ["x", ["y", "y"], "z", "z"])
  })

  it("optional sequence", () => {
    const grammar = `start = '1' ['2' '3'] '4' $ ;`
    const result = parse(grammar, "1234")
    assert.deepStrictEqual(asjson(result), ["1", "2", "3", "4"])
  })

  it("optional sequence with named", () => {
    const grammar = `start = '1' foo:['2' '3'] '4' $ ;`
    const result = parse(grammar, "1234")
    assert.deepStrictEqual(asjson(result), { foo: ["2", "3"] })
  })

  it("group ast", () => {
    const grammar = `start = '1' ('2' '3') '4' $ ;`
    const result = parse(grammar, "1234")
    assert.deepStrictEqual(asjson(result), ["1", "2", "3", "4"])
  })

  it("override new syntax", () => {
    const grammar = `@@whitespace :: None
start = @:'a' {@:'b'} $ ;`
    const result = parse(grammar, "abb")
    assert.deepStrictEqual(asjson(result), ["a", "b", "b"])
  })

  it("rule include", () => {
    const grammar = `@@whitespace :: None
start = b $;
a = @:'a' ;
b = >a {@:'b'} ;`
    const result = parse(grammar, "abb")
    assert.deepStrictEqual(asjson(result), ["a", "b", "b"])
  })

  it("48 rule override", () => {
    const grammar = `@@whitespace :: None
start = ab $;
ab = 'xyz' ;
@override
ab = @:'a' {@:'b'} ;`
    const result = parse(grammar, "abb")
    assert.deepStrictEqual(asjson(result), ["a", "b", "b"])
  })

  it("empty closure", () => {
    const grammar = `start = {'x'}+ {} 'y' $;`
    const result = parse(grammar, "xxxy")
    assert.deepStrictEqual(asjson(result), [["x", "x", "x"], [], "y"])
  })

  it("any expression", () => {
    const grammar = `@@whitespace :: /\\s+/
start = /./ 'xx' /./ /./ 'yy' $;`
    const result = parse(grammar, "1xx 2 yy")
    assert.deepStrictEqual(asjson(result), ["1", "xx", " ", "2", "yy"])
  })

  it("non-capturing group exclusion", () => {
    const grammar = `start: header (?: delimiter ) body
header: /[A-Z]+/
delimiter: /[:,-]+/
body: /[a-z]+/`
    const result = parse(grammar, "INFO---data")
    assert.deepStrictEqual(asjson(result), ["INFO", "data"])
  })

  it("non-capturing group failure", () => {
    const grammar = `@@whitespace :: None
start = (?: 'FIX' ) value ; value = /\\d+/`
    assert.throws(() => parse(grammar, "BUG123"), ApiError)
  })

  it("nested non-capturing groups", () => {
    const grammar = `@@whitespace :: None
start: (?: '(' (?: inner ) ')' )
inner: 'content'`
    const result = parse(grammar, "(content)")
    assert.equal(asjson(result), null)
  })

  it("no default comments", () => {
    const grammar = `@@eol_comments :: /@@@@@@/
start = 'a' $;`
    assert.throws(
      () => parse(
        grammar,
        `
        # no comments are valid
        a
      `),
      /expected: "a"/
    )
  })

  it("parse void", () => {
    const grammar = `start = () $ ;`
    const result = parse(grammar, "")
    assert.equal(asjson(result), null)
  })

  it("partial choice", () => {
    const grammar = `@@whitespace :: None
start = o:[o] x:'A' $ ;
o = 'A' a:'A' | 'A' b:'B' ;`
    const result = parse(grammar, "A")
    const j = asjson(result) as Record<string, unknown>
    assert.equal(j.x, "A")
    assert.equal(j.o, null)
  })
})
