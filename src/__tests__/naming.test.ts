import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { parse } from "@api"
import { asjson } from "@util/asjson"

describe("naming and override", () => {
  it("named capture", () => {
    const grammar = `start: name='hello'`
    const result = parse(grammar, "hello")
    assert.deepStrictEqual(asjson(result), { name: "hello" })
  })

  it("override singleton", () => {
    const grammar = `start: ='hello'`
    const result = parse(grammar, "hello")
    assert.equal(asjson(result), "hello")
  })
})
