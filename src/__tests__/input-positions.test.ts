import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parseInput } from "@api"
import { asjson } from "@util/asjson"

describe("input positions", () => {
  it("basic position tracking", () => {
    const grammar = `
      start: 'hello'
    `
    const model = compile(grammar)
    const tree = parseInput(model, "hello")
    assert.equal(asjson(tree), "hello")
  })

  it("multiline input", () => {
    const grammar = `
      @@whitespace :: /\\s+/
      start: 'hello' 'world'
    `
    const tree = parseInput(compile(grammar), "hello\nworld")
    assert.deepStrictEqual(asjson(tree), ["hello", "world"])
  })
})
