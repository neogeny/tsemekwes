import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse } from "@api"
import { asjson } from "@util/asjson"

describe("lookahead and skip-to", () => {
  it("skip to", () => {
    const grammar = `start = 'x' ab $ ;
ab = 'a' 'b' | -> 'b' ;`
    const result = parse(grammar, "x yb")
    assert.deepStrictEqual(asjson(result), ["x", "b"])
  })
})
