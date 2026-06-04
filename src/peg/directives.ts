import XRegExp from "xregexp"
import grammar from "../../grammar/tatsu.json"

export const WHITESPACE_PATTERN = grammar.directives.whitespace
export const COMMENT_PATTERN = grammar.directives.comments
export const EOL_COMMENT_PATTERN = grammar.directives.eol_comments

export const WHITESPACE_REGEX = XRegExp(WHITESPACE_PATTERN)
export const COMMENT_REGEX = XRegExp(COMMENT_PATTERN)
export const EOL_COMMENT_REGEX = XRegExp(EOL_COMMENT_PATTERN)

/**
 * Remove all whitespace, block comments, and end‑of‑line comments from the
 * supplied source string according to the TatSu grammar directives.
 */
export function directivesStrip(source: string): string {
  // Remove block comments (/* … */ or (* … *)). The regex is global and
  // multi‑line, so a simple replace works.
  let result = source.replace(COMMENT_REGEX, "")

  // Remove end‑of‑line comments ("# …" or "// …").
  result = result.replace(EOL_COMMENT_REGEX, "")

  // Finally collapse any remaining whitespace (spaces, tabs, newlines).
  // The original directive uses the "(?m)" flag to treat the string as multiline.
  result = result.replace(WHITESPACE_REGEX, "")

  return result
}
