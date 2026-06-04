import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { loadGrammarFromJSON, parseInput } from "@api"
import { readFileSync } from "node:fs"
import { asjson } from "@util/asjson"

const tatsuJSON = readFileSync(
  new URL("../tiexiu/grammar/tatsu.json", import.meta.url),
  "utf-8",
)
const calcJSON = readFileSync(
  new URL("../tiexiu/grammar/calc.json", import.meta.url),
  "utf-8",
)

const ruleIncludeWithExpJSON = readFileSync(
  new URL(
    "../tiexiu/tests/fixtures/rule_include_with_exp.json",
    import.meta.url,
  ),
  "utf-8",
)

describe("json import", () => {
  it("grammar from JSON string", () => {
    const grammar = loadGrammarFromJSON(tatsuJSON)
    assert.equal(grammar.name, "TatSu")
    assert.ok(grammar.rules.length > 0)
  })

  it("grammar from JSON value (already parsed)", () => {
    const value = JSON.parse(calcJSON)
    const grammar = loadGrammarFromJSON(JSON.stringify(value))
    assert.equal(grammar.name, "CALC")
  })

  it("grammar from JSON with rule include exp", () => {
    const result = loadGrammarFromJSON(ruleIncludeWithExpJSON)
    assert.equal(result.name, "TatSu")
    assert.ok(result.rules.length > 0)
  })

  it("load grammar and parse using it", () => {
    const grammar = loadGrammarFromJSON(calcJSON)
    const tree = parseInput(grammar, "1 + 2")
    assert.ok(asjson(tree) != null)
  })
})
