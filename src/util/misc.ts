// noinspection JSUnusedGlobalSymbols

const linesre = /([^\n\r]+)(?:\r?\n)?|\r?\n/g

/**
 * Splits a string into lines yielding chunks lazily.
 * @param s - The source string.
 * @param keepends - If true, line breaks are included in the resulting strings.
 */
export function* lines(
  s: string,
  keepends: boolean = false,
): IterableIterator<string> {
  if (s.length === 0) {
    yield ""
    return
  }
  for (const m of s.matchAll(linesre)) {
    if (keepends) {
      // Yield the full match including the line endings
      yield m[0]
    } else {
      // Yield only the first capture group (the text content without line endings)
      // Fallback to empty string if matching an empty line/lone carriage return
      yield m[1] ?? ""
    }
  }
}

export function splitlines(s: string, keepends: boolean = false): string[] {
  return [...lines(s, keepends)]
}

export function stripRight(s: string): string {
  if (s == null || s === "" || s.length === 0) {
    return ""
  }
  return s.replace(/\s+$/g, "")
}

export function stripLeft(s: string): string {
  if (s == null || s === "" || s.length === 0) {
    return ""
  }
  return s.replace(/^[ \t\n\r\f\v]+/g, "")
}

import git from "isomorphic-git"
import fs from "node:fs"

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
