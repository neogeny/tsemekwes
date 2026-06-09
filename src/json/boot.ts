import { GrammarSemantics } from "../config/config.js"
import type { TreeValue } from "../trees/tree.js"
import tatsu from "../../grammar/tatsu.json" with { type: "json" }
import type { Grammar } from "../peg/grammar.js"
import { loadGrammarFromJSON } from "./import.js"

let cached: Grammar | null = null

export function bootGrammar(): Grammar {
  if (cached) return cached
  const g = loadGrammarFromJSON(tatsu)
  g.initialize()
  g.semantics = new BootGrammarSemantics()
  cached = g
  return g
}

class BootGrammarSemantics implements GrammarSemantics {
  apply(node: TreeValue, ruleName: string, _params: string[]): [TreeValue, boolean] {
    if (ruleName === "true") return [true, true]
    if (ruleName === "false") return [false, true]
    if (ruleName === "null") return [null, true]
    return [node, false]
  }
}
