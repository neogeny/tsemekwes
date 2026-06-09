import type { Cursor } from "@input"
import color from "picocolors"
import { sprintf } from "sprintf-js"
import type { CallStack } from "./ctx.js"

export class Memento extends Error {
  public readonly mark: number
  public readonly callStack: CallStack

  constructor(
    public readonly start: number,
    public readonly msg: string,
    private readonly cursor: Cursor,
    callStack: CallStack,
    public readonly colorize?: boolean,
    public readonly err?: Error,
  ) {
    super(msg)
    // super(msg, { cause: err })
    this.mark = cursor.mark()
    this.callStack = [...callStack]
    Object.setPrototypeOf(this, Memento.prototype)
  }

  override toString(): string {
    return this.render()
  }

  inputSource(): string {
    return this.cursor.inputSource()
  }

  error(): string {
    return this.render()
  }

  render(): string {
    const pc = color.createColors(!!this.colorize)

    const [line, col] = this.cursor.posAt(this.mark)
    const source = this.inputSource()
    const src = source !== "" ? source : "<unknown>"

    let result = ""
    result += `${pc.redBright(`\nerror:`)} ${this.msg}\n`
    result += `${pc.blueBright(`   --> `)}${pc.whiteBright(`${src} `)}[${line}:${col}]\n`

    result += pc.blueBright(`      |\n`)

    const startLine0 = Math.max(0, line - 5)
    const lines = this.cursor.linesAt(startLine0, line)
    for (let i = 0; i < lines.length; i++) {
      const ln = startLine0 + i + 1
      const disp = lines[i].replace(/\t/g, "  ").replace(/[\r\n]$/, "")
      result += `${pc.blueBright(sprintf("%5d", ln))} ${pc.blueBright(`|`)} ${pc.white(disp)}\n`
    }
    const pad = " ".repeat(Math.max(0, col-1))
    result += `${pc.blueBright(`      |`)} ${pad}${pc.redBright(`^ ${this.msg}\n`)}`

    if (this.callStack.length > 0) {
      result += "\n"
      for (let i = this.callStack.length - 1; i >= 0; i--) {
        result += pc.dim(` ↑ ${this.callStack[i]}\n`)
      }
    }

    return result
  }
}
