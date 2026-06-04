import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { ApiError, parse } from "@api"
import { asjson } from "@util/asjson"

describe("join", () => {
  it("positive join", () => {
    const grammar = `@@whitespace :: /\\s+/
@@nameguard :: False
start = ','%{'x' 'y'}+ ;`
    const result = parse(grammar, "x y, x y")
    assert.deepStrictEqual(asjson(result), [["x", "y"], ",", ["x", "y"]])
  })

  it("positive join single match", () => {
    const grammar = `@@whitespace :: /\\s+/
@@nameguard :: False
start = ','%{'x' 'y'}+ ;`
    const result = parse(grammar, "x y x y")
    assert.deepStrictEqual(asjson(result), [["x", "y"]])
  })

  it("positive join fails without match", () => {
    const grammar = `@@whitespace :: /\\s+/
@@nameguard :: False
start = ','%{'x' 'y'}+ ;`
    assert.throws(() => parse(grammar, "y x"), ApiError)
  })
})
