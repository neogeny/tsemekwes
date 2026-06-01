import { TokenizingPatterns } from "./cursor.js";
import type { Cfg } from "../config/config.js";

function compileRe(pattern: string, flags?: string): RegExp | null {
  try {
    return new RegExp(pattern, flags ?? "");
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

  if (cfg.whitespace !== null) {
    patterns.nonDefault = true;
    if (cfg.whitespace !== "") {
      const re = compileRe(cfg.whitespace);
      if (re !== null) {
        patterns.wsp = re;
      }
    } else {
      patterns.wsp = null;
    }
  }

  patterns.cmt = null;
  if (cfg.comments !== "") {
    patterns.nonDefault = true;
    const re = compileRe(cfg.comments);
    if (re !== null) {
      patterns.cmt = re;
    }
  }

  patterns.eol = null;
  if (cfg.eolComments !== "") {
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
