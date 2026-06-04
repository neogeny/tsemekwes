import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parseInput } from "@api"
import { asjson } from "@util/asjson"

describe("defines", () => {
  it("name in option", () => {
    const g = compile(`
      @@grammar :: Test
      start = expr_range $
      expr_range =
        | [from: expr] '..' [to: expr]
        | expr
      expr = /[\\d]+/
    `)
    assert.deepEqual(
      asjson(parseInput(g, "1 .. 10")) as Record<string, unknown>,
      { from: "1", to: "10" },
    )
    assert.equal(asjson(parseInput(g, "10")), "10")
  })

  it("mixed return", () => {
    const g = compile(`
      @@grammar :: Test
      start := ('a' b='b') 'c' d='d'?
    `)
    assert.deepEqual(
      asjson(parseInput(g, "a b c")) as Record<string, unknown>,
      {
        b: "b",
        d: null,
      },
    )
  })
})
