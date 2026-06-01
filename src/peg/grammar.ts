import { Cfg, defaultCfg } from "../config/config.js";
import type { Ctx } from "../context/ctx.js";
import type { Tree } from "../trees/tree.js";
import { CallExp, type Exp } from "./exp.js";
import { modelToJSONStr as _modelToJSONStr } from "./export.js";
import { markLeftRecursion } from "./leftrec.js";
import { linkGrammar } from "./link.js";
import { prettyPrintGrammar } from "./pretty.js";
import type { Rule } from "./rule.js";

export class Grammar {
  constructor(
    public name: string,
    public rules: Rule[] = [],
    public directives: string[][] = [],
    public keywords: string[] = [],
    public analyzed: boolean = false,
    public semantics?: (
      node: Tree,
      ruleName: string,
      params: string[],
    ) => [Tree, boolean],
  ) {}

  ruleMap(): Map<string, Rule> {
    const m = new Map<string, Rule>();
    for (const rule of this.rules) {
      m.set(rule.name, rule);
    }
    return m;
  }

  getRule(name: string): Rule | undefined {
    return this.ruleMap().get(name);
  }

  normalize(): void {
    for (const r of this.rules) {
      r.normalize();
    }
  }

  initialize(): void {
    this.normalize();
    const rules = this.ruleMap();
    linkGrammar(this, rules);
    this.validateLinked();
    markLeftRecursion(this.rules);
    this.analyzed = true;
  }

  private validateLinked(): void {
    for (const rule of this.rules) {
      this.validateExpLinked(rule.exp);
    }
  }

  private validateExpLinked(exp: Exp): void {
    if (exp instanceof CallExp && exp.rule == null) {
      throw new Error(`unresolved call to rule: ${exp.name}`);
    }
    for (const child of exp.children()) {
      this.validateExpLinked(child);
    }
  }

  prettyPrint(): string {
    return prettyPrintGrammar(this);
  }

  modelToJSONStr(): string {
    return _modelToJSONStr(this);
  }

  cfgFromDirectives(): Cfg {
    const c = new Cfg();
    for (const d of this.directives) {
      const name = d[0];
      const s = d[1];
      switch (name) {
        case "name":
          c.name = s;
          break;
        case "source":
          c.source = s;
          break;
        case "start":
          c.start = s;
          break;
        case "grammar":
          c.grammar = s;
          break;
        case "whitespace":
          c.whitespace = s === "" || s === "None" || s === "False" ? null : s;
          break;
        case "comments":
          c.comments = s;
          break;
        case "eol_comments":
          c.eolComments = s;
          break;
        case "ignorecase":
          if (s === "True" || s === "true" || s === "1") c.ignoreCase = true;
          break;
        case "namechars":
          c.nameChars = s;
          break;
        case "nameguard":
          c.nameGuard = !["False", "false", "0", "None", "null"].includes(s);
          break;
        case "parseinfo":
          if (s === "True" || s === "true" || s === "1") c.parseInfo = true;
          break;
        case "trace":
          if (s === "True" || s === "true" || s === "1") c.trace = true;
          break;
        case "left_recursion":
          if (s !== "True" && s !== "true" && s !== "1")
            c.noLeftRecursion = true;
          break;
        case "nomemo":
          if (s === "True" || s === "true" || s === "1") c.noMemo = true;
          break;
        case "noprunememosoncut":
          if (s === "True" || s === "true" || s === "1")
            c.noPruneMemosOnCut = true;
          break;
      }
    }
    if (this.semantics) {
      c.semantics = this.semantics;
    }
    return c;
  }

  parseAt(ctx: Ctx, extraCfg?: Partial<Cfg>): Tree | null {
    let acfg = defaultCfg();
    acfg = acfg.override(this.cfgFromDirectives());
    acfg = acfg.override(extraCfg ?? {});
    acfg.keywords = this.keywords;
    ctx.configure(acfg);

    const start = acfg.start || "start";
    const rule = this.getRule(start) || this.rules[0];
    if (!rule) {
      ctx.failure(ctx.mark(), "no rules in grammar");
      return null;
    }
    return rule.parse(ctx);
  }
}
