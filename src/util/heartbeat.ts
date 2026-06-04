export interface Heartbeat {
  tick(mark: number, total: number): void
}

export class NullHeartbeat implements Heartbeat {
  tick(_mark: number, _total: number): void {}
}
