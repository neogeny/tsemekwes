export interface Heartbeat {
  beat(mark: number, total: number): void
}

export class NullHeartbeat implements Heartbeat {
  beat(_mark: number, _total: number): void {}
}
