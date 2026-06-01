export enum TreeKind {
  Text = "Text",
  NumberValue = "NumberValue",
  Bool = "Bool",
  Nil = "Nil",
  Bottom = "Bottom",
  TrueValue = "TrueValue",
  FalseValue = "FalseValue",
  NullValue = "NullValue",
  Seq = "Seq",
  ArrayValue = "ArrayValue",
  MapNode = "MapNode",
  Node = "Node",
  Named = "Named",
  NamedAsList = "NamedAsList",
  Override = "Override",
  OverrideAsList = "OverrideAsList",
}

export interface Tree {
  readonly kind: TreeKind
  fold(gather: TreeMerge): Tree
}

export class TreeMerge {
  root: Tree | null = null
  map = new Map<string, Tree>()

  insert(key: string, val: Tree): void {
    const existing = this.map.get(key)
    if (existing === undefined) {
      this.map.set(key, val)
    } else {
      this.map.set(key, appendTree(existing, val))
    }
  }

  insertAsList(key: string, val: Tree): void {
    const existing = this.map.get(key)
    if (existing === undefined) {
      this.map.set(key, new Seq([val]))
    } else {
      this.map.set(key, appendAsList(existing, val))
    }
  }
}

// --- Leaf types ---

export class Text implements Tree {
  readonly kind = TreeKind.Text
  constructor(public value: string) {}
  fold(_gather: TreeMerge): Tree {
    return this
  }
}

export class NumberValue implements Tree {
  readonly kind = TreeKind.NumberValue
  constructor(public value: number) {}
  fold(_gather: TreeMerge): Tree {
    return this
  }
}

export class Bool implements Tree {
  readonly kind = TreeKind.Bool
  constructor(public value: boolean) {}
  fold(_gather: TreeMerge): Tree {
    return this
  }
}

export class Nil implements Tree {
  readonly kind = TreeKind.Nil
  fold(_gather: TreeMerge): Tree {
    return this
  }
}

export class Bottom implements Tree {
  readonly kind = TreeKind.Bottom
  fold(_gather: TreeMerge): Tree {
    return this
  }
}

export class TrueValue implements Tree {
  readonly kind = TreeKind.TrueValue
  fold(_gather: TreeMerge): Tree {
    return this
  }
}

export class FalseValue implements Tree {
  readonly kind = TreeKind.FalseValue
  fold(_gather: TreeMerge): Tree {
    return this
  }
}

export class NullValue implements Tree {
  readonly kind = TreeKind.NullValue
  fold(_gather: TreeMerge): Tree {
    return this
  }
}

export const NIL = new Nil()
export const BOTTOM = new Bottom()
export const TRUE: Tree = new TrueValue()
export const FALSE: Tree = new FalseValue()
export const NULL: Tree = new NullValue()

export class Seq implements Tree {
  readonly kind = TreeKind.Seq
  constructor(public items: Tree[]) {}
  fold(gather: TreeMerge): Tree {
    let out: Tree = NIL
    for (const item of this.items) {
      out = merge(out, item.fold(gather))
    }
    return out
  }
}

export class ArrayValue implements Tree {
  readonly kind = TreeKind.ArrayValue
  constructor(public items: Tree[]) {}
  fold(gather: TreeMerge): Tree {
    const items = this.items.map((item) => item.fold(gather))
    return new ArrayValue(items)
  }
}

export class MapNode implements Tree {
  readonly kind = TreeKind.MapNode
  constructor(public entries: Map<string, Tree>) {}
  fold(_gather: TreeMerge): Tree {
    return this
  }
}

export class Node implements Tree {
  readonly kind = TreeKind.Node
  constructor(
    public typeName: string,
    public tree: Tree,
  ) {}
  fold(_gather: TreeMerge): Tree {
    return this
  }
}

// --- Name / Override types ---

export class Named implements Tree {
  readonly kind = TreeKind.Named
  constructor(
    public name: string,
    public value: Tree,
  ) {}
  fold(gather: TreeMerge): Tree {
    const val = this.value.fold(gather)
    gather.insert(this.name, val)
    return val
  }
}

export class NamedAsList implements Tree {
  readonly kind = TreeKind.NamedAsList
  constructor(
    public name: string,
    public value: Tree,
  ) {}
  fold(gather: TreeMerge): Tree {
    const val = this.value.fold(gather)
    gather.insertAsList(this.name, val)
    return val
  }
}

export class Override implements Tree {
  readonly kind = TreeKind.Override
  constructor(public value: Tree) {}
  fold(gather: TreeMerge): Tree {
    const val = this.value.fold(gather)
    gather.root = appendTree(gather.root, val)
    return val
  }
}

export class OverrideAsList implements Tree {
  readonly kind = TreeKind.OverrideAsList
  constructor(public value: Tree) {}
  fold(gather: TreeMerge): Tree {
    const val = this.value.fold(gather)
    gather.root = appendAsList(gather.root, val)
    return val
  }
}

// --- Internal helpers ---

function isNil(t: Tree | null | undefined): boolean {
  return t == null || t.kind === TreeKind.Nil
}

function merge(a: Tree, b: Tree): Tree {
  if (isNil(a)) return b
  if (isNil(b)) return a

  const aIsSeq = a.kind === TreeKind.Seq
  const bIsSeq = b.kind === TreeKind.Seq

  if (aIsSeq && bIsSeq) {
    return new Seq([...(a as Seq).items, ...(b as Seq).items])
  }
  if (aIsSeq) {
    return new Seq([...(a as Seq).items, b])
  }
  if (bIsSeq) {
    return new Seq([a, ...(b as Seq).items])
  }
  return new Seq([a, b])
}

function appendTree(a: Tree | null, b: Tree): Tree {
  if (a == null || a.kind === TreeKind.Nil) return b
  if (b.kind === TreeKind.Nil) return a

  if (a.kind === TreeKind.Seq) {
    return new Seq([...(a as Seq).items, b])
  }
  return new Seq([a, b])
}

function appendAsList(a: Tree | null, b: Tree): Tree {
  if (a == null || a.kind === TreeKind.Nil) return new Seq([b])

  if (a.kind === TreeKind.Seq) {
    return new Seq([...(a as Seq).items, b])
  }
  return new Seq([a, b])
}

function closed(t: Tree): Tree {
  if (t.kind === TreeKind.Seq) {
    return new ArrayValue((t as Seq).items)
  }
  return t
}

function finish(g: TreeMerge, base: Tree): Tree {
  if (g.root !== null && g.root.kind !== TreeKind.Nil) {
    return closed(g.root)
  }
  if (g.map.size > 0) {
    return new MapNode(new Map(g.map))
  }
  return closed(base)
}

// --- Public API ---

export function fold(tree: Tree | null): Tree {
  if (tree === null) {
    return NIL
  }
  const g = new TreeMerge()
  const result = tree.fold(g)
  return finish(g, result)
}

export function treeToJSON(t: Tree): unknown {
  switch (t.kind) {
    case TreeKind.Text:
      return (t as Text).value
    case TreeKind.NumberValue:
      return (t as NumberValue).value
    case TreeKind.Bool:
      return (t as Bool).value
    case TreeKind.Nil:
    case TreeKind.Bottom:
    case TreeKind.NullValue:
      return null
    case TreeKind.TrueValue:
      return true
    case TreeKind.FalseValue:
      return false
    case TreeKind.Seq:
      return (t as Seq).items.map(treeToJSON)
    case TreeKind.ArrayValue:
      return (t as ArrayValue).items.map(treeToJSON)
    case TreeKind.MapNode: {
      const out: Record<string, unknown> = {}
      for (const [key, val] of (t as MapNode).entries) {
        out[key] = treeToJSON(val)
      }
      return out
    }
    case TreeKind.Named:
      return { [(t as Named).name]: treeToJSON((t as Named).value) }
    case TreeKind.NamedAsList:
      return {
        [(t as NamedAsList).name]: treeToJSON((t as NamedAsList).value),
      }
    case TreeKind.Override:
      return treeToJSON((t as Override).value)
    case TreeKind.OverrideAsList:
      return treeToJSON((t as OverrideAsList).value)
    case TreeKind.Node: {
      const node = t as Node
      const child = treeToJSON(node.tree)
      if (
        typeof child === "object" &&
        child !== null &&
        !globalThis.Array.isArray(child)
      ) {
        const childObj = child as Record<string, unknown>
        if (!("__class__" in childObj)) {
          return { __class__: node.typeName, ...childObj }
        }
      }
      return { __class__: node.typeName, ast: child }
    }
  }
}

export function treeToJSONStr(t: Tree): string {
  return JSON.stringify(treeToJSON(t), null, 2)
}
