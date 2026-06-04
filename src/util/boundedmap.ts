class ListNode<K, V> {
  constructor(
    public key: K,
    public value: V,
    public prev: ListNode<K, V> | null = null,
    public next: ListNode<K, V> | null = null,
  ) {}
}

export class BoundedMap<K, V> {
  private capacity: number
  private items: Map<K, ListNode<K, V>>
  private head: ListNode<K, V> | null = null
  private tail: ListNode<K, V> | null = null
  private _len = 0

  constructor(capacity: number = 0) {
    this.capacity = capacity
    this.items = new Map()
  }

  private removeNode(node: ListNode<K, V>): void {
    if (node.prev) node.prev.next = node.next
    else this.head = node.next
    if (node.next) node.next.prev = node.prev
    else this.tail = node.prev
    node.prev = null
    node.next = null
    this._len--
  }

  private pushFront(node: ListNode<K, V>): void {
    node.next = this.head
    node.prev = null
    if (this.head) this.head.prev = node
    this.head = node
    if (!this.tail) this.tail = node
    this._len++
  }

  private pushBack(node: ListNode<K, V>): void {
    node.prev = this.tail
    node.next = null
    if (this.tail) this.tail.next = node
    this.tail = node
    if (!this.head) this.head = node
    this._len++
  }

  private moveToFront(node: ListNode<K, V>): void {
    if (node === this.head) return
    this.removeNode(node)
    this.pushFront(node)
  }

  get(key: K): V | undefined {
    const node = this.items.get(key)
    if (!node) return undefined
    if (this.capacity > 0) {
      this.moveToFront(node)
    }
    return node.value
  }

  set(key: K, value: V): void {
    const existing = this.items.get(key)
    if (existing) {
      existing.value = value
      if (this.capacity > 0) {
        this.moveToFront(existing)
      }
      return
    }

    if (this.capacity > 0 && this._len >= this.capacity) {
      const oldest = this.tail
      if (oldest) {
        this.removeNode(oldest)
        this.items.delete(oldest.key)
      }
    }

    const node = new ListNode(key, value)
    this.items.set(key, node)
    if (this.capacity > 0) {
      this.pushFront(node)
    } else {
      this.pushBack(node)
    }
  }

  delete(key: K): void {
    const node = this.items.get(key)
    if (!node) return
    this.removeNode(node)
    this.items.delete(key)
  }

  retain(predicate: (k: K, v: V) => boolean): void {
    let curr = this.head
    while (curr) {
      const next = curr.next
      if (!predicate(curr.key, curr.value)) {
        this.items.delete(curr.key)
        this.removeNode(curr)
      }
      curr = next
    }
  }

  len(): number {
    return this._len
  }

  keys(): K[] {
    const result: K[] = []
    let curr = this.head
    while (curr) {
      result.push(curr.key)
      curr = curr.next
    }
    return result
  }

  *entries(): IterableIterator<[K, V]> {
    let curr = this.head
    while (curr) {
      yield [curr.key, curr.value]
      curr = curr.next
    }
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries()
  }

  toJSON(): Record<string, V> {
    const out: Record<string, V> = {}
    for (const [k, v] of this.entries()) {
      out[String(k)] = v
    }
    return out
  }
}
