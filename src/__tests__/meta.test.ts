import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { ApiError, compile, parseInput } from "@api"
import { asjson } from "@util/asjson"

// Helper to construct a grammar string
function metaGrammar(meta: string): string {
  return `
    @@grammar :: MetaTest
    @@whitespace :: /[\t ]+/
    start := ${meta} $
  `
}

describe("meta expressions", () => {
  describe("@name", () => {
    it("matches a simple identifier", () => {
      const grammar = compile(metaGrammar("@name"))
      assert.equal(grammar.name, "MetaTest")
      const result = parseInput(grammar, "hello")
      assert.equal(asjson(result), "hello")
    })

    it("matches underscore-prefixed name", () => {
      const grammar = compile(metaGrammar("@name"))
      const result = parseInput(grammar, "_private")
      assert.equal(asjson(result), "_private")
    })

    it("matches name with digits", () => {
      const grammar = compile(metaGrammar("@name"))
      const result = parseInput(grammar, "var123")
      assert.equal(asjson(result), "var123")
    })

    it("fails on leading digit", () => {
      const grammar = compile(metaGrammar("@name"))
      assert.throws(() => parseInput(grammar, "123abc"), ApiError)
    })
  })

  describe("@int", () => {
    it("matches positive integer", () => {
      const grammar = compile(metaGrammar("@int"))
      const result = parseInput(grammar, "42")
      assert.equal(asjson(result), 42)
    })

    it("matches negative integer", () => {
      const grammar = compile(metaGrammar("@int"))
      const result = parseInput(grammar, "-42")
      assert.equal(asjson(result), -42)
    })

    it("matches integer with underscores", () => {
      const grammar = compile(metaGrammar("@int"))
      const result = parseInput(grammar, "1_234")
      assert.equal(asjson(result), 1_234)
    })

    it("fails on non-numeric input", () => {
      const grammar = compile(metaGrammar("@int"))
      assert.throws(() => parseInput(grammar, "abc"), ApiError)
    })

    it("fails on trailing underscore", () => {
      const grammar = compile(metaGrammar("@int"))
      assert.throws(() => parseInput(grammar, "123_"), ApiError)
    })

    it("matches positive integer with explicit +", () => {
      const grammar = compile(metaGrammar("@int"))
      const result = parseInput(grammar, "+42")
      assert.equal(asjson(result), +42)
    })
  })

  describe("@uint", () => {
    it("matches digits", () => {
      const grammar = compile(metaGrammar("@uint"))
      const result = parseInput(grammar, "42")
      assert.equal(asjson(result), 42)
    })

    it("matches uint with underscores", () => {
      const grammar = compile(metaGrammar("@uint"))
      const result = parseInput(grammar, "1_234")
      assert.equal(asjson(result), 1_234)
    })

    it("fails on negative sign", () => {
      const grammar = compile(metaGrammar("@uint"))
      assert.throws(() => parseInput(grammar, "-42"), ApiError)
    })
  })

  describe("@float", () => {
    it("matches integer-like float", () => {
      const grammar = compile(metaGrammar("@float"))
      const result = parseInput(grammar, "42")
      assert.equal(asjson(result), 42)
    })

    it("matches decimal float", () => {
      const grammar = compile(metaGrammar("@float"))
      const result = parseInput(grammar, "3.14")
      assert.equal(asjson(result), 3.14)
    })

    it("matches scientific notation", () => {
      const grammar = compile(metaGrammar("@float"))
      const result = parseInput(grammar, "1.5e10")
      assert.equal(asjson(result), 1.5e10)
    })

    it("matches negative float", () => {
      const grammar = compile(metaGrammar("@float"))
      const result = parseInput(grammar, "-3.14")
      assert.equal(asjson(result), -3.14)
    })

    it("fails on letters", () => {
      const grammar = compile(metaGrammar("@float"))
      assert.throws(() => parseInput(grammar, "abc"), ApiError)
    })
  })

  describe("@bool", () => {
    it("matches true", () => {
      const grammar = compile(metaGrammar("@bool"))
      const result = parseInput(grammar, "true")
      assert.equal(asjson(result), true)
    })

    it("matches false", () => {
      const grammar = compile(metaGrammar("@bool"))
      const result = parseInput(grammar, "false")
      assert.equal(asjson(result), false)
    })

    it("fails on random word", () => {
      const grammar = compile(metaGrammar("@bool"))
      assert.throws(() => parseInput(grammar, "foo"), ApiError)
    })

    it("is case-insensitive", () => {
      const grammar = compile(metaGrammar("@bool"))
      assert.equal(parseInput(grammar, "True"), true)
    })
  })

  describe("with whitespace", () => {
    it("matches int after whitespace", () => {
      const grammar = compile(metaGrammar("@int"))
      const result = parseInput(grammar, "  42")
      assert.equal(asjson(result), 42)
    })

    it("matches multiple meta expressions with whitespace between", () => {
      const grammar = compile(`
        @@grammar :: MetaTest
        @@whitespace :: /[\t ]+/
        start := @int @float @name $
      `)
      const result = parseInput(grammar, "42 3.14 hello")
      const arr = asjson(result) as string[]
      assert.deepStrictEqual(arr, [42, 3.14, "hello"])
    })
  })
})
