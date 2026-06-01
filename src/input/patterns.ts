import type { Cfg } from "@config/config.js"
import XRegExp from "xregexp"

function compileRe(pattern: string, extraFlags?: string): RegExp | null {
  try {
    return XRegExp(pattern, extraFlags ?? "")
  } catch {
    return null
  }
}

export class TokenizingPatterns {
  constructor(
    public wsp: RegExp | null,
    public cmt: RegExp | null,
    public eol: RegExp | null,
    public nonDefault: boolean = false,
  ) {}
}

export function newPatterns(
  wsp: string,
  cmt: string,
  eol: string,
): TokenizingPatterns {
  return new TokenizingPatterns(compileRe(wsp), compileRe(cmt), compileRe(eol))
}

export function defaultPatterns(): TokenizingPatterns {
  const pat = newPatterns(`\\s+`, `(?m)#.*$`, `[^\\s\\S]`)
  pat.nonDefault = false
  return pat
}

export function configurePatterns(
  patterns: TokenizingPatterns,
  cfg: Cfg,
): void {
  patterns.nonDefault = false

  if (cfg.whitespace !== undefined) {
    patterns.nonDefault = true
    if (cfg.whitespace !== null && cfg.whitespace !== "") {
      const re = compileRe(cfg.whitespace)
      if (re !== null) {
        patterns.wsp = re
      }
    } else {
      patterns.wsp = null
    }
  }

  patterns.cmt = null
  if (cfg.comments) {
    patterns.nonDefault = true
    const re = compileRe(cfg.comments)
    if (re !== null) {
      patterns.cmt = re
    }
  }

  patterns.eol = null
  if (cfg.eolComments) {
    patterns.nonDefault = true
    const re = compileRe(cfg.eolComments)
    if (re !== null) {
      patterns.eol = re
    }
  }
}

const _default = defaultPatterns()
export function resetPatterns(patterns: TokenizingPatterns): void {
  patterns.wsp = _default.wsp
  patterns.cmt = _default.cmt
  patterns.eol = _default.eol
  patterns.nonDefault = false
}
