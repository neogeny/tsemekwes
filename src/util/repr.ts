import { BoundedMap } from "./boundedmap"

export const BlackLineLength = 88

export interface FoldOptions {
  addLevels?: number
  amount?: number
}

export function fitsfmt(
  line: string,
  addLevels: number,
  amount: number,
): boolean {
  if (line.includes("\n")) return false
  return line.length + addLevels * amount <= BlackLineLength
}

export function fold(
  prefix: string,
  parts: string[],
  lbrack: string,
  rbrack: string,
  opts?: FoldOptions,
): string {
  const opt: FoldOptions = { amount: 2, ...opts }

  if (parts.length === 0) {
    return prefix + lbrack + rbrack
  }

  const single = prefix + lbrack + parts.join(", ") + rbrack
  if (fitsfmt(single, opt.addLevels ?? 0, opt.amount ?? 2)) {
    return single
  }

  const indent = " ".repeat(opt.amount ?? 2)
  const indented = parts.map((p) => indent + p.replace(/\n/g, `\n${indent}`))
  return `${prefix + lbrack}\n${indented.join(",\n")},\n${prefix}${rbrack}`
}

export function pubMapOf(v: any): any {
  if (v === null || v === undefined) return null
  if (v instanceof BoundedMap) return v

  const ctor = v.constructor
  if (ctor && ctor !== Object && typeof v === "object") {
    const bm = new BoundedMap<string, any>(0)
    bm.set("__class__", ctor.name)
    for (const key of Object.keys(v)) {
      bm.set(key, v[key])
    }
    return bm
  }

  return v
}

function classKeys(m: Record<string, any>): [string, string[]] {
  const keys = Object.keys(m).sort()
  let typeName = ""
  if (keys.length > 0 && keys[0] === "__class__") {
    typeName = String(m.__class__)
    keys.shift()
  }
  return [typeName, keys]
}

function reprFold(parts: string[], typeName: string): string {
  if (typeName === "") {
    return fold("", parts, "map[string]any{", "}")
  }
  return fold("", parts, `${typeName}{`, "}")
}

export function repr(v: any): string {
  return reprValue(v, new Set<object>())
}

function reprValue(v: any, seen: Set<object>): string {
  if (v === null || v === undefined) return "nil"

  if (typeof v === "object") {
    if (seen.has(v)) return "nil"
    seen.add(v)
    try {
      return reprValueImpl(v, seen)
    } finally {
      seen.delete(v)
    }
  }

  return reprValueImpl(v, seen)
}

function arrTypeString(arr: any[]): string {
  if (arr.length === 0) return "[]any"
  const types = new Set(
    arr.map((e) => {
      if (e === null || e === undefined) return "nil"
      if (typeof e === "object" && e.constructor && e.constructor !== Object) {
        return e.constructor.name
      }
      return typeof e
    }),
  )
  if (types.size === 1) {
    const t = types.values().next().value
    if (t === "string") return "[]string"
    if (t === "number") return "[]int"
    if (t === "boolean") return "[]bool"
    if (typeof t === "string" && t !== "object") return `[]${t}`
  }
  return "[]any"
}

function reprValueImpl(v: any, seen: Set<object>): string {
  if (typeof v === "string") return JSON.stringify(v)
  if (typeof v === "boolean") return v ? "true" : "false"
  if (typeof v === "number") return String(v)
  if (typeof v === "bigint") return `${v.toString()}`

  if (v === null || v === undefined) return "nil"

  if (Array.isArray(v)) {
    return reprArray(v, seen)
  }

  if (v instanceof BoundedMap) {
    return reprOrderedMap(v, seen)
  }

  const pm = pubMapOf(v)
  if (pm instanceof BoundedMap) {
    return `&${reprOrderedMap(pm, seen)}`
  }

  if (typeof pm === "object" && pm.constructor === Object) {
    return reprPlainObject(pm, seen)
  }

  return String(v)
}

function reprArray(arr: any[], seen: Set<object>): string {
  const parts = arr.map((e) => reprValue(e, seen))
  const typeStr = arrTypeString(arr)
  return fold("", parts, `${typeStr}{`, "}")
}

function reprOrderedMap(
  om: BoundedMap<string, any>,
  seen: Set<object>,
): string {
  const keys = om.keys()
  let typeName = ""
  if (keys.length > 0 && keys[0] === "__class__") {
    const cls = om.get("__class__")
    if (cls !== undefined) {
      typeName = String(cls)
    }
    keys.shift()
  }
  if (keys.length === 0) {
    if (typeName === "") return "map[string]any{}"
    return `${typeName}{}`
  }
  const parts = keys.map((k) => {
    const item = om.get(k)
    return `${k}: ${reprValue(item, seen)}`
  })
  return reprFold(parts, typeName)
}

function reprPlainObject(obj: Record<string, any>, seen: Set<object>): string {
  const [typeName, keys] = classKeys(obj)
  const parts = keys.map((k) => `${k}: ${reprValue(obj[k], seen)}`)
  return reprFold(parts, typeName)
}
