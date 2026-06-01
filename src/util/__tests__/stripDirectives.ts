// noinspection JSUnusedGlobalSymbols

import {
  WHITESPACE_REGEX,
  COMMENT_REGEX,
  EOL_COMMENT_REGEX,
} from "../grammarDirectives"

/**
 * Remove all whitespace, block comments, and end‑of‑line comments from the
 * supplied source string according to the TatSu grammar directives.
 */
export function stripDirectives(source: string): string {
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
