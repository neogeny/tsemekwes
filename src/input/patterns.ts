import type { Cfg } from "../config/config.js";
import { TokenizingPatterns } from "./cursor.js";

const INLINE_FLAGS_RE = /^\(\?([msgi-]+)\)/;

function stripInlineFlags(pattern: string): [string, string] {
  let flags = "";
  let rest = pattern;
  for (;;) {
    const m = rest.match(INLINE_FLAGS_RE);
    if (!m) break;
    for (const ch of m[1]) {
      if (ch === "m") flags += "m";
      else if (ch === "s") flags += "s";
      else if (ch === "i") flags += "i";
    }
    rest = rest.slice(m[0].length);
  }
  return [rest, flags];
}

function compileRe(pattern: string, extraFlags?: string): RegExp | null {
  try {
    const [stripped, inline] = stripInlineFlags(pattern);
    const flags = inline + (extraFlags ?? "");
    return new RegExp(stripped, flags);
  } catch {
    return null;
  }
}

export function newPatterns(
  wsp: string,
  cmt: string,
  eol: string,
): TokenizingPatterns {
  return new TokenizingPatterns(
    compileRe(wsp, "m"),
    compileRe(cmt, "m"),
    compileRe(eol, "m"),
  );
}

export function defaultPatterns(): TokenizingPatterns {
  const pat = newPatterns(`\\s+`, `#.*`, `#.*$`);
  pat.nonDefault = false;
  return pat;
}

export function configurePatterns(
  patterns: TokenizingPatterns,
  cfg: Cfg,
): void {
  patterns.nonDefault = false;

  if (cfg.whitespace !== undefined) {
    patterns.nonDefault = true;
    if (cfg.whitespace !== null && cfg.whitespace !== "") {
      const re = compileRe(cfg.whitespace);
      if (re !== null) {
        patterns.wsp = re;
      }
    } else {
      patterns.wsp = null;
    }
  }

  patterns.cmt = null;
  if (cfg.comments) {
    patterns.nonDefault = true;
    const re = compileRe(cfg.comments);
    if (re !== null) {
      patterns.cmt = re;
    }
  }

  patterns.eol = null;
  if (cfg.eolComments) {
    patterns.nonDefault = true;
    const re = compileRe(cfg.eolComments);
    if (re !== null) {
      patterns.eol = re;
    }
  }
}

const _default = defaultPatterns();
export function resetPatterns(patterns: TokenizingPatterns): void {
  patterns.wsp = _default.wsp;
  patterns.cmt = _default.cmt;
  patterns.eol = _default.eol;
  patterns.nonDefault = false;
}
