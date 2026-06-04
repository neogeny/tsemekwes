export interface JSONSerializable {
  __json__(seen?: Set<object>): any
}

export function asjsons(obj: any): string {
  return JSON.stringify(asjson(obj), null, 2)
}

export function asjson(obj: any, seen?: Set<object>): any {
  if (obj === null || obj === undefined) {
    return null
  }

  if (
    typeof obj === "string" ||
    typeof obj === "number" ||
    typeof obj === "boolean"
  )
    return obj

  if (typeof obj === "bigint") return obj.toString()
  if (typeof obj === "function" || typeof obj === "symbol") return repr(obj)

  seen ??= new Set()
  if (seen.has(obj)) return repr(obj)
  seen.add(obj)

  try {
    if (typeof obj.__json__ === "function") {
      return obj.__json__(seen)
    }

    if (obj instanceof Map) {
      const out: Record<string, any> = {}
      for (const [k, v] of obj) {
        out[String(k)] = asjson(v, seen)
      }
      return out
    }

    if (obj instanceof Set || Array.isArray(obj))
      return [...obj].map((e) => asjson(e, seen))

    if (obj instanceof Date) return obj.toISOString()
    if (obj instanceof RegExp) return obj.toString()

    if (
      Object.getPrototypeOf(obj) === Object.prototype ||
      obj.constructor === Object
    ) {
      const out: Record<string, any> = {}
      for (const [k, v] of Object.entries(obj)) {
        out[k] = asjson(v, seen)
      }
      return out
    }

    return repr(obj)
  } finally {
    seen.delete(obj)
  }
}
export function repr(obj: any): string {
  if (obj === null) return "null"
  if (typeof obj === "string") return JSON.stringify(obj)
  const name = obj.constructor?.name ?? "Object"
  if (typeof obj === "function")
    return name ? `[Function: ${name}]` : "[Function]"
  if (typeof obj === "symbol") return obj.toString()
  if (typeof obj === "bigint") return obj.toString() + "n"
  if (typeof obj === "object") return `[${name}]`
  return String(obj)
}
