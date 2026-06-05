import { type Cfg, defaultCfg } from "@config/config"

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
