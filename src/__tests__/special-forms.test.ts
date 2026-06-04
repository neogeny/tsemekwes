import { asjson } from "@util/asjson"
import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse } from "@api"

describe("special forms", () => {
  it("group", () => {
    const grammar = `start: ('a' 'b')*`
    const result = parse(grammar, "abab")
    assert.deepStrictEqual(asjson(result), [
      ["a", "b"],
      ["a", "b"],
    ])
  })

  it("skip group", () => {
    const grammar = `start: (?: 'a' 'b')*`
    const result = parse(grammar, "abab")
    assert.deepStrictEqual(asjson(result), [null, null])
  })

  it("void", () => {
    const grammar = `@@whitespace :: /\\s+/
start: 'a' () 'b'`
    const result = parse(grammar, "a b")
    assert.deepStrictEqual(asjson(result), ["a", "b"])
  })

  it("eof", () => {
    const grammar = `start: 'a' $`
    const result = parse(grammar, "a")
    assert.equal(asjson(result), "a")
  })

  it("dot", () => {
    const grammar = `start: /./ 'b'`
    const result = parse(grammar, "ab")
    assert.deepStrictEqual(asjson(result), ["a", "b"])
  })
})
