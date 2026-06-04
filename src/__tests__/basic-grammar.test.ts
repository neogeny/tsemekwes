import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parseInput } from "@api"
import { asjson } from "@util/asjson"

describe("basic grammar", () => {
  it("simple grammar", () => {
    const grammar = `@@grammar :: Test
start: 'hello'`
    const parser = compile(grammar)
    const result = parseInput(parser, "hello")
    assert.equal(asjson(result), "hello")
  })

  it("multiple rules", () => {
    const grammar = `@@grammar :: Test
start: choice

choice:
    | 'a'
    | 'b'
    | 'c'`
    const parser = compile(grammar)
    const result = parseInput(parser, "a")
    assert.equal(asjson(result), "a")
  })

  it("rule references", () => {
    const grammar = `@@grammar :: Test
start: 'hello' 'world'`
    const parser = compile(grammar)
    const result = parseInput(parser, "helloworld")
    assert.deepStrictEqual(asjson(result), ["hello", "world"])
  })

  it("empty input with optional", () => {
    const grammar = `@@grammar :: Test
start: 'test'?`
    const parser = compile(grammar)
    const result = parseInput(parser, "")
    assert.equal(asjson(result), null)
  })
})
