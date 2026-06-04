import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parse } from "@api"
import { treeToJSON } from "@trees"

describe("model repr", () => {
  it("pair from tree", () => {
    const grammar = `@@grammar :: Calc
@@whitespace :: /\\s+/
pair::Pair = '(' key:/[a-z]+/ ':' val:/[0-9]+/ ')'`
    const tree = parse(grammar, "(abc:123)")
    const j = treeToJSON(tree) as Record<string, unknown>
    assert.equal(j.__class__, "Pair")
    assert.equal(j.key, "abc")
    assert.equal(j.val, "123")
  })
})
