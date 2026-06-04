import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { repr } from "../repr"
import { BoundedMap } from "../boundedmap"

class ReprTestStruct {
  constructor(
    public name: string,
    public value: number,
    public ok: boolean,
  ) {}
}

class ReprNested {
  constructor(
    public label: string,
    public inner: ReprTestStruct | null,
  ) {}
}

describe("repr", () => {
  it("primitives", () => {
    const tests: [any, string][] = [
      [null, "nil"],
      [true, "true"],
      [false, "false"],
      [42, "42"],
      [3.14, "3.14"],
      ["hello", `"hello"`],
    ]
    for (const [input, want] of tests) {
      assert.equal(repr(input), want, `repr(${JSON.stringify(input)})`)
    }
  })

  it("struct", () => {
    const s = new ReprTestStruct("foo", 7, true)
    assert.equal(repr(s), `&ReprTestStruct{name: "foo", value: 7, ok: true}`)
  })

  it("slice", () => {
    assert.equal(repr([1, "two", true]), `[]any{1, "two", true}`)
  })

  it("flat map", () => {
    assert.equal(repr({ a: 1, b: 2 }), `map[string]any{a: 1, b: 2}`)
  })

  it("map with class", () => {
    const m: Record<string, any> = {
      __class__: "MyType",
      name: "foo",
      value: 42,
    }
    assert.equal(repr(m), `MyType{name: "foo", value: 42}`)
  })

  it("nested struct", () => {
    const s = new ReprNested("top", new ReprTestStruct("inner", 1, false))
    const got = repr(s)
    // TS names are shorter than Go (no package prefix), so it
    // fits on one line (&ReprNested{label: "top", inner: &ReprTestStruct{name: "inner", value: 1, ok: false}})
    assert.ok(!got.includes("\n"), "nested repr should fit on one line")
    assert.ok(got.includes("inner"), "should contain inner field")
    assert.ok(got.includes("top"), "should contain top label")
  })

  it("typed slice (all strings)", () => {
    assert.equal(repr(["x", "y"]), `[]string{"x", "y"}`)
  })

  it("ordered map", () => {
    const om = new BoundedMap<string, any>(0)
    om.set("count", 42)
    om.set("hello", "world")
    assert.equal(repr(om), `map[string]any{count: 42, hello: "world"}`)
  })

  it("empty ordered map", () => {
    const om = new BoundedMap<string, any>(0)
    assert.equal(repr(om), "map[string]any{}")
  })
})
