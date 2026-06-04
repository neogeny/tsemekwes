import { isBaseArray } from "@util"
import { asjson, JSONSerializable } from "@util/asjson"

export class TreeArray extends Array<TreeValue> {
  constructor(value: TreeValue[]) {
    super(...value)
    Object.setPrototypeOf(this, TreeArray.prototype)
  }

  public isTreeArray(): boolean {
    return (
      Array.isArray(this) &&
      this instanceof TreeArray &&
      this.constructor === TreeArray
    )
  }
}

export function isTreeArray(obj: any): boolean {
  return (
    Array.isArray(obj) &&
    obj instanceof TreeArray &&
    (obj as TreeArray).isTreeArray()
  )
}

export type TreeValue =
  | string
  | number
  | boolean
  | null
  | object
  | Tree
  | TreeValue[]
  | TreeArray

export enum TreeKind {
  Node = "Node",
  Named = "Named",
  NamedAsList = "NamedAsList",
  Override = "Override",
  OverrideAsList = "OverrideAsList",
}

export abstract class Tree implements JSONSerializable {
  abstract readonly kind: TreeKind
  abstract fold(gather: TreeMerge): TreeValue

  __json__(seen?: Set<object>): any {
    return treeToJSON(this, seen)
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
    const val = foldOrGather(this.value, gather)
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
  if (Array.isArray(t)) {
    if (t instanceof TreeArray) {
      const items: TreeValue[] = []
      for (const item of t) {
        items.push(foldOrGather(item, gather))
      }
      return new TreeArray(items)
    }
    let out: TreeValue = null
    for (const item of t) {
      const tree = foldOrGather(item, gather)
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

  const aIsArr = isBaseArray(a)
  const bIsArr = isBaseArray(b)

  if (aIsArr && bIsArr) {
    return [...(a as TreeValue[]), ...(b as TreeValue[])]
  }
  if (aIsArr) {
    return [...(a as TreeValue[]), b]
  }
  if (bIsArr) {
    return [a, ...(b as TreeValue[])]
  }
  return [a, b]
}

function appendTree(a: TreeValue | null, b: TreeValue): TreeValue {
  if (a === null) return b
  if (b === null) return a

  if (isBaseArray(a)) {
    return [...(a as TreeValue[]), b]
  }
  return [a, b]
}

function appendAsList(a: TreeValue, b: TreeValue): TreeValue[] {
  if (a === null) {
    return [b]
  }

  if (isBaseArray(a)) {
    return [...(a as TreeValue[]), b]
  }
  return [a, b]
}

export function closed(t: TreeValue): TreeValue {
  if (t === null) {
    return null
  }
  if (isBaseArray(t)) {
    return new TreeArray(t as TreeValue[])
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

export function treeToJSON(t: TreeValue, seen?: Set<object>): TreeValue {
  if (!(t instanceof Tree)) {
    return asjson(t, seen)
  }
  switch (t.kind) {
    case TreeKind.Named: {
      const m = t as Named
      return { [m.name]: treeToJSON(m.value, seen) }
    }

    case TreeKind.NamedAsList: {
      const ml = t as NamedAsList
      return { [ml.name]: treeToJSON(ml.value, seen) }
    }

    case TreeKind.Override:
      return treeToJSON((t as Override).value, seen)
    case TreeKind.OverrideAsList:
      return treeToJSON((t as OverrideAsList).value, seen)

    case TreeKind.Node: {
      const node = t as NodeTree
      const child = treeToJSON(node.tree, seen)
      if (
        child !== null &&
        typeof child === "object" &&
        !Array.isArray(child)
      ) {
        const childObj = child as Record<string, unknown>
        if ("__class__" in childObj) {
          return { __class__: node.typeName, ast: child }
        }
        const result = {
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
