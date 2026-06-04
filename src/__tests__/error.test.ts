import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile } from "@api"
import { LinkError } from "@peg"

describe("error", () => {
  it("missing rule", () => {
    assert.throws(
      () =>
        compile(`
      @@grammar :: TestGrammar
      block = test
    `),
      LinkError,
    )
  })
})
