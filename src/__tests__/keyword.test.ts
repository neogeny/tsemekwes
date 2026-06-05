import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse } from "@api"
import { asjson } from "@util/asjson"

describe("keywords", () => {
  it("rule named whitespace", () => {
    const grammar = `start = whitespace ;
whitespace = {'x'}+ ;`
    const result = parse(grammar, "x")
    assert.deepStrictEqual(asjson(result), ["x"])
  })
})
