import type { TreeValue } from "@trees"
import type { Ctx } from "@context"
import type { Rule } from "./rule"
import { Exp, ExpKind } from "./exp"
import { call } from "./parsing/call"

export class CallExp extends Exp {
  readonly kind = ExpKind.Call

  constructor(
    public name: string,
    public rule: Rule | null = null,
  ) {
    super()
  }

  override parse(ctx: Ctx): TreeValue {
    return call(ctx, this.name, this.rule)
  }
}
