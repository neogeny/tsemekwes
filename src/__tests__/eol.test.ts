import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { ApiError, parse } from "@api"
import { asjson } from "@util/asjson"

describe("EOL", () => {
  it("basic eol", () => {
    const grammar = `start = 'hello' $-> 'world'`
    const result = parse(grammar, "hello\nworld")
    assert.deepStrictEqual(asjson(result), ["hello", "world"])
  })

  it("basic eol with trailing spaces", () => {
    const grammar = `start = 'hello' $-> 'world'`
    const result = parse(grammar, "hello  \nworld")
    assert.deepStrictEqual(asjson(result), ["hello", "world"])
  })

  it("eol fails without linebreak", () => {
    const grammar = `start = 'hello' $-> 'world'`
    assert.throws(() => parse(grammar, "hello world"), ApiError)
  })

  it("eol fails with non-whitespace before", () => {
    const grammar = `start = 'hello' $-> 'world'`
    assert.throws(() => parse(grammar, "helloX\nworld"), ApiError)
  })

  it("eol at end of text", () => {
    const grammar = `start = 'hello' $-> $`
    const result = parse(grammar, "hello\n")
    assert.equal(asjson(result), "hello")
  })

  it("eol at end with trailing spaces", () => {
    const grammar = `start = 'hello' $-> $`
    const result = parse(grammar, "hello  \n")
    assert.equal(asjson(result), "hello")
  })

  it("eol at end fails without linebreak", () => {
    const grammar = `start = 'hello' $-> $`
    assert.throws(() => parse(grammar, "hello world"), ApiError)
  })

  it("multiple eols", () => {
    const grammar = `start = 'line1' $-> 'line2' $-> 'line3'`
    const result = parse(grammar, "line1\nline2\nline3")
    assert.deepStrictEqual(asjson(result), ["line1", "line2", "line3"])
  })

  it("multiple eols with spaces", () => {
    const grammar = `start = 'line1' $-> 'line2' $-> 'line3'`
    const result = parse(grammar, "line1  \nline2\n  line3")
    assert.deepStrictEqual(asjson(result), ["line1", "line2", "line3"])
  })

  it("eol with indentation", () => {
    const grammar = `start = 'start' $-> 'indented' $-> 'end'`
    const result = parse(grammar, "start\n  indented\nend")
    assert.deepStrictEqual(asjson(result), ["start", "indented", "end"])
  })

  it("eol in closure", () => {
    const grammar = `start = ('item' $->)* 'end'`
    const result = parse(grammar, "item\nitem\nend")
    assert.deepStrictEqual(asjson(result), [["item", "item"], "end"])
  })

  it("eol in closure with trailing spaces", () => {
    const grammar = `start = ('item' $->)* 'end'`
    const result = parse(grammar, "item  \nitem\nend")
    assert.deepStrictEqual(asjson(result), [["item", "item"], "end"])
  })

  it("eol in closure empty", () => {
    const grammar = `start = ('item' $->)* 'end'`
    const result = parse(grammar, "end")
    assert.deepStrictEqual(asjson(result), [[], "end"])
  })

  it("eol with mixed whitespace", () => {
    const grammar = `start = 'start' $-> 'next'`
    const result = parse(grammar, "start \t \nnext")
    assert.deepStrictEqual(asjson(result), ["start", "next"])
  })

  it("eol no whitespace before linebreak", () => {
    const grammar = `start = 'start' $-> 'next'`
    const result = parse(grammar, "start\nnext")
    assert.deepStrictEqual(asjson(result), ["start", "next"])
  })

  it("eol fails followed by non-whitespace", () => {
    const grammar = `start = 'start' $-> 'next'`
    assert.throws(() => parse(grammar, "startX\nnext"), ApiError)
  })

  it("eol fails without linebreak", () => {
    const grammar = `start = 'start' $-> 'next'`
    assert.throws(() => parse(grammar, "start next"), ApiError)
  })

  it("eol in tatsu ebnf endrule", () => {
    const grammar = `start = 'a' (';' | $->) 'b'`
    const result = parse(grammar, "a\nb")
    assert.deepStrictEqual(asjson(result), ["a", "b"])
  })

  it("eol in tatsu ebnf endrule semicolon", () => {
    const grammar = `start = 'a' (';' | $->) 'b'`
    const result = parse(grammar, "a;b")
    assert.deepStrictEqual(asjson(result), ["a", ";", "b"])
  })
})
