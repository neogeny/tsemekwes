import { sprintf } from "sprintf-js"
import type { Cursor } from "@input/cursor"
import type { CallStack } from "./ctx.js"
import color from "picocolors"

export class Memento {
  public readonly mark: number
  public readonly callStack: CallStack

  constructor(
    public readonly start: number,
    public readonly msg: string,
    private readonly cursor: Cursor,
    callStack: CallStack,
    private readonly colorize: boolean,
  ) {
    this.mark = cursor.mark()
    this.callStack = [...callStack]
  }

  inputSource(): string {
    return this.cursor.inputSource()
  }

  error(): string {
    let pc = color.createColors(this.colorize)

    const [line, col] = this.cursor.posAt(this.mark)
    const source = this.inputSource()
    const src = source !== "" ? source : "<unknown>"

    let result = ""
    result += pc.redBright(`\nerror:`) + ` ${this.msg}\n`
    result += pc.blueBright(`   --> `) +
        pc.redBright(`${src} `) +
        `[${line}:${col}]\n`
    result += pc.blueBright(`      |\n`)

    const startLine0 = Math.max(0, line - 5)
    const lines = this.cursor.linesAt(startLine0, line)
    for (let i = 0; i < lines.length; i++) {
      const ln = startLine0 + i + 1
      const disp = lines[i].replace(/\t/g, "  ").replace(/[\r\n]$/, "")
      result += `${sprintf("%5d", ln)} ` + pc.blueBright(`|`) + ` ${disp}\n`
    }
    const pad = " ".repeat(Math.max(0, col - 1))
    result +=
        pc.blueBright(`      |`) +
        ` ${pad}` +
        pc.redBright(`^ ${this.msg}\n`)

    if (this.callStack.length > 0) {
      result += "\n"
      for (let i = this.callStack.length - 1; i >= 0; i--) {
        result += pc.dim(` ↑ ${this.callStack[i]}\n`)
      }
    }

    return result
  }
}
