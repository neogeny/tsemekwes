import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, loadGrammarFromJSON, parseInput } from "@api"
import { asjson, asjsons } from "@util/asjson"

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
    const j1 = JSON.stringify(asjson(tree1))
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
