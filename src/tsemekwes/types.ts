export interface RuleJSON {
  symbol: string
  expression: string
}

export interface GrammarJSON {
  name: string
  rules: RuleJSON[]
  directives: Record<string, string>
}

export interface ParseNode {
  symbol: string
  text: string
  children: ParseNode[]
  start: number
  end: number
}
