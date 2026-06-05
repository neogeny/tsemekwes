import fs from "node:fs"
import git from "isomorphic-git"

export async function getProjectGitVersion(dir: string = "."): Promise<string> {
  try {
    const sha = await git.resolveRef({ fs, dir, ref: "HEAD" })

    const tags = await git.listTags({ fs, dir })

    for (const tag of tags) {
      const tagSha = await git.resolveRef({ fs, dir, ref: tag })
      if (tagSha === sha) {
        return tag // Returns the clean semantic tag (e.g., "v1.2.0")
      }
    }

    return sha.slice(0, 7)
  } catch (_) {
    return "unknown"
  }
}

/**
 * Python-like bool() function
 */
export function pybool(value: any): boolean {
  // Handle null and undefined (Python's None)
  if (value === null || value === undefined) {
    return false
  }

  // Handle numbers (0 is False)
  if (typeof value === "number") {
    return value !== 0
  }

  // Handle strings (Empty is False)
  if (typeof value === "string") {
    return value.length > 0
  }

  // Handle arrays (Empty is False)
  if (Array.isArray(value)) {
    return value.length > 0
  }

  // Handle objects (Empty is False)
  if (typeof value === "object") {
    return Object.keys(value).length > 0
  }

  // Everything else (functions, classes, true) is True
  return true
}

export function isBaseArray(obj: any): boolean {
  return Array.isArray(obj) && obj.constructor === Array
}

export function isComplex(obj: any): boolean {
  return obj !== null && (typeof obj === "object" || typeof obj === "function")
}

export function asObject(obj: any): object | null {
  return isComplex(obj) ? obj : null
}

export function isPlain(obj: any): boolean {
  if (obj === null || typeof obj !== "object") return false

  const proto = Object.getPrototypeOf(obj)
  return proto === Object.prototype || proto === Array.prototype
}
