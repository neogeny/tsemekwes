import {
  Node as NodeTree,
  MapNode,
  Seq,
  Array as ArrayTree,
  Text,
  type Tree,
} from "../trees/tree.js";
import { Grammar } from "./grammar.js";
import { Rule } from "./rule.js";
import {
  type Exp,
  NilExp,
  CutExp,
  VoidExp,
  FailExp,
  DotExp,
  EofExp,
  EolExp,
  EmptyClosureExp,
  TokenExp,
  PatternExp,
  ConstantExp,
  AlertExp,
  CallExp,
  NamedExp,
  NamedListExp,
  OverrideExp,
  OverrideListExp,
  GroupExp,
  SkipGroupExp,
  LookaheadExp,
  NegativeLookaheadExp,
  SkipToExp,
  OptionalExp,
  ClosureExp,
  PositiveClosureExp,
  SeqExp,
  ChoiceExp,
  JoinExp,
  PositiveJoinExp,
  GatherExp,
  PositiveGatherExp,
  RuleIncludeExp,
} from "./exp.js";

class CompileError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "CompileError";
  }
}

function node(tree: Tree): [string, Tree] {
  if (tree instanceof NodeTree) {
    return [tree.typeName, tree.tree];
  }
  throw new CompileError(`expected Node tree, got ${tree.kind}`);
}

function nodeCheck(tree: Tree, typename: string): Tree {
  const [name, inner] = node(tree);
  if (name !== typename) {
    throw new CompileError(`expected ${typename} node, got ${name}`);
  }
  return inner;
}

function isMapNode(tree: Tree): tree is MapNode {
  return tree instanceof MapNode;
}

function mapGet(tree: Tree, key: string): Tree | null {
  if (!isMapNode(tree)) return null;
  return tree.entries.get(key) ?? null;
}

function mapGetDefault(tree: Tree, key: string, def: string): string {
  if (!isMapNode(tree)) return def;
  const val = tree.entries.get(key);
  if (val == null) return def;
  return textValue(val);
}

function textValue(tree: Tree): string {
  if (tree instanceof Text) return tree.value;
  return "";
}

function listValue(tree: Tree): Tree[] {
  if (tree instanceof Seq) return tree.items;
  if (tree instanceof ArrayTree) return tree.items;
  return [];
}

function strListValue(tree: Tree): string[] {
  const items = listValue(tree);
  if (items.length === 0) return [];
  const out: string[] = [];
  for (const item of items) {
    const s = textValue(item);
    if (s !== "") out.push(s);
  }
  return out;
}

function strPairsListValue(tree: Tree): Map<string, string> {
  const out = new Map<string, string>();
  for (const item of listValue(tree)) {
    const pair = strListValue(item);
    if (pair.length === 2) {
      out.set(pair[0], pair[1]);
    }
  }
  return out;
}

/** Compile a parse tree into a Grammar object. */
export function compileGrammar(tree: Tree): Grammar {
  const inner = nodeCheck(tree, "Grammar");
  if (!isMapNode(inner)) {
    throw new CompileError(`expected MapNode, got ${inner.kind}`);
  }

  let name = "";
  const nameTree = inner.entries.get("name");
  if (nameTree != null) {
    name = textValue(nameTree);
  }

  const rules: Rule[] = [];
  const rulesTree = inner.entries.get("rules");
  if (rulesTree != null) {
    for (const rt of listValue(rulesTree)) {
      rules.push(compileRule(rt));
    }
  }

  const directives: string[][] = [];
  const dirsTree = inner.entries.get("directives");
  if (dirsTree != null) {
    for (const d of listValue(dirsTree)) {
      if (!isMapNode(d)) continue;
      const n = textValue(d.entries.get("name")!);
      const v = textValue(d.entries.get("value")!);
      if (n !== "") {
        directives.push([n, v]);
        if (n === "grammar" && name === "") {
          name = v;
        }
      }
    }
  }

  if (name === "") {
    name = "__COMPILED__";
  }

  const keywords: string[] = [];
  const kwTree = inner.entries.get("keywords");
  if (kwTree != null) {
    for (const innerList of listValue(kwTree)) {
      for (const kw of listValue(innerList)) {
        const s = textValue(kw);
        if (s !== "") keywords.push(s);
        if (kw instanceof NodeTree && kw.typeName === "Word") {
          const ws = textValue(kw.tree);
          if (ws !== "") keywords.push(ws);
        }
      }
    }
  }

  const g = new Grammar(name, rules, directives, keywords);
  g.initialize();
  return g;
}

function compileRule(tree: Tree): Rule {
  const inner = nodeCheck(tree, "Rule");
  if (!isMapNode(inner)) {
    throw new CompileError(`expected MapNode for Rule, got ${inner.kind}`);
  }

  const name = textValue(inner.entries.get("name")!);
  if (name === "") {
    throw new CompileError("rule has no name");
  }

  let expTree = mapGet(inner, "exp");
  if (expTree == null) {
    throw new CompileError("rule has no exp");
  }

  const exp = compileExp(expTree);

  const decorators = strListValue(
    inner.entries.get("decorators") ?? new Seq([]),
  );
  const params = strListValue(inner.entries.get("params") ?? new Seq([]));
  const kwparams = strPairsListValue(
    inner.entries.get("kwparams") ?? new Seq([]),
  );

  const isName = decorators.includes("name") || decorators.includes("isname");
  const noMemo = decorators.includes("nomemo");
  const noStak = decorators.includes("nostak");

  const trimmed = name.replace(/^_+/, "");
  const firstChar = trimmed.length > 0 ? trimmed[0] : "";
  const isTokn =
    (firstChar !== "" &&
      firstChar === firstChar.toUpperCase() &&
      firstChar !== firstChar.toLowerCase()) ||
    decorators.includes("token") ||
    decorators.includes("tokn");

  return new Rule(
    name,
    exp,
    params,
    kwparams,
    decorators,
    "",
    isName,
    isTokn,
    noMemo,
    noStak,
  );
}

function compileExp(tree: Tree): Exp {
  const [typename, inner] = node(tree);

  switch (typename) {
    case "bool":
      return compileExp(inner);

    case "Alert": {
      const msgTree = mapGet(inner, "message");
      if (msgTree == null) throw new CompileError("Alert missing message");
      const msg = compileExp(msgTree);
      if (msg instanceof ConstantExp) {
        return new AlertExp(msg.value as string, 0);
      }
      return new AlertExp(String(msg), 0);
    }

    case "BasedRule":
    case "Box":
    case "Grammar":
    case "GrammarSemantics":
    case "Model":
    case "ModelContext":
    case "NULL":
    case "NamedBox":
    case "Rule":
    case "Synth":
      return new NilExp();

    case "Call":
      return new CallExp(textValue(inner));

    case "Choice": {
      const exps = listValue(inner).map(compileExp);
      return new ChoiceExp(exps);
    }

    case "Option":
      return compileExp(inner);

    case "Closure":
      return new ClosureExp(compileExp(inner));

    case "Constant":
      return new ConstantExp(textValue(inner));

    case "Cut":
      return new CutExp();

    case "Dot":
      return new DotExp();

    case "EOF":
    case "Eof":
      return new EofExp();

    case "EOL":
    case "Eol":
      return new EolExp();

    case "EmptyClosure":
      return new EmptyClosureExp();

    case "Fail":
      return new FailExp();

    case "Gather": {
      const expTreeG = mapGet(inner, "exp");
      const sepTreeG = mapGet(inner, "sep");
      if (expTreeG == null || sepTreeG == null)
        throw new CompileError("Gather missing exp or sep");
      return new GatherExp(compileExp(expTreeG), compileExp(sepTreeG));
    }

    case "Group":
      return new GroupExp(compileExp(inner));

    case "Join": {
      const expTreeJ = mapGet(inner, "exp");
      const sepTreeJ = mapGet(inner, "sep");
      if (expTreeJ == null || sepTreeJ == null)
        throw new CompileError("Join missing exp or sep");
      return new JoinExp(compileExp(expTreeJ), compileExp(sepTreeJ));
    }

    case "Lookahead":
      return new LookaheadExp(compileExp(inner));

    case "Named": {
      const nameN = mapGetDefault(inner, "name", "");
      const expTreeN = mapGet(inner, "exp");
      if (expTreeN == null) throw new CompileError("Named missing exp");
      return new NamedExp(nameN, compileExp(expTreeN));
    }

    case "NamedList": {
      const nameNL = mapGetDefault(inner, "name", "");
      const expTreeNL = mapGet(inner, "exp");
      if (expTreeNL == null) throw new CompileError("NamedList missing exp");
      return new NamedListExp(nameNL, compileExp(expTreeNL));
    }

    case "NegativeLookahead":
      return new NegativeLookaheadExp(compileExp(inner));

    case "Optional":
      return new OptionalExp(compileExp(inner));

    case "Override":
      return new OverrideExp(compileExp(inner));

    case "OverrideList":
      return new OverrideListExp(compileExp(inner));

    case "Pattern":
      return new PatternExp(textValue(inner));

    case "Patterns": {
      let items: Tree[];
      const t = mapGet(inner, "tree");
      if (t != null) {
        items = listValue(t);
      } else {
        items = listValue(inner);
      }
      if (
        items.length === 0 &&
        !(inner instanceof Seq || inner instanceof ArrayTree)
      ) {
        items = [inner];
      }
      const exps = items.map(compileExp);
      if (exps.length === 1) return exps[0]!;
      return new ChoiceExp(exps);
    }

    case "PositiveClosure":
      return new PositiveClosureExp(compileExp(inner));

    case "PositiveGather": {
      const expTreePG = mapGet(inner, "exp");
      const sepTreePG = mapGet(inner, "sep");
      if (expTreePG == null || sepTreePG == null)
        throw new CompileError("PositiveGather missing exp or sep");
      return new PositiveGatherExp(
        compileExp(expTreePG),
        compileExp(sepTreePG),
      );
    }

    case "PositiveJoin":
    case "RightJoin":
    case "LeftJoin": {
      const expTreePJ = mapGet(inner, "exp");
      const sepTreePJ = mapGet(inner, "sep");
      if (expTreePJ == null || sepTreePJ == null)
        throw new CompileError(`${typename} missing exp or sep`);
      return new PositiveJoinExp(compileExp(expTreePJ), compileExp(sepTreePJ));
    }

    case "RuleInclude":
      return new RuleIncludeExp(textValue(inner));

    case "Sequence": {
      let items: Tree[];
      const t = mapGet(inner, "tree");
      if (t != null) {
        items = listValue(t);
      } else {
        items = listValue(inner);
      }
      if (
        items.length === 0 &&
        !(inner instanceof Seq || inner instanceof ArrayTree)
      ) {
        items = [inner];
      }
      const exps = items.map(compileExp);
      if (exps.length === 1) return exps[0]!;
      return new SeqExp(exps);
    }

    case "SkipGroup":
      return new SkipGroupExp(compileExp(inner));

    case "SkipTo":
      return new SkipToExp(compileExp(inner));

    case "Token":
      return new TokenExp(textValue(inner));

    case "Void":
      return new VoidExp();

    default:
      throw new CompileError(`unknown expression type "${typename}"`);
  }
}
