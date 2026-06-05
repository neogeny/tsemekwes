import { stripLeft } from "./strings"

export interface LineCounts {
  total: number
  blank: number
  comment: number
  code: number
}

function splitLines(s: string): string[] {
  if (s.length === 0) return []
  const parts = s.split("\n")
  if (s.endsWith("\n")) {
    parts.pop()
  }
  return parts
}

export function countLines(s: string, cmtstr: string = "//"): LineCounts {
  let total = 0
  let blank = 0
  let comment = 0
  let code = 0

  for (const line of splitLines(s)) {
    total++
    const rest = stripLeft(line)
    if (rest === "") {
      blank++
    } else if (rest.startsWith(cmtstr)) {
      comment++
    } else {
      code++
    }
  }

  if (s.length > 0 && (s.endsWith("\n") || s.endsWith("\r"))) {
    total++
    blank++
  }

  return { total, blank, comment, code }
}
