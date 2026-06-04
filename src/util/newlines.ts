const whitespace = new Set([" ", "\t", "\r", "\f", "\v"])

function isWhitespace(ch: string): boolean {
  return whitespace.has(ch)
}

export function takeLinebreakLen(text: string, start: number): number {
  const n = text.length
  if (start >= n) return 0

  const nl = text.indexOf("\n", start)
  const endOfLine = nl === -1 ? n : nl

  for (let i = start; i < endOfLine; i++) {
    if (!isWhitespace(text[i])) return -1
  }

  if (nl !== -1) {
    return nl - start + 1
  }
  return n - start
}

export function takeBlankLineLen(text: string, start: number): number {
  const off1 = takeLinebreakLen(text, start)
  if (off1 < 0) return -1
  const off2 = takeLinebreakLen(text, start + off1)
  if (off2 < 0) return -1
  return off1 + off2
}

function takeIndentLen(text: string, start: number): number {
  const n = text.length
  if (start >= n) return 0

  const nl = text.indexOf("\n", start)
  let searchLimit: number
  if (nl === -1) {
    searchLimit = n
  } else {
    searchLimit = start + nl
    while (searchLimit > start && text[searchLimit - 1] === "\r") {
      searchLimit--
    }
  }

  for (let i = start; i < searchLimit; i++) {
    if (!isWhitespace(text[i])) return i - start
  }

  return -1
}

export function takeDedentLen(text: string, start: number): number {
  const offset = takeLinebreakLen(text, start)
  if (offset < 0) return -1
  if (takeIndentLen(text, start + offset) === 0) return offset
  return -1
}
