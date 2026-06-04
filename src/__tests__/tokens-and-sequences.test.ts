import {asjson} from "@util/asjson";
import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse } from "@api"

describe("tokens and sequences", () => {
  it("token sequence with whitespace", () => {
    const grammar = `@@whitespace :: /\\s+/
start: 'hello' 'world'`
    const result = parse(grammar, "hello world")
    assert.deepStrictEqual(asjson(result), ["hello", "world"])
  })

  it("optional token present", () => {
    const grammar = `@@whitespace :: /\\s+/
start: 'a' 'b'?`
    const result = parse(grammar, "a b")
    assert.deepStrictEqual(asjson(result), ["a", "b"])
  })

  it("optional token absent", () => {
    const grammar = `@@whitespace :: /\\s+/
start: 'a' 'b'?`
    const result = parse(grammar, "a")
    assert.equal(asjson(result), "a")
  })

  it("closure tokens", () => {
    const grammar = `start: 'a'*`
    const result = parse(grammar, "aaa")
    assert.deepStrictEqual(asjson(result), ["a", "a", "a"])
  })

  it("positive closure", () => {
    const grammar = `start: 'a'+`
    const result = parse(grammar, "aaa")
    assert.deepStrictEqual(asjson(result), ["a", "a", "a"])
  })

  it("choice alternatives - a", () => {
    const grammar = `start: 'a' | 'b' | 'c'`
    const result = parse(grammar, "a")
    assert.equal(asjson(result), "a")
  })

  it("choice alternatives - b", () => {
    const grammar = `start: 'a' | 'b' | 'c'`
    const result = parse(grammar, "b")
    assert.equal(asjson(result), "b")
  })

  it("choice alternatives - c", () => {
    const grammar = `start: 'a' | 'b' | 'c'`
    const result = parse(grammar, "c")
    assert.equal(asjson(result), "c")
  })
})
