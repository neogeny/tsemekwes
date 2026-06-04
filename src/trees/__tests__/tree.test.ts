import { describe, expect, it } from "bun:test"
import { isComplex } from "@util"
import { BOTTOM } from "../../context"
import {
  isTreeArray,
  Named,
  NamedAsList,
  NodeTree,
  Override,
  TreeArray,
  type TreeValue,
  treeFold,
  treeToJSONStr,
} from "../tree"

const text = (s: string) => s
const seq = (...items: TreeValue[]) => items
const closure = (...items: TreeValue[]) => new TreeArray(items)

describe("fold", () => {
  it("Nil", () => {
    expect(treeFold(null)).toBeNull()
  })

  it("Bottom", () => {
    expect(treeFold(BOTTOM)).toBe(BOTTOM)
  })

  it("Text", () => {
    expect(treeFold(text("hello"))).toBe("hello")
  })

  it("Bool", () => {
    expect(treeFold(true)).toBe(true)
  })

  it("Number", () => {
    expect(treeFold(42.5)).toBe(42.5)
  })

  it("Seq to Array", () => {
    const result = treeFold(seq(text("a"), text("b"), text("c")))
    console.error("result", result)
    expect(isTreeArray(result)).toBe(true)
    expect(result).toHaveLength(3)
    expect((result as TreeArray)[0]).toBe("a")
  })

  it("Closure to Array", () => {
    const result = treeFold(closure(text("a"), text("b"), text("c")))
    expect(isTreeArray(result)).toBe(true)
    expect(result as TreeArray).toHaveLength(3)
    expect((result as TreeArray)[0]).toBe("a")
  })

  it("Named to Map", () => {
    const result = treeFold(new Named("x", text("hello")))
    expect(isComplex(result)).toBe(true)
    expect(result).toBeInstanceOf(Map)
    expect((result as Map<string, TreeValue>).get("x")).toBe("hello")
  })

  it("Override", () => {
    expect(treeFold(new Override(text("result")))).toBe("result")
  })

  it("Multiple Named", () => {
    const result = treeFold(
      seq(new Named("a", text("1")), new Named("b", text("2"))),
    )
    const m = result as Map<string, TreeValue>
    expect(m.get("a")).toBe("1")
    expect(m.get("b")).toBe("2")
  })

  it("Named accumulates", () => {
    const result = treeFold(
      seq(new Named("x", text("a")), new Named("x", text("b"))),
    )
    const m = result as Map<string, TreeValue>
    const x = m.get("x") as Array<any>
    expect(x[0]).toBe("a")
    expect(x[1]).toBe("b")
  })

  it("NamedAsList accumulates", () => {
    const result = treeFold(
      seq(
        new NamedAsList("items", text("a")),
        new NamedAsList("items", text("b")),
      ),
    )
    const m = result as Map<string, TreeValue>
    const items = m.get("items") as Array<any>
    expect(items).toHaveLength(2)
    expect(items[0]).toBe("a")
    expect(items[1]).toBe("b")
  })

  it("Override wins", () => {
    const result = treeFold(
      seq(
        new Named("x", text("ignored")),
        text("also ignored"),
        new Override(text("result")),
      ),
    )
    expect(result).toBe("result")
  })

  it("Nested Named", () => {
    const result = treeFold(
      new Named("x", seq(new Named("a", text("1")), new Named("b", text("2")))),
    )
    const m = result as Map<string, TreeValue>
    expect(m.has("x")).toBe(true)
    expect(m.has("a")).toBe(true)
    expect(m.has("b")).toBe(true)
  })

  it("Rule node", () => {
    const result = treeFold(new NodeTree("expr", text("42")))
    expect(result).toBeInstanceOf(NodeTree)
    expect((result as NodeTree).typeName).toBe("expr")
  })
})

describe("treeToJSONStr", () => {
  it("Text", () => {
    expect(treeToJSONStr("hello")).toBe('"hello"')
  })

  it("Node with tree", () => {
    const got = treeToJSONStr(new NodeTree("expr", text("42")))
    const want = JSON.stringify({ __class__: "expr", ast: "42" }, null, 2)
    expect(got).toBe(want)
  })
})
