import { Cfg, defaultCfg, type SemanticsFunc } from "@config"
import { type Ctx, ParseError } from "@context"
import type { TreeValue } from "@trees"
import { markLeftRecursion } from "./analysis/leftrec"
import { linkGrammar } from "./analysis/link"
import { CallExp } from "./call"
import { LeftRecursionError } from "./error"
import { Exp, ExpKind } from "./exp"
import { serializeGrammar } from "./json"
import { call } from "./parsing/call"
import { prettyPrintGrammar } from "./pretty"
import type { Rule } from "./rule"

export class Grammar extends Exp {
  readonly kind = ExpKind.Grammar
  private _isLeftRecursive?: boolean
  private _optrules?: Rule[]
  private _rulemap?: Map<string, Rule>
  private _optrulemap?: Map<string, Rule>

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
    if (!this._rulemap) {
      const m = new Map<string, Rule>()
      for (const rule of this.rules) {
        m.set(rule.name, rule)
      }
      this._rulemap = m
    }
    return this._rulemap
  }

  private optRuleMap(): Map<string, Rule> {
    if (!this._optrulemap) {
      if (!this._optrules) {
        this.optimize()
      }
      const m = new Map<string, Rule>()
      for (const rule of this._optrules ?? []) {
        m.set(rule.name, rule)
      }
      this._optrulemap = m
    }
    return this._optrulemap
  }

  getRule(name: string): Rule | undefined {
    const r = this.optRuleMap().get(name)
    if (r) return r
    return this.ruleMap().get(name)
  }

  optimize(): void {
    if (this._optrules) return
    this._optrules = this.rules.map((r) => r.optimized())
  }

  optimized(): this {
    this.optimize()
    return this
  }

  normalize(): void {
    for (const r of this.rules) {
      r.normalize()
    }
  }

  private leftRecursionDisabled(): boolean {
    for (const dir of this.directives) {
      if (dir.length < 2) continue
      if (dir[0] === "left_recursion") {
        const s = dir[1]
        if (
          s === "False" ||
          s === "false" ||
          s === "0" ||
          s === "NO" ||
          s === "No" ||
          s === "oo" ||
          s === "None"
        )
          return true
      }
    }
    return false
  }

  initialize(): void {
    this.normalize()
    linkGrammar(this)
    this.validateLinked()
    this.markLeftRecursion()
    this.computeLA()
    this.optimize()
    this.analyzed = true
  }

  private markLeftRecursion(): void {
    markLeftRecursion(this.rules)
  }

  public isLeftRecursive(): boolean {
    if (this._isLeftRecursive === undefined) {
      for (const r of this.rules) {
        if (r.isLeftRecursive()) {
          this._isLeftRecursive = true
          return true
        }
      }
      this._isLeftRecursive = false
    }
    return this._isLeftRecursive
  }

  public leftRecursionEnabled(): boolean {
    return !this.leftRecursionDisabled()
  }

  public validateLeftRecursiveParse(): void {
    if (this.isLeftRecursive() && !this.leftRecursionEnabled())
      throw new LeftRecursionError(
        "Parse on left-recursive grammar with left recursion disabled",
      )
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

  parse(ctx: Ctx, cfg?: Partial<Cfg>): TreeValue {
    this.validateLeftRecursiveParse()

    let acfg = defaultCfg()
    acfg = acfg.merge(this.cfgFromDirectives())
    acfg = acfg.merge(cfg ?? {})
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
