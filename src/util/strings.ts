export const isAlphabetic = (str: string): boolean => {
  if (str.length === 0) return false

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    // Check A-Z (65-90) or a-z (97-122)
    if (!(code >= 65 && code <= 90) && !(code >= 97 && code <= 122)) {
      return false
    }
  }
  return true
}

export const isAlphanumeric = (str: string): boolean => {
  if (str.length === 0) return false

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    // Check A-Z (65-90), a-z (97-122), or 0-9 (48-57)
    if (
      !(code >= 65 && code <= 90) &&
      !(code >= 97 && code <= 122) &&
      !(code >= 48 && code <= 57)
    ) {
      return false
    }
  }
  return true
}

export function stripRight(s: string, keepends = false): string {
  if (s == null || s === "" || s.length === 0) {
    return ""
  }
  if (keepends) {
    return s.replace(/[ \t\f\v]+$/g, "")
  }
  return s.replace(/\s+$/g, "")
}

export function stripLeft(s: string, keepends = false): string {
  if (s == null || s === "" || s.length === 0) {
    return ""
  }
  if (keepends) {
    return s.replace(/^[ \t\f\v]+/g, "")
  }
  return s.replace(/^\s+/g, "")
}

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

export function dedent(s: string): string {
  if (s == null || s === "" || s.length === 0) {
    return ""
  }

  let indent = Infinity
  const lines = splitlines(s, true) // NOTE: keep line endings
  for (const line of lines) {
    const stripped = stripLeft(line)
    if (stripped.length === 0) continue
    indent = Math.min(indent, line.length - stripped.length)
  }
  if (indent === Infinity) indent = 0
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().length === 0) continue
    lines[i] = lines[i].slice(indent)
  }
  return lines.join("")
}
