import {
  type AlertExp,
  type ChoiceExp,
  type ClosureExp,
  type ConstantExp,
  type Exp,
  ExpKind,
  type GatherExp,
  type GroupExp,
  type JoinExp,
  type LookaheadExp,
  type NamedExp,
  type NamedListExp,
  type NegativeLookaheadExp,
  type OptionalExp,
  type OverrideExp,
  type OverrideListExp,
  type PatternExp,
  type PositiveClosureExp,
  type PositiveGatherExp,
  type PositiveJoinExp,
  type RuleIncludeExp,
  type SeqExp,
  type SkipGroupExp,
  type SkipToExp,
  type TokenExp,
} from "./exp.js"
import type { Grammar } from "./grammar.js"
import type { Rule } from "./rule.js"
import type { CallExp } from "./call"

const pep8llen = 72

export class PrettyWriter {
  private buf = ""
  private indent = 0
  private readonly amount = 4

  writeLine(s: string): void {
    if (s === "") {
      this.buf += "\n"
      return
    }
    const pad = " ".repeat(this.indent * this.amount)
    for (const line of s.split("\n")) {
      this.buf += `${pad + line}\n`
    }
  }

  indent_(): void {
    this.indent++
  }
  dedent(): void {
    this.indent--
  }
  reset(): void {
    this.buf = ""
  }
  string(): string {
    return this.buf.replace(/\n$/, "")
  }
}

function chunkStrings(s: string[], size: number): string[][] {
  if (s.length === 0) return []
  const chunks: string[][] = []
  for (let i = 0; i < s.length; i += size) {
    chunks.push(s.slice(i, i + size))
  }
  return chunks
}

export function prettyPrintExp(exp: Exp): string {
  switch (exp.kind) {
    case ExpKind.Token: {
      const e = exp as TokenExp
      return `"${e.value}"`
    }

    case ExpKind.Pattern: {
      const e = exp as PatternExp
      if (e.value.includes("/")) {
        return `?"${e.value}"`
      }
      return `/${e.value}/`
    }

    case ExpKind.Constant: {
      const e = exp as ConstantExp
      const s = String(e.value)
      if ((s.match(/\n/g) || []).length <= 1) {
        return `\`${s}\``
      }
      return `\`\`\`${s}\`\`\``
    }

    case ExpKind.Alert: {
      const e = exp as AlertExp
      return `${"^".repeat(e.level)}\`${e.value}\``
    }

    case ExpKind.Call: {
      const e = exp as CallExp
      return e.name
    }

    case ExpKind.RuleInclude: {
      const e = exp as RuleIncludeExp
      return `>${e.name}`
    }

    case ExpKind.Cut:
      return "~"
    case ExpKind.Dot:
      return "."
    case ExpKind.Eof:
      return "$"
    case ExpKind.Eol:
      return "$->"
    case ExpKind.Fail:
      return "!()"
    case ExpKind.Nil:
      return ""
    case ExpKind.Void:
      return "()"
    case ExpKind.EmptyClosure:
      return "{}"

    case ExpKind.Alt: {
      const e = exp as OverrideExp
      return prettyPrintExp(e.exp)
    }

    case ExpKind.Group: {
      const e = exp as GroupExp
      const inner = prettyPrintExp(e.exp)
      if (inner.includes("\n")) {
        const w = new PrettyWriter()
        w.writeLine("(")
        w.indent_()
        w.writeLine(inner)
        w.dedent()
        w.writeLine(")")
        return w.string()
      }
      return `(${inner})`
    }

    case ExpKind.SkipGroup: {
      const e = exp as SkipGroupExp
      return `(?:${prettyPrintExp(e.exp)})`
    }

    case ExpKind.Lookahead: {
      const e = exp as LookaheadExp
      return `&${prettyPrintExp(e.exp)}`
    }

    case ExpKind.NegativeLookahead: {
      const e = exp as NegativeLookaheadExp
      return `!${prettyPrintExp(e.exp)}`
    }

    case ExpKind.SkipTo: {
      const e = exp as SkipToExp
      return `->${prettyPrintExp(e.exp)}`
    }

    case ExpKind.Optional: {
      const e = exp as OptionalExp
      return `[${prettyPrintExp(e.exp)}]`
    }

    case ExpKind.Closure: {
      const e = exp as ClosureExp
      return `{${prettyPrintExp(e.exp)}}*`
    }

    case ExpKind.PositiveClosure: {
      const e = exp as PositiveClosureExp
      return `{${prettyPrintExp(e.exp)}}+`
    }

    case ExpKind.Override: {
      const e = exp as OverrideExp
      return `=${prettyPrintExp(e.exp)}`
    }

    case ExpKind.OverrideList: {
      const e = exp as OverrideListExp
      return `+=${prettyPrintExp(e.exp)}`
    }

    case ExpKind.Named: {
      const e = exp as NamedExp
      return `${e.name}=${prettyPrintExp(e.exp)}`
    }

    case ExpKind.NamedList: {
      const e = exp as NamedListExp
      return `${e.name}+=${prettyPrintExp(e.exp)}`
    }

    case ExpKind.Join: {
      const e = exp as JoinExp
      return `${prettyPrintExp(e.sep)}%{${prettyPrintExp(e.exp)}}*`
    }

    case ExpKind.PositiveJoin: {
      const e = exp as PositiveJoinExp
      return `${prettyPrintExp(e.sep)}%{${prettyPrintExp(e.exp)}}+`
    }

    case ExpKind.Gather: {
      const e = exp as GatherExp
      return `${prettyPrintExp(e.sep)}.{${prettyPrintExp(e.exp)}}*`
    }

    case ExpKind.PositiveGather: {
      const e = exp as PositiveGatherExp
      return `${prettyPrintExp(e.sep)}.{${prettyPrintExp(e.exp)}}+`
    }

    case ExpKind.Sequence: {
      const e = exp as SeqExp
      const items: string[] = []
      for (const item of e.sequence) {
        if (item.kind === ExpKind.Eof) continue
        items.push(prettyPrintExp(item))
      }
      const singleLine = items.join(" ")
      const hasMulti = items.some((s) => s.includes("\n"))
      if (!hasMulti && singleLine.length <= pep8llen) {
        return singleLine
      }
      const w = new PrettyWriter()
      for (const item of items) {
        w.writeLine(item)
      }
      return w.string()
    }

    case ExpKind.Choice: {
      const e = exp as ChoiceExp
      const opts = e.options.map((item) => prettyPrintExp(item))
      const hasMulti = opts.some((s) => s.includes("\n"))
      const singleLine = opts.join(" | ")
      if (!hasMulti && singleLine.length <= pep8llen) {
        return singleLine
      }
      const w = new PrettyWriter()
      for (const opt of opts) {
        w.writeLine(`| ${opt}`)
      }
      return w.string()
    }

    default:
      throw new Error(`prettyPrintExp: unhandled ExpKind: ${exp.kind}`)
  }
}

export function prettyPrintRule(rule: Rule): string {
  const w = new PrettyWriter()
  if (rule.noStak) w.writeLine("@nostak")
  if (rule.noMemo) w.writeLine("@nomemo")
  if (rule.isName) w.writeLine("@name")
  const params = rule.params.length > 0 ? `[${rule.params.join(", ")}]` : ""
  const exp = prettyPrintExp(rule.exp)
  if (exp.includes("\n")) {
    w.writeLine(`${rule.name}${params}:`)
    w.indent_()
    w.writeLine(exp)
    w.dedent()
  } else {
    w.writeLine(`${rule.name}${params}: ${exp}`)
  }
  return w.string()
}

export function prettyPrintGrammar(g: Grammar): string {
  const w = new PrettyWriter()
  w.writeLine(`@@grammar :: ${g.name}`)

  const dirValue = (k: string): [string, boolean] => {
    for (const d of g.directives) {
      if (d[0] === k) return [d[1], true]
    }
    return ["", false]
  }

  const showDir = (k: string): void => {
    const [d, ok] = dirValue(k)
    if (ok) {
      switch (k) {
        case "whitespace":
          w.writeLine(`@@whitespace :: /${d}/`)
          break
        case "comments":
          w.writeLine(`@@comments :: /${d}/`)
          break
        case "eol_comments":
          w.writeLine(`@@eol_comments :: /${d}/`)
          break
        case "namechars":
          w.writeLine(`@@namechars :: "${d}"`)
          break
        case "ignorecase":
          if (d === "True") w.writeLine("@@ignorecase :: True")
          break
        case "nameguard":
          if (d === "True") w.writeLine("@@nameguard :: True")
          break
        case "left_recursion":
          if (d === "False") w.writeLine("@@left_recursion :: False")
          break
        case "parseinfo":
          if (d === "False") w.writeLine("@@parseinfo :: False")
          break
        case "memoization":
          if (d === "False") w.writeLine("@@memoization :: False")
          break
      }
    }
  }

  showDir("whitespace")
  showDir("comments")
  showDir("eol_comments")
  showDir("namechars")
  showDir("ignorecase")
  showDir("nameguard")
  showDir("left_recursion")
  showDir("parseinfo")
  showDir("memoization")

  const known = new Set([
    "grammar",
    "whitespace",
    "comments",
    "eol_comments",
    "namechars",
    "ignorecase",
    "nameguard",
    "left_recursion",
    "parseinfo",
    "memoization",
  ])
  for (const d of g.directives) {
    if (known.has(d[0])) continue
    w.writeLine(`@@${d[0]} :: ${d[1]}`)
  }

  if (g.keywords.length > 0) {
    w.writeLine("")
    for (const chunk of chunkStrings(g.keywords, 8)) {
      w.writeLine(`@@keyword :: ${chunk.join(" ")}`)
    }
  }

  for (const rule of g.rules) {
    w.writeLine("")
    w.writeLine(prettyPrintRule(rule))
  }

  return w.string()
}
