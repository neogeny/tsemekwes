export interface Heart {
  heartbeat(mark: number, total: number): void
}

export class DeadHeart implements Heart {
  heartbeat(_mark: number, _total: number): void {}
}
