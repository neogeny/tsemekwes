import { TreeValue } from "./tree"

export type TreeArray = Array<TreeValue>

export class Closure extends Array<TreeValue> {
  constructor(value: TreeArray) {
    super(...value)
    Object.setPrototypeOf(this, Closure.prototype)
  }
}

export function isClosure(obj: any): boolean {
  // 1. Must be an array (inherited from Array prototype)
  // 2. Must be an instance of your custom class
  // 3. Must not be a native Array (prevent false positives)
  return (
    Array.isArray(obj) && obj instanceof Closure && obj.constructor === Closure
  )
}

export function isArrayNotClosure(obj: any): boolean {
  // The only truly universal check for array-like behavior
  return Array.isArray(obj) && !isClosure(obj)
}

export function isComplex(obj: any): boolean {
  // Primitives: null, undefined, string, number, boolean, bigint, symbol
  // Complex: {}, [], function, class instances, etc.
  return obj !== null && (typeof obj === "object" || typeof obj === "function")
}

export function asObject(obj: any): object | null {
  return isComplex(obj) ? obj : null
}

export function isPlain(obj: any): boolean {
  if (obj === null || typeof obj !== "object") return false

  // Check if it's a plain object
  const proto = Object.getPrototypeOf(obj)
  return proto === Object.prototype || proto === Array.prototype
}
