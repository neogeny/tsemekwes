import type { Tree } from "../trees/tree.js";

export interface Configurable {
  configure(cfg: Cfg): void;
}

export type SemanticsFunc = (
  node: Tree,
  ruleName: string,
  params: string[],
) => [Tree, boolean];

export class Cfg {
  name = "";
  source = "";
  start = "";
  concurrency = false;
  noMemo = false;
  noPruneMemosOnCut = false;
  perLineMemos = 0;
  trace = false;
  colorize = false;
  grammar = "";
  noLeftRecursion = false;
  ignoreCase = false;
  nameChars = "";
  nameGuard: boolean | null = null;
  whitespace: string | null = null;
  comments = "";
  eolComments = "";
  keywords: string[] = [];
  parseInfo = false;
  semantics: SemanticsFunc | null = null;

  new_(): Cfg {
    const c = new Cfg();
    c.name = this.name || "ogopego";
    c.source = this.source;
    c.start = this.start || "start";
    c.concurrency = this.concurrency;
    c.noMemo = this.noMemo;
    c.noPruneMemosOnCut = this.noPruneMemosOnCut;
    c.perLineMemos = this.perLineMemos;
    c.trace = this.trace;
    c.colorize = this.colorize;
    c.grammar = this.grammar;
    c.noLeftRecursion = this.noLeftRecursion;
    c.ignoreCase = this.ignoreCase;
    c.nameChars = this.nameChars;
    c.nameGuard = this.nameGuard;
    c.whitespace = this.whitespace;
    c.comments = this.comments;
    c.eolComments = this.eolComments;
    c.keywords = [...this.keywords];
    c.parseInfo = this.parseInfo;
    c.semantics = this.semantics;
    return c;
  }

  override(other: Partial<Cfg>): Cfg {
    const c = this.new_();
    if (other.name !== undefined) c.name = other.name;
    if (other.source !== undefined) c.source = other.source;
    if (other.start !== undefined) c.start = other.start;
    if (other.concurrency !== undefined) c.concurrency = other.concurrency;
    if (other.noMemo !== undefined) c.noMemo = other.noMemo;
    if (other.noPruneMemosOnCut !== undefined) c.noPruneMemosOnCut = other.noPruneMemosOnCut;
    if (other.perLineMemos !== undefined) c.perLineMemos = other.perLineMemos;
    if (other.trace !== undefined) c.trace = other.trace;
    if (other.colorize !== undefined) c.colorize = other.colorize;
    if (other.grammar !== undefined) c.grammar = other.grammar;
    if (other.noLeftRecursion !== undefined) c.noLeftRecursion = other.noLeftRecursion;
    if (other.ignoreCase !== undefined) c.ignoreCase = other.ignoreCase;
    if (other.nameChars !== undefined) c.nameChars = other.nameChars;
    if (other.nameGuard !== undefined) c.nameGuard = other.nameGuard;
    if (other.whitespace !== undefined) c.whitespace = other.whitespace;
    if (other.comments !== undefined) c.comments = other.comments;
    if (other.eolComments !== undefined) c.eolComments = other.eolComments;
    if (other.keywords !== undefined) c.keywords = [...other.keywords];
    if (other.parseInfo !== undefined) c.parseInfo = other.parseInfo;
    if (other.semantics !== undefined) c.semantics = other.semantics;
    return c;
  }
}

export function defaultCfg(): Cfg {
  return new Cfg();
}
