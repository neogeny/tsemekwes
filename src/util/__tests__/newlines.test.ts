import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { takeLinebreakLen, takeBlankLineLen, takeDedentLen } from "../newlines"

function eq(label: string, got: number, want: number): void {
  assert.equal(got, want, label)
}

describe("newlines", () => {
  describe("takeLinebreakLen", () => {
    it("empty line basic", () => eq("empty line basic", takeLinebreakLen("  \nrule", 0), 3))
    it("empty line crlf", () => eq("empty line crlf", takeLinebreakLen("  \r\nrule", 0), 4))
    it("content fails", () => eq("content fails", takeLinebreakLen("content\n", 0), -1))
    it("eot", () => eq("eot", takeLinebreakLen("", 0), 0))
  })

  describe("takeBlankLineLen", () => {
    it("single nl is blank at eot", () => eq("single nl", takeBlankLineLen("\n", 0), 1))
    it("empty input is blank", () => eq("empty input", takeBlankLineLen("", 0), 0))
    it("standard blank", () => eq("standard blank", takeBlankLineLen("\n\n", 0), 2))
    it("whitespace blank", () => eq("whitespace blank", takeBlankLineLen("  \n  \n", 0), 6))
    it("non-blank content", () => eq("non-blank", takeBlankLineLen("rule\n\n", 0), -1))
    it("first blank second content", () => eq("first blank", takeBlankLineLen("\nrule", 0), -1))
    it("two blanks then rule", () => eq("two blanks rule", takeBlankLineLen("  \n  \nrule", 0), 6))
    it("fails on single", () => eq("fails single", takeBlankLineLen("  \nrule", 0), -1))
    it("trailing spaces", () => eq("trailing spaces", takeBlankLineLen("  \n  ", 0), 5))
    it("two blanks at end", () => eq("two blanks end", takeBlankLineLen(" \n ", 0), 3))
    it("multiple blanks", () => eq("multiple blanks", takeBlankLineLen("  \n\n\n", 0), 4))
  })

  describe("takeDedentLen", () => {
    it("standard dedent", () => eq("standard", takeDedentLen("  \nrule", 0), 3))
    it("not a dedent", () => eq("not dedent", takeDedentLen(" \n  indented", 0), -1))
    it("dedent at eot", () => eq("dedent eot", takeDedentLen(" \n", 0), 2))
    it("dedent empty", () => eq("dedent empty", takeDedentLen("", 0), 0))
    it("dedent windows", () => eq("dedent windows", takeDedentLen(" \r\ncontent", 0), 3))
  })
})
