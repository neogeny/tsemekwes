import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parseInput } from "@api"
import { treeToJSON, type Tree } from "@trees"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("grammar structure", () => {
  it("has rules", () => {
    const g = compile(`
      @@grammar :: Test
      start := 'a' | 'b' | 'c'
    `)
    assert.ok(g.rules.length > 0, "expected at least 1 rule")
  })

  it("first rule is default", () => {
    const g = compile(`
      @@grammar :: Test
      start := 'a'
    `)
    assert.equal(json(parseInput(g, "a")), "a")
  })

  it("pretty print", () => {
    const g = compile(`
      @@grammar :: Test
      start := 'a'
    `)
    const s = g.pretty()
    assert.ok(
      s.includes("Test") || s.includes("start"),
      `expected pretty print to contain 'Test' or 'start', got ${JSON.stringify(s)}`,
    )
  })
})
