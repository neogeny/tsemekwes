import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, loadGrammarFromJSON, parseInput } from "../src/api/index.js"
import { treeToJSON, type Tree } from "../src/trees/tree.js"
import { asjsons } from "../src/util/asjson.js"

function json(t: Tree): unknown {
  return treeToJSON(t)
}

describe("round trips", () => {
  it("grammar to JSON round trip", () => {
    const grammarText = `
      @@grammar :: Test
      @@whitespace :: /\\s+/
      start: foo bar;
      foo: 'x';
      bar: 'y';
    `
    const grammar = compile(grammarText)
    const tree1 = parseInput(grammar, "x y")
    const j1 = JSON.stringify(json(tree1))
    assert.ok(j1.includes("x"))
    assert.ok(j1.includes("y"))
  })

  it("asjson round trip", () => {
    const grammarText = `
      @@grammar :: Test
      start: 'a' | 'b'
    `
    const out1 = asjsons(compile(grammarText))
    const grammar2 = loadGrammarFromJSON(out1)
    const out2 = asjsons(grammar2)
    assert.equal(out1, out2)
  })
})
