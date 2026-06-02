import type { Grammar } from "@peg"
import { expToJSON, type Exp, serializeGrammar } from "@peg"
import type { Rule } from "@peg"

export function asjson(grammar: Grammar): Record<string, unknown> {
  return serializeGrammar(grammar)
}

export function asjsonStr(grammar: Grammar): string {
  return JSON.stringify(asjson(grammar), null, 2)
}

export { serializeGrammar, expToJSON }
export type { Exp, Grammar, Rule }
