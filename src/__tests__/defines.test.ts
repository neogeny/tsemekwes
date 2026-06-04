import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parseInput } from "@api"
import { treeToJSON, type Tree } from "@trees"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

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
      json(parseInput(g, "1 .. 10")) as Record<string, unknown>,
      { from: "1", to: "10" },
    )
    assert.equal(json(parseInput(g, "10")), "10")
  })

  it("mixed return", () => {
    const g = compile(`
      @@grammar :: Test
      start := ('a' b='b') 'c' d='d'?
    `)
    assert.deepEqual(json(parseInput(g, "a b c")) as Record<string, unknown>, {
      b: "b",
      d: null,
    })
  })
})
