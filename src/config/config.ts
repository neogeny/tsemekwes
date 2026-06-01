import type { Tree } from "@trees/tree"

export interface Configurable {
  configure(cfg: Cfg): void
}

export type SemanticsFunc = (
  node: Tree,
  ruleName: string,
  params: string[],
) => [Tree, boolean]

export class Cfg {
  name?: string
  source?: string
  start?: string
  concurrency?: boolean
  noMemo?: boolean
  noPruneMemosOnCut?: boolean
  perLineMemos?: number
  trace?: boolean
  colorize?: boolean
  grammar?: string
  noLeftRecursion?: boolean
  ignoreCase?: boolean
  nameChars?: string
  nameGuard?: boolean | null
  whitespace?: string | null
  comments?: string
  eolComments?: string
  keywords?: string[]
  parseInfo?: boolean
  semantics?: SemanticsFunc | null

  override(other: Partial<Cfg>): Cfg {
    const c = new Cfg()
    c.name = other.name !== undefined ? other.name : this.name
    c.source = other.source !== undefined ? other.source : this.source
    c.start = other.start !== undefined ? other.start : this.start
    c.concurrency =
      other.concurrency !== undefined ? other.concurrency : this.concurrency
    c.noMemo = other.noMemo !== undefined ? other.noMemo : this.noMemo
    c.noPruneMemosOnCut =
      other.noPruneMemosOnCut !== undefined
        ? other.noPruneMemosOnCut
        : this.noPruneMemosOnCut
    c.perLineMemos =
      other.perLineMemos !== undefined ? other.perLineMemos : this.perLineMemos
    c.trace = other.trace !== undefined ? other.trace : this.trace
    c.colorize = other.colorize !== undefined ? other.colorize : this.colorize
    c.grammar = other.grammar !== undefined ? other.grammar : this.grammar
    c.noLeftRecursion =
      other.noLeftRecursion !== undefined
        ? other.noLeftRecursion
        : this.noLeftRecursion
    c.ignoreCase =
      other.ignoreCase !== undefined ? other.ignoreCase : this.ignoreCase
    c.nameChars =
      other.nameChars !== undefined ? other.nameChars : this.nameChars
    c.whitespace =
      other.whitespace !== undefined ? other.whitespace : this.whitespace
    c.comments = other.comments !== undefined ? other.comments : this.comments
    c.eolComments =
      other.eolComments !== undefined ? other.eolComments : this.eolComments
    c.keywords =
      other.keywords !== undefined
        ? other.keywords
        : this.keywords
          ? [...this.keywords]
          : []
    c.parseInfo =
      other.parseInfo !== undefined ? other.parseInfo : this.parseInfo
    c.semantics =
      other.semantics !== undefined ? other.semantics : this.semantics

    if (other.grammar) c.name = c.grammar
    if (c.ignoreCase && c.keywords.length > 0) {
      c.keywords = c.keywords.map((kw) => kw.toUpperCase())
    }
    if (c.noMemo) c.noLeftRecursion = true
    if (c.nameChars) c.nameGuard = true
    if (other.nameGuard !== undefined) c.nameGuard = other.nameGuard

    return c
  }
}

export function defaultCfg(): Cfg {
  const c = new Cfg()
  c.noMemo = false
  c.noPruneMemosOnCut = false
  c.perLineMemos = 8
  c.trace = false
  c.colorize = false
  c.noLeftRecursion = false
  c.ignoreCase = false
  c.nameGuard = null
  c.whitespace = null
  c.keywords = []
  c.parseInfo = false
  return c
}
