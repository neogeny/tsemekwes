
// noinspection JSUnusedGlobalSymbols

const linesre = /([^\n\r]+)(?:\r?\n)?|\r?\)/g;

/**
 * Splits a string into lines yielding chunks lazily.
 * @param s - The source string.
 * @param keepends - If true, line breaks are included in the resulting strings.
 */
export function* lines(s: string, keepends: boolean = false): IterableIterator<string> {
  for (const m of s.matchAll(linesre)) {
    if (keepends) {
      // Yield the full match including the line endings
      yield m[0];
    } else {
      // Yield only the first capture group (the text content without line endings)
      // Fallback to empty string if matching an empty line/lone carriage return
      yield m[1] ?? "";
    }
  }
}

export function splitlines(s: string, keepends: boolean = false): string[] {
  return Array.from(lines(s, keepends))
}

export function stripRight(s: string) : string {
  return s.replace(/\s+$/g, "")
}