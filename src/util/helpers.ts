import { readFile } from "node:fs/promises"
import { type Cfg, defaultCfg } from "@config/config"

export async function readText(path: string): Promise<string> {
  if (path === "-") {
    const chunks: Buffer[] = []
    for await (const chunk of process.stdin) {
      chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk))
    }
    return Buffer.concat(chunks).toString("utf-8")
  }
  return await readFile(path, "utf-8")
}

export function ext(path: string): string {
  const i = path.lastIndexOf(".")
  return i !== -1 ? path.slice(i + 1).toLowerCase() : ""
}

export function newCfg(opts: {
  trace?: boolean
  start?: string
  color?: string
}): Cfg {
  const c = defaultCfg()
  if (opts.trace) {
    c.trace = true
  }
  if (opts.start) c.start = opts.start
  if (opts.color) {
    switch (opts.color) {
      case "auto":
        c.colorize = process.stderr.isTTY
        break
      case "always":
        c.colorize = true
        break
      case "never":
        c.colorize = false
    }
  }
  return c
}
