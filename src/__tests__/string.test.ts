import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parseInput } from "@api"
import { treeToJSON, type Tree } from "@trees"

function json(tree: Tree): unknown {
  return treeToJSON(tree)
}

describe("string", () => {
  it("multiline", () => {
    const g = compile(`
      @@grammar :: Test
      start := longone | shortone $
      shortone := "short"
      longone := """
        this "text"
        is a long "string"
        """
    `)
    assert.equal(json(parseInput(g, "short")), "short")
  })
})
