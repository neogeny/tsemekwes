import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {BOTTOM} from "@context";
import {Closure, isArrayNotClosure, isClosure, isComplex} from "../closure";
import {type TreeArray} from '../closure'
import {
  treeFold,
  treeToJSONStr,
  Named,
  NamedAsList,
  NodeTree,
  Override,
  OverrideAsList,
  TreeValue,
} from "../tree"

function text(s: string): Text {
  return new Text(s)
}
function seq(...items: TreeValue[]): TreeArray {
  return items
}
function closure(...items: TreeValue[]): Closure {
  return new Closure(items)
}

describe("fold", () => {
  it("Nil", () => {
    const result = treeFold(null)
    assert.ok(result == null)
  })

  it("Bottom", () => {
    const result = treeFold(BOTTOM)
    assert.ok(result === BOTTOM)
  })

  it("null -> null", () => {
    const result = treeFold(null)
    assert.ok(result === null)
  })

  it("Text", () => {
    const result = treeFold(text("hello"))
    assert.ok(result instanceof Text)
    assert.equal(result, "hello")
  })

  it("Bool", () => {
    const result = treeFold(true)
    assert.equal(result, true)
  })

  it("Number", () => {
    const result = treeFold(42.5)
    assert.equal(result, 42.5)
  })

  it("Seq to Array", () => {
    const result = treeFold(seq(text("a"), text("b"), text("c")))
    assert.ok(isArrayNotClosure(result),
      `expected Array, got ${typeof result}`,
    )
    assert.equal(result.length, 3)
    assert.equal(result[0], "a")
  })

  it("List to Array", () => {
    const result = treeFold(closure(text("a"), text("b"), text("c")))
    assert.ok(
      isClosure(result),
      `expected Closure, got ${typeof result}`,
    )
    assert.equal(result.length, 3)
    assert.equal(result[0], "a")
  })

  it("Named to Map", () => {
    const result = treeFold(new Named("x", text("hello")))
    assert.ok(
      isComplex(result),
      `expected object, got ${typeof result}`,
    )
    assert.ok(result.has("x"))
    assert.equal(result["x"], "hello")
  })

  it("Override", () => {
    const result = treeFold(new Override(text("result")))
    assert.ok(result instanceof Text)
    assert.equal((result as Text).value, "result")
  })

  it("Multiple Named", () => {
    const result = treeFold(
      seq(new Named("a", text("1")), new Named("b", text("2"))),
    )
    assert.ok(
      result instanceof MapNode,
      `expected MapNode, got ${typeof result}`,
    )
    const m = result as MapNode
    assert.equal((m.entries.get("a") as Text).value, "1")
    assert.equal((m.entries.get("b") as Text).value, "2")
  })

  it("Named accumulates", () => {
    const result = treeFold(
      seq(new Named("x", text("a")), new Named("x", text("b"))),
    )
    assert.ok(
      result instanceof MapNode,
      `expected MapNode, got ${typeof result}`,
    )
    const m = result as MapNode
    const x = m.entries.get("x") as Seq
    assert.equal((x.items[0] as Text).value, "a")
    assert.equal((x.items[1] as Text).value, "b")
  })

  it("NamedAsList", () => {
    const result = treeFold(new NamedAsList("items", text("x")))
    assert.ok(
      result instanceof MapNode,
      `expected MapNode, got ${typeof result}`,
    )
    const m = result as MapNode
    const seq = m.entries.get("items") as Seq
    assert.equal(seq.items.length, 1)
    assert.equal((seq.items[0] as Text).value, "x")
  })

  it("NamedAsList accumulates", () => {
    const result = treeFold(
      seq(
        new NamedAsList("items", text("a")),
        new NamedAsList("items", text("b")),
      ),
    )
    assert.ok(
      result instanceof MapNode,
      `expected MapNode, got ${typeof result}`,
    )
    const m = result as MapNode
    const items = m.entries.get("items") as Seq
    assert.equal(items.items.length, 2)
    assert.equal((items.items[0] as Text).value, "a")
    assert.equal((items.items[1] as Text).value, "b")
  })

  it("Override wins", () => {
    const result = treeFold(
      seq(
        new Named("x", text("ignored")),
        text("also ignored"),
        new Override(text("result")),
      ),
    )
    assert.ok(result instanceof Text)
    assert.equal((result as Text).value, "result")
  })

  it("OverrideAsList", () => {
    const result = treeFold(
      seq(new OverrideAsList(text("a")), new OverrideAsList(text("b"))),
    )
    assert.ok(
      result instanceof ArrayValue,
      `expected Array, got ${typeof result}`,
    )
    assert.equal((result as ArrayValue).items.length, 2)
  })

  it("Nested Named", () => {
    const result = treeFold(
      new Named("x", seq(new Named("a", text("1")), new Named("b", text("2")))),
    )
    assert.ok(
      result instanceof MapNode,
      `expected MapNode, got ${typeof result}`,
    )
    const m = result as MapNode
    assert.ok(m.entries.has("x"))
    assert.ok(m.entries.has("a"))
    assert.ok(m.entries.has("b"))
  })

  it("Seq with Nil", () => {
    const result = treeFold(seq(text("a"), new Nil(), text("b")))
    assert.ok(
      result instanceof ArrayValue,
      `expected Array, got ${typeof result}`,
    )
    assert.equal((result as ArrayValue).items.length, 2)
  })

  it("Rule node", () => {
    const result = treeFold(new NodeTree("expr", text("42")))
    assert.ok(result instanceof NodeTree)
    const r = result as NodeTree
    assert.equal(r.typeName, "expr")
  })
})

describe("treeToJSONStr", () => {
  it("Text", () => {
    assert.equal(treeToJSONStr("hello"), '"hello"')
  })

  it("Number", () => {
    assert.equal(treeToJSONStr(new NumberValue(42.5)), "42.5")
  })

  it("Node with tree", () => {
    const got = treeToJSONStr(new NodeTree("expr", text("42")))
    const want = JSON.stringify({ __class__: "expr", ast: "42" }, null, 2)
    assert.equal(got, want)
  })
})
