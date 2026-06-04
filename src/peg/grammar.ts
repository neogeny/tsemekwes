import { Cfg, defaultCfg, type SemanticsFunc } from "@config"
import { type Ctx, ParseError } from "@context"
import type { TreeValue } from "@trees"
import { call } from "./parsing/call"
import { Exp, ExpKind } from "./exp"
import { markLeftRecursion } from "./analysis/leftrec"
import { prettyPrintGrammar } from "./pretty"
import type { Rule } from "./rule"
import { linkGrammar } from "./analysis/link"
import { CallExp } from "./call"
import { serializeGrammar } from "./json"

export class Grammar extends Exp {
  readonly kind = ExpKind.Grammar
  constructor(
    public name: string,
    public rules: Rule[] = [],
    public directives: string[][] = [],
    public keywords: string[] = [],
    public analyzed: boolean = false,
    public semantics?: SemanticsFunc,
  ) {
    super()
  }

  public ruleMap(): Map<string, Rule> {
    const m = new Map<string, Rule>()
    for (const rule of this.rules) {
      m.set(rule.name, rule)
    }
    return m
  }

  getRule(name: string): Rule | undefined {
    return this.ruleMap().get(name)
  }

  normalize(): void {
    for (const r of this.rules) {
      r.normalize()
    }
  }

  private hasNoLeftRecursion(): boolean {
    for (const dir of this.directives) {
      if (dir.length < 2) continue
      if (dir[0] === "left_recursion") {
        const s = dir[1]
        if (s !== "True" && s !== "true" && s !== "1") return true
      }
    }
    return false
  }

  initialize(): void {
    this.normalize()
    linkGrammar(this)
    this.validateLinked()
    if (!this.hasNoLeftRecursion()) {
      markLeftRecursion(this.rules)
    }
    this.computeLA()
    this.analyzed = true
  }

  private computeLA(): void {
    for (const rule of this.rules) {
      rule.computeLA()
    }
  }

  private validateLinked(): void {
    for (const rule of this.rules) {
      this.validateExpLinked(rule.exp)
    }
  }

  private validateExpLinked(exp: Exp): void {
    if (exp instanceof CallExp && exp.rule == null) {
      throw new Error(`unresolved call to rule: ${exp.name}`)
    }
    for (const child of exp.children()) {
      this.validateExpLinked(child)
    }
  }

  pretty(): string {
    return prettyPrintGrammar(this)
  }

  override __json__(seen?: Set<object>): any {
    return serializeGrammar(this, seen)
  }

  cfgFromDirectives(): Cfg {
    const c = new Cfg()
    for (const d of this.directives) {
      const name = d[0]
      const s = d[1]
      switch (name) {
        case "name":
          c.name = s
          break
        case "source":
          c.source = s
          break
        case "start":
          c.start = s
          break
        case "grammar":
          c.grammar = s
          break
        case "whitespace":
          c.whitespace = s === "" || s === "None" || s === "False" ? null : s
          break
        case "comments":
          c.comments = s
          break
        case "eol_comments":
          c.eolComments = s
          break
        case "ignorecase":
          if (s === "True" || s === "true" || s === "1") c.ignoreCase = true
          break
        case "namechars":
          c.nameChars = s
          break
        case "nameguard":
          c.nameGuard = !["False", "false", "0", "None", "null"].includes(s)
          break
        case "parseinfo":
          if (s === "True" || s === "true" || s === "1") c.parseInfo = true
          break
        case "trace":
          if (s === "True" || s === "true" || s === "1") c.trace = true
          break
        case "left_recursion":
          if (s !== "True" && s !== "true" && s !== "1")
            c.noLeftRecursion = true
          break
        case "nomemo":
          if (s === "True" || s === "true" || s === "1") c.noMemo = true
          break
        case "noprunememosoncut":
          if (s === "True" || s === "true" || s === "1")
            c.noPruneMemosOnCut = true
          break
      }
    }
    if (this.semantics) {
      c.semantics = this.semantics
    }
    return c
  }

  parse(ctx: Ctx, extraCfg?: Partial<Cfg>): TreeValue {
    let acfg = defaultCfg()
    acfg = acfg.override(this.cfgFromDirectives())
    acfg = acfg.override(extraCfg ?? {})
    acfg.keywords = this.keywords
    ctx.configure(acfg)

    const start = acfg.start || "start"
    const rule = this.getRule(start) || this.rules[0]
    if (!rule) {
      throw ctx.failure(ctx.mark(), new ParseError("no rules in grammar"))
    }
    return call(ctx, start, rule)
  }
}
