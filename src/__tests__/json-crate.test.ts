import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { loadGrammarFromJSON } from "@api"
import { readFileSync } from "node:fs"

const tatsuJSON = readFileSync(
  new URL("../tiexiu/grammar/tatsu.json", import.meta.url),
  "utf-8",
)

describe("json crate", () => {
  it("parse grammar JSON from string", () => {
    const parsed = JSON.parse(tatsuJSON)
    assert.equal(parsed.name, "TatSu")
    assert.ok(Array.isArray(parsed.rules))
    assert.ok(
      typeof parsed.directives === "object" &&
        !Array.isArray(parsed.directives),
    )
  })

  it("mutate and serialize", () => {
    const parsed = JSON.parse(tatsuJSON) as Record<string, unknown>
    parsed.analyzed = true
    parsed.keywords = []
    const output = JSON.stringify(parsed)
    assert.ok(output.includes('"analyzed":true'))
    assert.ok(output.includes('"keywords":[]'))
  })

  it("serialize then parse again", () => {
    const parsed = JSON.parse(tatsuJSON) as Record<string, unknown>
    parsed.analyzed = true
    parsed.keywords = []
    const modified = JSON.stringify(parsed)
    const reparsed = JSON.parse(modified)
    assert.equal(reparsed.name, "TatSu")
    assert.equal(reparsed.analyzed, true)
  })

  it("load grammar from JSON via API", () => {
    const grammar = loadGrammarFromJSON(tatsuJSON)
    assert.equal(grammar.name, "TatSu")
    assert.ok(grammar.rules.length > 0)
  })
})
