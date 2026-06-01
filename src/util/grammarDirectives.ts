import grammar from "../../grammar/tatsu.json"
import XRegExp from "xregexp"

export const WHITESPACE_PATTERN = grammar.directives.whitespace
export const COMMENT_PATTERN = grammar.directives.comments
export const EOL_COMMENT_PATTERN = grammar.directives.eol_comments

export const WHITESPACE_REGEX = XRegExp(WHITESPACE_PATTERN)
export const COMMENT_REGEX = XRegExp(COMMENT_PATTERN)
export const EOL_COMMENT_REGEX = XRegExp(EOL_COMMENT_PATTERN)
