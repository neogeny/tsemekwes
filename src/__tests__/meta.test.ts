import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { ApiError, loadGrammarFromJSON, parseInput } from "@api"
import { asjson, asjsons } from "@util/asjson"

function makeMetaGrammar(metaClass: string, ruleName = "value"): string {
  return JSON.stringify({
    __class__: "Grammar",
    name: "MetaTest",
    rules: [
      {
        __class__: "Rule",
        name: "start",
        exp: {
          __class__: "Sequence",
          sequence: [
            { __class__: "Call", name: ruleName },
            { __class__: "EOF" },
          ],
        },
      },
      {
        __class__: "Rule",
        name: ruleName,
        exp: { __class__: metaClass },
      },
    ],
  })
}

function makeMetaGrammarMulti(
  metaClasses: string[],
  ruleName = "value",
): string {
  const rules: any[] = metaClasses.map((mc, i) => ({
    __class__: "Rule",
    name: `${ruleName}_${i}`,
    exp: { __class__: mc },
  }))
  const startSeq: any[] = metaClasses.map((_, i) => ({ __class__: "Call", name: `${ruleName}_${i}` }))
  startSeq.push({ __class__: "EOF" })
  rules.push({
    __class__: "Rule",
    name: "start",
    exp: {
      __class__: "Sequence",
      sequence: startSeq,
    },
  })
  return JSON.stringify({
    __class__: "Grammar",
    name: "MetaTest",
    rules,
  })
}

describe("meta expressions", () => {
  describe("@name", () => {
    it("matches a simple identifier", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("NameMeta"))
      assert.equal(grammar.name, "MetaTest")
      const result = parseInput(grammar, "hello")
      assert.equal(asjson(result), "hello")
    })

    it("matches underscore-prefixed name", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("NameMeta"))
      const result = parseInput(grammar, "_private")
      assert.equal(asjson(result), "_private")
    })

    it("matches name with digits", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("NameMeta"))
      const result = parseInput(grammar, "var123")
      assert.equal(asjson(result), "var123")
    })

    it("fails on leading digit", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("NameMeta"))
      assert.throws(() => parseInput(grammar, "123abc"), ApiError)
    })
  })

  describe("@int", () => {
    it("matches positive integer", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("IntMeta"))
      const result = parseInput(grammar, "42")
      assert.equal(asjson(result), "42")
    })

    it("matches negative integer", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("IntMeta"))
      const result = parseInput(grammar, "-42")
      assert.equal(asjson(result), "-42")
    })

    it("matches integer with underscores", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("IntMeta"))
      const result = parseInput(grammar, "1_234")
      assert.equal(asjson(result), "1_234")
    })

    it("fails on non-numeric input", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("IntMeta"))
      assert.throws(() => parseInput(grammar, "abc"), ApiError)
    })

    it("fails on trailing underscore", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("IntMeta"))
      assert.throws(() => parseInput(grammar, "123_"), ApiError)
    })

    it("matches positive integer with explicit +", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("IntMeta"))
      const result = parseInput(grammar, "+42")
      assert.equal(asjson(result), "+42")
    })
  })

  describe("@uint", () => {
    it("matches digits", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("UIntMeta"))
      const result = parseInput(grammar, "42")
      assert.equal(asjson(result), "42")
    })

    it("matches uint with underscores", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("UIntMeta"))
      const result = parseInput(grammar, "1_234")
      assert.equal(asjson(result), "1_234")
    })

    it("fails on negative sign", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("UIntMeta"))
      assert.throws(() => parseInput(grammar, "-42"), ApiError)
    })
  })

  describe("@float", () => {
    it("matches integer-like float", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("FloatMeta"))
      const result = parseInput(grammar, "42")
      assert.equal(asjson(result), "42")
    })

    it("matches decimal float", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("FloatMeta"))
      const result = parseInput(grammar, "3.14")
      assert.equal(asjson(result), "3.14")
    })

    it("matches scientific notation", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("FloatMeta"))
      const result = parseInput(grammar, "1.5e10")
      assert.equal(asjson(result), "1.5e10")
    })

    it("matches negative float", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("FloatMeta"))
      const result = parseInput(grammar, "-3.14")
      assert.equal(asjson(result), "-3.14")
    })

    it("fails on letters", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("FloatMeta"))
      assert.throws(() => parseInput(grammar, "abc"), ApiError)
    })
  })

  describe("@bool", () => {
    it("matches true", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("BoolMeta"))
      const result = parseInput(grammar, "true")
      assert.equal(asjson(result), "true")
    })

    it("matches false", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("BoolMeta"))
      const result = parseInput(grammar, "false")
      assert.equal(asjson(result), "false")
    })

    it("fails on random word", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("BoolMeta"))
      assert.throws(() => parseInput(grammar, "foo"), ApiError)
    })

    it("is case-sensitive", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("BoolMeta"))
      assert.throws(() => parseInput(grammar, "True"), ApiError)
    })
  })

  describe("with whitespace", () => {
    it("matches int after whitespace", () => {
      const grammar = loadGrammarFromJSON(makeMetaGrammar("IntMeta"))
      const result = parseInput(grammar, "  42")
      assert.equal(asjson(result), "42")
    })

    it("matches multiple meta expressions with whitespace between", () => {
      const grammar = loadGrammarFromJSON(
        makeMetaGrammarMulti(["NameMeta", "IntMeta", "BoolMeta"]),
      )
      const result = parseInput(grammar, "hello 42 true")
      const arr = asjson(result) as string[]
      assert.deepStrictEqual(arr, ["hello", "42", "true"])
    })
  })

  describe("JSON round-trip", () => {
    it("serializes and deserializes NameMeta", () => {
      const g1 = loadGrammarFromJSON(makeMetaGrammar("NameMeta"))
      const json = asjsons(g1)
      const g2 = loadGrammarFromJSON(json)
      assert.equal(g2.name, "MetaTest")
      const result = parseInput(g2, "hello")
      assert.equal(asjson(result), "hello")
    })

    it("serializes and deserializes IntMeta", () => {
      const g1 = loadGrammarFromJSON(makeMetaGrammar("IntMeta"))
      const json = asjsons(g1)
      const g2 = loadGrammarFromJSON(json)
      const result = parseInput(g2, "-42")
      assert.equal(asjson(result), "-42")
    })
  })
})
