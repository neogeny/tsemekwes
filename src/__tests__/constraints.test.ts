import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { inspect } from "node:util"
import { parse } from "@api"
import { asjson } from "@util/asjson"

describe("constraints", () => {
  it("positive lookahead", () => {
    const grammar = `start: &'a' 'a'`
    const result = parse(grammar, "a")
    assert.equal(asjson(result), "a", `result:${inspect(result)}`)
  })

  it("negative lookahead", () => {
    const grammar = `start: !'b' 'a'`
    const result = parse(grammar, "a")
    assert.equal(asjson(result), "a")
  })

  it("cut with whitespace", () => {
    const grammar = `@@whitespace :: /\\s+/
start: 'a'~'b'`
    const result = parse(grammar, "a b")
    assert.deepStrictEqual(asjson(result), ["a", "b"])
  })
})
