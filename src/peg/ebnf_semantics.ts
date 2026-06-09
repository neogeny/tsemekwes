import type { GrammarSemantics } from "../config/config.js"
import { NodeTree, type TreeValue } from "../trees/tree.js"

export class EBNFGrammarSemantics implements GrammarSemantics {
  apply(node: TreeValue, ruleName: string, _params: string[]): [TreeValue, boolean] {
    if (ruleName === "true") return [true, true]
    if (ruleName === "false") return [false, true]
    if (ruleName === "null") return [null, true]

    if (
      node instanceof NodeTree &&
      node.typeName === "Meta" &&
      typeof node.tree === "string"
    ) {
      switch (node.tree) {
        case "name":
          return [new NodeTree("NameMeta", null), true]
        case "int":
          return [new NodeTree("IntMeta", null), true]
        case "uint":
          return [new NodeTree("UIntMeta", null), true]
        case "float":
          return [new NodeTree("FloatMeta", null), true]
        case "bool":
          return [new NodeTree("BoolMeta", null), true]
      }
    }
    return [node, false]
  }
}
