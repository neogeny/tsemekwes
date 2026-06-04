import {asjson} from "@util/asjson";
import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { compile, parseInput } from "@api"

describe("string", () => {
  it("multiline", () => {
    const g = compile(`
      @@grammar :: Test
      start := longone | shortone $
      shortone := "short"
      longone := """
        this "text"
        is a long "string"
        """
    `)
    assert.equal(asjson(parseInput(g, "short")), "short")
  })
})
