import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parseInput } from "@api"
import { asjson } from "@util/asjson"

function treeSummary(v: unknown): unknown {
  if (v === null || v === undefined) return null
  if (typeof v === "string") return v
  if (typeof v === "number") return v
  if (typeof v === "boolean") return v
  if (Array.isArray(v)) return v.map(treeSummary)
  if (typeof v === "object") {
    const out: Record<string, unknown> = {}
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      out[k] = treeSummary(val)
    }
    return out
  }
  return v
}

describe("explore tree", () => {
  it("calc tree", () => {
    const g = compile(`
      @@grammar :: Calc
      @@left_recursion :: True
      @@whitespace :: /\\s+/

      start := expression $

      expression
        := expression '+' term
        | expression '-' term
        | term

      term
        := term '*' factor
        | term '/' factor
        | factor

      factor
        := NUMBER
        | '(' expression ')'

      NUMBER := /\\d+/
    `)

    const inputs = ["42", "1 + 2", "1 + 2 * 3", "(1 + 2) * 3"]
    for (const input of inputs) {
      const result = parseInput(g, input)
      const j = treeSummary(asjson(result))
      assert.ok(j !== null, `parse of "${input}" should return a result`)
    }
  })
})
