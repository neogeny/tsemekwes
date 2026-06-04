import { TreeArray } from "@trees"
import { inspect } from "node:util"
import { NodeTree, type TreeValue } from "../../trees/tree"
import {
  AlertExp,
  ChoiceExp,
  ClosureExp,
  ConstantExp,
  CutExp,
  DotExp,
  EmptyClosureExp,
  EofExp,
  EolExp,
  type Exp,
  FailExp,
  GatherExp,
  GroupExp,
  JoinExp,
  LookaheadExp,
  NamedExp,
  NamedListExp,
  NegativeLookaheadExp,
  NilExp,
  OptionalExp,
  OverrideExp,
  OverrideListExp,
  PatternExp,
  PositiveClosureExp,
  PositiveGatherExp,
  PositiveJoinExp,
  RuleIncludeExp,
  SeqExp,
  SkipGroupExp,
  SkipToExp,
  TokenExp,
  VoidExp,
} from "../exp"
import { Grammar } from "../grammar"
import { Rule } from "../rule"
import { CallExp } from "../call"

class CompileError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = "CompileError"
  }
}

function nodeTree(node: TreeValue): [string, TreeValue] {
  if (node === null) return ["null", null]
  if (node instanceof NodeTree) {
    return [node.typeName, node.tree]
  }
  if (typeof node === "object" && "typeName" in node && "tree" in node) {
    const n = node as NodeTree
    return [n.typeName, n.tree]
  }
  const n = node as NodeTree
  throw new CompileError(
    `expected NodeTree, got ${typeof n} ${inspect(n)}\n${inspect(n)}`,
  )
}

function nodeCheck(tree: TreeValue, typename: string): TreeValue {
  const [name, inner] = nodeTree(tree)
  if (name !== typename) {
    throw new CompileError(`expected ${typename} node, got ${name}`)
  }
  return inner
}

function isMapNode(tree: TreeValue): boolean {
  return tree instanceof Map
}

function mapGet(tree: TreeValue, key: string): TreeValue {
  if (!isMapNode(tree)) return null
  return (tree as Map<string, TreeValue>).get(key) ?? null
}

function mapGetDefault(tree: TreeValue, key: string, def: string): string {
  if (!isMapNode(tree)) return def
  if (tree === null) return def
  const val = (tree as Map<string, TreeValue>).get(key)
  if (val == null) return def
  return textValue(val)
}

function textValue(tree: TreeValue): string {
  if (tree == null) return ""
  return String(tree)
}

function listValue(tree: TreeValue): TreeArray {
  if (Array.isArray(tree)) return [...tree]
  return []
}

function strListValue(tree: TreeValue): string[] {
  const items = listValue(tree)
  if (items.length === 0) return []
  const out: string[] = []
  for (const item of items) {
    const s = textValue(item)
    if (s !== "") out.push(s)
  }
  return out
}

function strPairsListValue(tree: TreeValue): Map<string, string> {
  const out = new Map<string, string>()
  for (const item of listValue(tree)) {
    const pair = strListValue(item)
    if (pair.length === 2) {
      out.set(pair[0], pair[1])
    }
  }
  return out
}

/** Compile a parse tree into a Grammar object. */
export function compileGrammar(tree: TreeValue): Grammar {
  const inner = nodeCheck(tree, "Grammar")
  if (!isMapNode(inner)) {
    throw new CompileError(`expected MapNode`)
  }

  let name = ""
  const nameTree = mapGet(inner, "name")
  if (nameTree != null) {
    name = textValue(nameTree)
  }

  const rules: Rule[] = []
  const rulesTree = mapGet(inner, "rules")
  if (rulesTree != null) {
    for (const rt of listValue(rulesTree)) {
      rules.push(compileRule(rt))
    }
  }

  const directives: string[][] = []
  const dirsTree = mapGet(inner, "directives")
  if (dirsTree != null) {
    for (const d of listValue(dirsTree)) {
      if (!isMapNode(d)) continue
      const n = textValue(mapGet(d, "name") ?? "")
      const v = textValue(mapGet(d, "value") ?? "")
      if (n !== "") {
        directives.push([n, v])
        if (n === "grammar" && name === "") {
          name = v
        }
      }
    }
  }

  if (name === "") {
    name = "__COMPILED__"
  }

  const keywords: string[] = []
  const kwTree = mapGet(inner, "keywords")
  if (kwTree != null) {
    for (const innerList of listValue(kwTree)) {
      for (const kw of listValue(innerList)) {
        const s = textValue(kw)
        if (s !== "") keywords.push(s)
        if (kw instanceof NodeTree && kw.typeName === "Word") {
          const ws = textValue(kw.tree)
          if (ws !== "") keywords.push(ws)
        }
      }
    }
  }

  const g = new Grammar(name, rules, directives, keywords)
  g.initialize()
  return g
}

function compileRule(tree: TreeValue): Rule {
  const inner = nodeCheck(tree, "Rule")
  if (!isMapNode(inner)) {
    throw new CompileError(`expected MapNode for Rule`)
  }

  const name = mapGetDefault(inner, "name", "")
  if (name === "") {
    throw new CompileError("rule has no name")
  }

  const decorators = strListValue(mapGet(inner, "decorators") ?? [])
  const params = strListValue(mapGet(inner, "params") ?? [])
  const kwparams = strPairsListValue(mapGet(inner, "kwparams") ?? [])

  const isName = decorators.includes("name") || decorators.includes("isname")
  const noMemo = decorators.includes("nomemo")
  const noStak = decorators.includes("nostak")

  const trimmed = name.replace(/^_+/, "")
  const firstChar = trimmed.length > 0 ? trimmed[0] : ""
  const isTokn =
    (firstChar !== "" &&
      firstChar === firstChar.toUpperCase() &&
      firstChar !== firstChar.toLowerCase()) ||
    decorators.includes("token") ||
    decorators.includes("tokn")

  const expTree = mapGet(inner, "exp")
  if (expTree == null) {
    throw new CompileError("rule has no exp")
  }

  const exp = compileExp(expTree)

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
  )
}

function compileExp(node: TreeValue): Exp {
  const [typename, tree] = nodeTree(node)

  switch (typename) {
    case "bool":
      return compileExp(tree)

    case "Alert": {
      const msgTree = mapGet(tree, "message")
      if (msgTree == null) throw new CompileError("Alert missing message")
      const msg = compileExp(msgTree)
      if (msg instanceof ConstantExp) {
        return new AlertExp(msg.value as string, 0)
      }
      return new AlertExp(String(msg), 0)
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
      return new NilExp()

    case "Call":
      return new CallExp(textValue(tree))

    case "Choice": {
      const exps = listValue(tree).map(compileExp)
      return new ChoiceExp(exps)
    }

    case "Option":
      return compileExp(tree)

    case "Closure":
      return new ClosureExp(compileExp(tree))

    case "Constant":
      return new ConstantExp(textValue(tree))

    case "Cut":
      return new CutExp()

    case "Dot":
      return new DotExp()

    case "EOF":
    case "Eof":
      return new EofExp()

    case "EOL":
    case "Eol":
      return new EolExp()

    case "EmptyClosure":
      return new EmptyClosureExp()

    case "Fail":
      return new FailExp()

    case "Gather": {
      const expTreeG = mapGet(tree, "exp")
      const sepTreeG = mapGet(tree, "sep")
      if (expTreeG == null || sepTreeG == null)
        throw new CompileError("Gather missing exp or sep")
      return new GatherExp(compileExp(expTreeG), compileExp(sepTreeG))
    }

    case "Group":
      return new GroupExp(compileExp(tree))

    case "Join": {
      const expTreeJ = mapGet(tree, "exp")
      const sepTreeJ = mapGet(tree, "sep")
      if (expTreeJ == null || sepTreeJ == null)
        throw new CompileError("Join missing exp or sep")
      return new JoinExp(compileExp(expTreeJ), compileExp(sepTreeJ))
    }

    case "Lookahead":
      return new LookaheadExp(compileExp(tree))

    case "Named": {
      const nameN = mapGetDefault(tree, "name", "")
      const expTreeN = mapGet(tree, "exp")
      if (expTreeN == null) throw new CompileError("Named missing exp")
      return new NamedExp(nameN, compileExp(expTreeN))
    }

    case "NamedList": {
      const nameNL = mapGetDefault(tree, "name", "")
      const expTreeNL = mapGet(tree, "exp")
      if (expTreeNL == null) throw new CompileError("NamedList missing exp")
      return new NamedListExp(nameNL, compileExp(expTreeNL))
    }

    case "NegativeLookahead":
      return new NegativeLookaheadExp(compileExp(tree))

    case "Optional":
      return new OptionalExp(compileExp(tree))

    case "Override":
      return new OverrideExp(compileExp(tree))

    case "OverrideList":
      return new OverrideListExp(compileExp(tree))

    case "Pattern":
      return new PatternExp(textValue(tree))

    case "Patterns": {
      let items: TreeValue[]
      const t = mapGet(tree, "tree")
      if (t != null) {
        items = listValue(t)
      } else {
        items = listValue(tree)
      }
      if (items.length === 0) {
        items = [tree]
      }
      const exps = items.map(compileExp)
      const [first] = exps
      if (exps.length === 1 && first !== undefined) return first
      return new ChoiceExp(exps)
    }

    case "PositiveClosure":
      return new PositiveClosureExp(compileExp(tree))

    case "PositiveGather": {
      const expTreePG = mapGet(tree, "exp")
      const sepTreePG = mapGet(tree, "sep")
      if (expTreePG == null || sepTreePG == null)
        throw new CompileError("PositiveGather missing exp or sep")
      return new PositiveGatherExp(compileExp(expTreePG), compileExp(sepTreePG))
    }

    case "PositiveJoin":
    case "RightJoin":
    case "LeftJoin": {
      const expTreePJ = mapGet(tree, "exp")
      const sepTreePJ = mapGet(tree, "sep")
      if (expTreePJ == null || sepTreePJ == null)
        throw new CompileError(`${typename} missing exp or sep`)
      return new PositiveJoinExp(compileExp(expTreePJ), compileExp(sepTreePJ))
    }

    case "RuleInclude":
      return new RuleIncludeExp(textValue(tree))

    case "Sequence": {
      let items = listValue(tree)
      const exps = items.map(compileExp)
      return new SeqExp(exps)
    }

    case "SkipGroup":
      return new SkipGroupExp(compileExp(tree))

    case "SkipTo":
      return new SkipToExp(compileExp(tree))

    case "Token":
      return new TokenExp(textValue(tree))

    case "Void":
      return new VoidExp()

    default:
      throw new CompileError(`unknown expression type "${typename}"`)
  }
}
