import { Cfg } from "../config/config.js";
import type { Tree } from "../trees/tree.js";
import type { Ctx } from "../context/ctx.js";
import { Rule } from "./rule.js";

export class Grammar {
  constructor(
    public name: string,
    public rules: Rule[] = [],
    public directives: string[][] = [],
    public keywords: string[] = [],
    public analyzed: boolean = false,
    public semantics?: (node: Tree, ruleName: string, params: string[]) => [Tree, boolean],
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

  cfgFromDirectives(): Partial<Cfg> {
    const c: Partial<Cfg> = {};
    for (const d of this.directives) {
      const name = d[0];
      const s = d[1];
      switch (name) {
        case "name":          c.name = s; break;
        case "source":        c.source = s; break;
        case "start":         c.start = s; break;
        case "grammar":       c.grammar = s; break;
        case "whitespace":
          c.whitespace = (s === "" || s === "None" || s === "False") ? "" : s;
          break;
        case "comments":      c.comments = s; break;
        case "eol_comments":  c.eolComments = s; break;
        case "ignorecase":
          c.ignoreCase = s === "True" || s === "true" || s === "1";
          break;
        case "namechars":     c.nameChars = s; break;
        case "nameguard":
          c.nameGuard = !["False", "false", "0", "None", "null"].includes(s);
          break;
        case "parseinfo":
          c.parseInfo = s === "True" || s === "true" || s === "1";
          break;
        case "trace":
          c.trace = s === "True" || s === "true" || s === "1";
          break;
        case "left_recursion":
          c.noLeftRecursion = s !== "True" && s !== "true" && s !== "1";
          break;
        case "nomemo":
          c.noMemo = s === "True" || s === "true" || s === "1";
          break;
        case "noprunememosoncut":
          c.noPruneMemosOnCut = s === "True" || s === "true" || s === "1";
          break;
      }
    }
    if (this.semantics) {
      c.semantics = (...args) => this.semantics!(...args);
    }
    return c;
  }

  parseAt(ctx: Ctx, extraCfg?: Partial<Cfg>): Tree | null {
    const cfg = new Cfg();
    Object.assign(cfg, this.cfgFromDirectives(), extraCfg);
    cfg.keywords = this.keywords;
    ctx.configure(cfg);

    const start = cfg.start || "start";
    const rule = this.getRule(start) || this.rules[0];
    if (!rule) {
      ctx.failure(ctx.mark(), "no rules in grammar");
      return null;
    }
    return this.ruleCall(ctx, rule);
  }

  private ruleCall(ctx: Ctx, rule: Rule): Tree | null {
    const mark = ctx.mark();
    const result = rule.exp.parseAt(ctx);
    if (result == null) {
      ctx.reset(mark);
      return null;
    }
    return result;
  }
}
