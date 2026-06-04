import type { TreeValue } from "@trees"
import { isParseError, type ParseError } from "./error"

export interface MemoKey {
  mark: number
  name: string
  canMemo: boolean
}

export type MemoValue = TreeValue | ParseError

export interface Memo {
  mark: number
  value: MemoValue
}

export function isBottomEntry(memo: Memo): boolean {
  return isParseError(memo.value)
}

export function pruneMemoCache(
  cache: Map<string, Memo>,
  cutPoint: number,
): void {
  for (const [keyStr, memo] of cache) {
    const mark = parseInt(keyStr.split(":")[0], 10)
    if (mark < cutPoint && !isBottomEntry(memo)) {
      cache.delete(keyStr)
    }
  }
}
