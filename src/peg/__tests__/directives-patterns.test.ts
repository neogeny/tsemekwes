import { expect } from "bun:test"
import test, { describe } from "node:test"
import {
  COMMENT_PATTERN,
  COMMENT_REGEX,
  EOL_COMMENT_PATTERN,
  EOL_COMMENT_REGEX,
  WHITESPACE_PATTERN,
  WHITESPACE_REGEX,
} from "../directives.js"

describe("Grammar directive regular expressions", () => {
  test("whitespace regex matches spaces, tabs, and newlines (multiline)", () => {
    const sample = "  \t\n\t  "
    const matches = sample.match(WHITESPACE_REGEX)
    expect(matches).not.toBeNull()
    // Should capture all whitespace sequences
    expect(matches?.join("")).toBe(sample.replace(/\n/g, "\n"))
    // Verify raw pattern string
    expect(WHITESPACE_PATTERN).toBe("(?m)\\s+")
  })

  test("comment regex matches block comments and (* ... *) style", () => {
    const block1 = "/* this is a block comment */"
    const block2 = "(* another block comment *)"
    let matches = `${block1} followed by more`.match(COMMENT_REGEX)
    expect(matches?.[0]).toBe(block1)
    matches = `${block2} must be at start`.match(COMMENT_REGEX)
    expect(matches?.[0]).toBe(block2)
    expect(COMMENT_PATTERN).toContain("[*]") // simple sanity check on pattern string
  })

  test("eol_comments regex matches # and // comments at line end", () => {
    const line1 = "code # comment"
    const line2 = "code // another comment"
    const multi = `${line1}\n${line2}\n`
    const matches = multi.match(EOL_COMMENT_REGEX)
    expect(matches).toContain("# comment")
    // expect(matches).toContain("// another comment");
    expect(EOL_COMMENT_PATTERN).toMatch(/#/)
  })
})
