import assert from "node:assert/strict"
import { describe, it } from "node:test"
import {
  Nil,
  Text,
  Seq,
  TreeKind,
  type Tree,
  treeToJSON,
} from "../src/trees/tree.js"

function json(t: Tree): unknown {
  return treeToJSON(t)
}

describe("ast", () => {
  it("nil equality", () => {
    const a = new Nil()
    const b = new Nil()
    assert.equal(a.kind, TreeKind.Nil)
    assert.equal(b.kind, TreeKind.Nil)
  })

  it("nil is default empty tree", () => {
    const t = new Nil()
    assert.equal(t.kind, TreeKind.Nil)
    assert.equal(json(t), null)
  })

  it("text node", () => {
    const t = new Text("hello")
    assert.equal(t.kind, TreeKind.Text)
    assert.equal(t.value, "hello")
    assert.equal(json(t), "hello")
  })

  it("seq node", () => {
    const t = new Seq([new Text("a"), new Text("b")])
    assert.equal(t.kind, TreeKind.Seq)
    assert.equal(t.items.length, 2)
    assert.deepStrictEqual(json(t), ["a", "b"])
  })
})
