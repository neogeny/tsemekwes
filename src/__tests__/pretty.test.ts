import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parseInput } from "@api"
import { asjson } from "@util/asjson"

describe("pretty", () => {
  it("grammar pretty print contains rule name", () => {
    const g = compile(`
      @@grammar :: PrettyTest
      start := 'a'
    `)
    const pretty = g.pretty()
    assert.ok(
      pretty.includes("start"),
      "expected pretty print to contain rule name",
    )
  })

  it("slashed pattern", () => {
    const g = compile(`
      @@grammar :: Test
      start := ?"[a-z]+/[0-9]+" $
    `)
    assert.equal(asjson(parseInput(g, "abc/123")), "abc/123")
  })
})
