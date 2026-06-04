import { isArrayNotClosure, type TreeArray } from "./closure"
import { Closure } from "./closure"
import { asjson } from "@util/asjson"

export type TreeValue =
  | string
  | number
  | boolean
  | null
  | object
  | Tree
  | Closure
  | TreeArray

export enum TreeKind {
  Node = "Node",
  Named = "Named",
  NamedAsList = "NamedAsList",
  Override = "Override",
  OverrideAsList = "OverrideAsList",
}

export abstract class Tree {
  abstract readonly kind: TreeKind
  abstract fold(gather: TreeMerge): TreeValue

  __json__(seen?: Set<object>): any {
    return asjson(treeToJSON(this), seen)
  }
}

export class TreeMerge {
  root: TreeValue = null
  map = new Map<string, TreeValue>()

  insert(key: string, val: TreeValue): void {
    const existing = this.map.get(key)
    if (existing === undefined) {
      this.map.set(key, val)
    } else {
      this.map.set(key, appendTree(existing, val))
    }
  }

  insertAsList(key: string, val: TreeValue): void {
    const existing = this.map.get(key)
    if (existing === undefined) {
      this.map.set(key, [val])
    } else {
      this.map.set(key, appendAsList(existing, val))
    }
  }
}

export class NodeTree extends Tree {
  readonly kind = TreeKind.Node
  constructor(
    public typeName: string,
    public tree: TreeValue,
  ) {
    super()
  }
  fold(_gather: TreeMerge): TreeValue {
    return this
  }
}

export class Named extends Tree {
  readonly kind = TreeKind.Named
  constructor(
    public name: string,
    public value: TreeValue,
  ) {
    super()
  }
  fold(gather: TreeMerge): TreeValue {
    let val = foldOrGather(this.value, gather)
    gather.insert(this.name, val)
    return val
  }
}

export class NamedAsList extends Tree {
  readonly kind = TreeKind.NamedAsList
  constructor(
    public name: string,
    public value: TreeValue,
  ) {
    super()
  }
  fold(gather: TreeMerge): TreeValue {
    const val = foldOrGather(this.value, gather)
    gather.insertAsList(this.name, val)
    return val
  }
}

export class Override extends Tree {
  readonly kind = TreeKind.Override
  constructor(public value: TreeValue) {
    super()
  }
  fold(gather: TreeMerge): TreeValue {
    const val = foldOrGather(this.value, gather)
    gather.root = appendTree(gather.root, val)
    return val
  }
}

export class OverrideAsList extends Tree {
  readonly kind = TreeKind.OverrideAsList
  constructor(public value: TreeValue) {
    super()
  }
  fold(gather: TreeMerge): TreeValue {
    const val = foldOrGather(this.value, gather)
    gather.root = appendAsList(gather.root, val)
    return val
  }
}

function foldOrGather(t: TreeValue, gather: TreeMerge): TreeValue {
  if (t === null) {
    return null
  }
  if (isArrayNotClosure(t)) {
    let out: TreeValue = null
    for (let item of t as TreeArray) {
      let tree = foldOrGather(item, gather)
      out = treeMerge(out, tree)
    }
    return out
  }
  return t instanceof Tree ? t.fold(gather) : t
}

export function treeFold(tree: TreeValue): TreeValue {
  if (tree === null) {
    return null
  }
  const g = new TreeMerge()
  const result = foldOrGather(tree, g)
  return finish(g, result)
}

export function treeMerge(a: TreeValue, b: TreeValue): TreeValue {
  if (b === null) return a
  if (a === null) return b

  const aIsArr = isArrayNotClosure(a)
  const bIsArr = isArrayNotClosure(b)

  if (aIsArr && bIsArr) {
    return [...(a as TreeArray), ...(b as TreeArray)]
  }
  if (aIsArr) {
    return [...(a as TreeArray), b]
  }
  if (bIsArr) {
    return [a, ...(b as TreeArray)]
  }
  return [a, b]
}

function appendTree(a: TreeValue | null, b: TreeValue): TreeValue {
  if (a === null) return b
  if (b === null) return a

  if (isArrayNotClosure(a)) {
    return [...(a as TreeArray), b]
  }
  return [a, b]
}

function appendAsList(a: TreeValue, b: TreeValue): TreeArray {
  if (a === null) {
    return [b]
  }

  if (isArrayNotClosure(a)) {
    return [...(a as TreeArray), b]
  }
  return [a, b]
}

export function closed(t: TreeValue): TreeValue {
  if (t === null) {
    return null
  }
  if (isArrayNotClosure(t)) {
    let a = t as TreeArray
    return new Closure(a)
  }
  return t
}

function finish(g: TreeMerge, base: TreeValue): TreeValue {
  if (g.root !== null) {
    return closed(g.root)
  }
  if (g.map.size > 0) {
    return g.map
  }
  return closed(base)
}

export function treeToJSON(t: TreeValue): TreeValue {
  if (!(t instanceof Tree)) {
    return t
  }
  switch (t.kind) {
    case TreeKind.Named:
      const m = t as Named
      return { [m.name]: treeToJSON(m.value) }

    case TreeKind.NamedAsList:
      const ml = t as NamedAsList
      return { [ml.name]: treeToJSON(ml.value) }

    case TreeKind.Override:
      return treeToJSON((t as Override).value)
    case TreeKind.OverrideAsList:
      return treeToJSON((t as OverrideAsList).value)

    case TreeKind.Node: {
      const node = t as NodeTree
      const child = treeToJSON(node.tree)
      if (
        child !== null &&
        typeof child === "object" &&
        !Array.isArray(child)
      ) {
        const childObj = child as Record<string, unknown>
        let result = {
          __class__: node.typeName,
          ...childObj,
        }
        result["__class__"] = node.typeName
        return result
      }
      return { __class__: node.typeName, ast: child }
    }
  }
}

export function treeToJSONStr(t: TreeValue): string {
  return JSON.stringify(treeToJSON(t), null, 2)
}
