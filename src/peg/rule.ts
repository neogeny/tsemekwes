import type { Ctx } from "@context"
import { treeFold, NodeTree, type TreeValue } from "@trees"
import {computeLA} from "./analysis/lookahead";
import { BoxExp, type Exp, ExpKind } from "./exp.js"
import { asjson } from "../util/asjson"
import { serializeRule } from "./json"

export class Rule extends BoxExp {
  readonly kind = ExpKind.Rule
  constructor(
    public name: string,
    public exp: Exp,
    public params: string[] = [],
    public kwParams: Map<string, string> = new Map(),
    public decorators: string[] = [],
    public base: string = "",
    public isName: boolean = false,
    public isTokn: boolean = false,
    public noMemo: boolean = false,
    public noStak: boolean = false,
    public isMemo: boolean = false,
    public isLrec: boolean = false,
  ) {
    super(exp)
  }

  computeLA() {
    computeLA(this.exp)
  }

  parse(ctx: Ctx): TreeValue {
    const tree = this.exp.parse(ctx)
    const folded = treeFold(tree)

    const [newTree, overridden] = ctx.applySemantics(
      folded,
      this.name,
      this.params,
    )
    if (overridden) {
      return newTree
    }

    if (this.params.length === 0 || this.params[0] === "bool") {
      return folded
    }

    return new NodeTree(this.params[0], folded)
  }

  override __json__(seen?: Set<object>): any {
    return asjson(serializeRule(this), seen)
  }

  isToken(): boolean {
    if (this.isTokn) return true
    const first = this.name.replace(/^_+/, "")[0]
    return (
      first !== "" &&
      first === first.toUpperCase() &&
      first !== first.toLowerCase()
    )
  }

  isLeftRecursive(): boolean {
    return this.isLrec
  }

  isMemoizable(): boolean {
    return this.isLrec || (this.isMemo && !this.noMemo)
  }

  shouldTrace(): boolean {
    return !this.noStak
  }

  normalize(): void {
    // No-op in TS: defaults handled by constructor params
  }
}
