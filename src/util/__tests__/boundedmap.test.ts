import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { BoundedMap } from "../boundedmap"

function intToKey(i: number): string {
  return String.fromCharCode(97 + i)
}

function keyToInt(k: string): number {
  return k.charCodeAt(0) - 97
}

function collectKeys(bm: BoundedMap<string, number>): string[] {
  const keys: string[] = []
  for (const [k] of bm.entries()) {
    keys.push(k)
  }
  return keys
}

describe("BoundedMap", () => {
  it("zero capacity: no eviction, all entries kept", () => {
    const bm = new BoundedMap<string, number>(0)
    const n = 100
    for (let i = 0; i < n; i++) {
      bm.set(intToKey(i), i)
    }
    assert.equal(bm.len(), n)
    for (let i = 0; i < n; i++) {
      const key = intToKey(i)
      const v = bm.get(key)
      assert.notEqual(v, undefined, `get(${key}) missing`)
      assert.equal(v, i, `get(${key})`)
    }
  })

  it("negative capacity: all entries kept", () => {
    const bm = new BoundedMap<string, number>(-1)
    const n = 100
    for (let i = 0; i < n; i++) {
      bm.set(intToKey(i), i)
    }
    assert.equal(bm.len(), n)
  })

  it("no eviction when unbounded", () => {
    const bm = new BoundedMap<string, number>(0)
    const n = 1000
    for (let i = 0; i < n; i++) {
      bm.set(intToKey(i), i)
    }
    assert.equal(bm.len(), n)
  })

  it("entries iterates all keys in order", () => {
    const bm = new BoundedMap<string, number>(0)
    const n = 26
    for (let i = 0; i < n; i++) {
      bm.set(intToKey(i), i)
    }
    const seen = new Set<string>()
    let count = 0
    for (const [k, v] of bm.entries()) {
      assert.equal(seen.has(k), false, `duplicate key ${k}`)
      seen.add(k)
      assert.equal(v, keyToInt(k), `entries key ${k}`)
      count++
    }
    assert.equal(count, n)
  })

  it("delete removes entry", () => {
    const bm = new BoundedMap<string, number>(0)
    for (let i = 0; i < 5; i++) {
      bm.set(intToKey(i), i)
    }
    bm.delete(intToKey(2))
    assert.equal(bm.len(), 4)
    assert.equal(bm.get(intToKey(2)), undefined)
    for (const i of [0, 1, 3, 4]) {
      const v = bm.get(intToKey(i))
      assert.notEqual(v, undefined, `get(${intToKey(i)}) should hit`)
      assert.equal(v, i, `get(${intToKey(i)})`)
    }
  })

  it("retain filters entries", () => {
    const bm = new BoundedMap<string, number>(0)
    for (let i = 0; i < 10; i++) {
      bm.set(intToKey(i), i)
    }
    bm.retain((_k, v) => v % 2 === 0)
    assert.equal(bm.len(), 5)
    for (let i = 0; i < 10; i++) {
      const v = bm.get(intToKey(i))
      if (i % 2 === 0) {
        assert.notEqual(v, undefined, `even key ${intToKey(i)} should survive`)
      } else {
        assert.equal(v, undefined, `odd key ${intToKey(i)} should be removed`)
      }
    }
  })

  it("update does not duplicate key", () => {
    const bm = new BoundedMap<string, number>(0)
    bm.set("k", 1)
    bm.set("k", 2)
    assert.equal(bm.len(), 1)
    assert.equal(bm.get("k"), 2)
  })

  it("entries order preserved after set (insertion order)", () => {
    const bm = new BoundedMap<string, number>(0)
    bm.set("a", 1)
    bm.set("b", 2)
    bm.set("c", 3)
    assert.deepEqual(collectKeys(bm), ["a", "b", "c"])
  })

  it("get does not reorder when unbounded", () => {
    const bm = new BoundedMap<string, number>(0)
    bm.set("a", 1)
    bm.set("b", 2)
    bm.set("c", 3)
    bm.get("a")
    assert.deepEqual(collectKeys(bm), ["a", "b", "c"])
  })

  it("eviction at capacity (LRU)", () => {
    const bm = new BoundedMap<string, number>(3)
    for (let i = 0; i < 5; i++) {
      bm.set(intToKey(i), i)
    }
    assert.equal(bm.len(), 3)
    for (const i of [0, 1]) {
      assert.equal(bm.get(intToKey(i)), undefined, `old key ${intToKey(i)} should be evicted`)
    }
    for (const i of [2, 3, 4]) {
      assert.notEqual(bm.get(intToKey(i)), undefined, `recent key ${intToKey(i)} should survive`)
    }
  })

  it("LRU promotion via get", () => {
    const bm = new BoundedMap<string, number>(3)
    bm.set("a", 1)
    bm.set("b", 2)
    bm.set("c", 3)
    bm.get("a")
    bm.set("d", 4)
    assert.equal(bm.get("b"), undefined)
    for (const k of ["a", "c", "d"]) {
      assert.notEqual(bm.get(k), undefined, `get(${k}) should hit`)
    }
  })

  it("toJSON produces plain object", () => {
    const bm = new BoundedMap<string, number>(0)
    bm.set("a", 1)
    bm.set("b", 2)
    assert.deepEqual(bm.toJSON(), { a: 1, b: 2 })
  })
})
