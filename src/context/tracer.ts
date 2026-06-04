import type { Ctx } from "@context"
import color from "picocolors"
import type { Colors } from "picocolors/types"

export enum Event {
  Entry = 0,
  Success = 1,
  Failure = 2,
  Recursion = 3,
  Cut = 4,
  Match = 5,
  NoMatch = 6,
}

// Tracer defines the interface for tracing parsing events.
export interface Tracer {
  // Trace logs a general message.
  trace(ctx: Ctx, msg: string): void
  // TraceEvent logs a specific parsing event with a message.
  traceEvent(ctx: Ctx, event: Event, msg: string): void
  // TraceEntry logs the entry into a parsing rule.
  traceEntry(ctx: Ctx): void
  // TraceSuccess logs a successful parsing rule.
  traceSuccess(ctx: Ctx): void
  // TraceFailure logs a failed parsing rule with an error message.
  traceFailure(ctx: Ctx, err: string): void
  // TraceRecursion logs a recursive call to a parsing rule.
  traceRecursion(ctx: Ctx): void
  // TraceCut logs a cut operation.
  traceCut(ctx: Ctx): void
  // TraceMatch logs a successful token match.
  traceMatch(ctx: Ctx, name: string, token: string): boolean
  // TraceNoMatch logs a failed token match.
  traceNoMatch(ctx: Ctx, name: string, token: string): boolean
}

// NullTracer is a no-op tracer used when tracing is disabled.
export class NullTracer implements Tracer {
  trace(_ctx: Ctx, _msg: string): void {}

  traceEvent(_ctx: Ctx, _event: Event, _msg: string): void {}

  traceEntry(_ctx: Ctx): void {}

  traceSuccess(_ctx: Ctx): void {}

  traceFailure(_ctx: Ctx, _err: string): void {}

  traceRecursion(_ctx: Ctx): void {}

  traceCut(_ctx: Ctx): void {}

  traceMatch(_ctx: Ctx, _name: string, _token: string): boolean {
    return true
  }

  traceNoMatch(_ctx: Ctx, _name: string, _token: string = ""): boolean {
    return false
  }
}

function eventSymbol(pc: Colors, event: Event): string {
  switch (event) {
    case Event.Entry:
      return pc.yellow("↙")
    case Event.Success:
      return pc.green("≡")
    case Event.Failure:
      return pc.red("≢")
    case Event.Recursion:
      return pc.blue("⟲")
    case Event.Cut:
      return pc.yellow("⚔")
    case Event.Match:
      return pc.green("≡")
    case Event.NoMatch:
      return pc.red("≢")
    default:
      return "?"
  }
}

function stackSymbol(pc: Colors, event: Event): string {
  switch (event) {
    case Event.Success:
      return pc.green("→")
    case Event.Failure:
      return pc.red("→")
    case Event.NoMatch:
      return pc.red("←")
    case Event.Match:
      return pc.green("←")
    default:
      return pc.yellow("←")
  }
}

// ConsoleTracer implements Tracer to output tracing information to the console.
export class ConsoleTracer implements Tracer {
  trace(_ctx: Ctx, msg: string): void {
    console.error(msg)
  }

  traceEvent(ctx: Ctx, event: Event, msg: string): void {
    const pc = color.createColors(ctx.cfg().colorize)

    const esym = eventSymbol(pc, event)
    const ssym = stackSymbol(pc, event)

    const lookahead = pc.bold(
      pc.black(ctx.cursor().lookahead(ctx.mark()).replace(/ /g, "·")),
    )

    // FIXME
    // const cols = process.stderr.columns || 120
    // const cols = 220
    let cs = ""
    const callStack = ctx.callStack()
    for (let i = callStack.length - 1; i >= 0; i--) {
      cs += pc.bold(pc.white(callStack[i])) + ssym
      // if (cs.length >= cols - 2) {
      //   cs += "••"
      //   break
      // }
    }

    const mark = ctx.cursor().mark()
    const [line, col] = ctx.cursor().pos()
    const pos = pc.bold(pc.black(`[${line}:${col}]@${mark} →`))

    const lineMsg = `${esym}${msg} ${cs}•\n${pos}${lookahead}`

    this.trace(ctx, lineMsg)
  }

  traceEntry(ctx: Ctx): void {
    this.traceEvent(ctx, Event.Entry, "")
  }

  traceSuccess(ctx: Ctx): void {
    this.traceEvent(ctx, Event.Success, "")
  }

  traceFailure(ctx: Ctx, err: string): void {
    const errStr = ` ${color.red(err)}`
    this.traceEvent(ctx, Event.Failure, errStr)
  }

  traceRecursion(ctx: Ctx): void {
    this.traceEvent(ctx, Event.Recursion, "")
  }

  traceCut(ctx: Ctx): void {
    this.traceEvent(ctx, Event.Cut, "")
  }

  traceMatch(ctx: Ctx, name: string, token: string): boolean {
    let tag = ""
    if (name !== "") {
      tag = `/${name}/`
    }
    const msg = color.green(`'${token}'${tag}`)
    this.traceEvent(ctx, Event.Match, msg)
    return true
  }

  traceNoMatch(ctx: Ctx, name: string, token: string = ""): boolean {
    const msg =
      token !== "" ? color.red(` '${token}'`) : color.red(` /${name}/`)
    this.traceEvent(ctx, Event.NoMatch, msg)
    return false
  }
}
