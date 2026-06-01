import { BOTTOM, type Tree } from "../trees/tree.js"

export interface MemoKey {
  mark: number
  name: string
  canMemo: boolean
}

export interface Memo {
  tree: Tree
  mark: number
}

export function isBottomEntry(memo: Memo): boolean {
  return memo.tree === BOTTOM
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
