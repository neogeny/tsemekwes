import { type Heartbeat, NullHeartbeat } from "@util/heartbeat"
import cliProgress from "cli-progress"

class CliHeartbeat implements Heartbeat {
  private lastMark = 0

  constructor(private bar: cliProgress.SingleBar | null) {}

  tick(mark: number, _total: number): void {
    if (this.bar == null) return
    if (mark > this.lastMark) {
      this.bar.update(mark)
      this.lastMark = mark
    }
  }
}

export class LoadProgress {
  private readonly parent: cliProgress.MultiBar | null = null
  private bar: cliProgress.SingleBar | null = null
  private readonly hb: Heartbeat | null = null

  constructor(p: cliProgress.MultiBar | null, msg: string) {
    if (p == null) return
    this.parent = p
    this.bar = p.create(
      100,
      0,
      { msg },
      {
        format: " {msg}",
        barCompleteChar: "",
        barIncompleteChar: "",
      },
    ) as cliProgress.SingleBar
    this.hb = new CliHeartbeat(this.bar)
  }

  heartbeat(): Heartbeat {
    return this.hb ?? new NullHeartbeat()
  }

  finish(): void {
    if (this.bar == null || this.parent == null) return
    this.bar.update(100)
    this.parent.remove(this.bar)
    this.bar = null
  }
}

export class FileProgress {
  private readonly parent: cliProgress.MultiBar | null = null
  private bar: cliProgress.SingleBar | null = null
  private readonly hb: Heartbeat | null = null
  private length = 0

  constructor(p: cliProgress.MultiBar | null, name: string, maxLen: number) {
    if (p == null) return
    this.parent = p
    const padded = name.padEnd(maxLen)
    this.bar = p.create(
      100,
      0,
      { filename: padded },
      {
        format: " {filename} º {bar} º {percentage}%",
        barCompleteChar: "-",
        barIncompleteChar: " ",
      },
    ) as cliProgress.SingleBar
    this.hb = new CliHeartbeat(this.bar)
  }

  heartbeat(): Heartbeat {
    return this.hb ?? new NullHeartbeat()
  }

  setLength(length: number): void {
    if (this.bar == null) return
    this.length = length
    this.bar.setTotal(length)
  }

  success(): void {
    if (this.bar == null || this.parent == null) return
    this.bar.update(1 + this.length)
    this.parent.remove(this.bar)
    this.bar = null
  }

  fail(): void {
    if (this.bar == null || this.parent == null) return
    this.parent.remove(this.bar)
    this.bar = null
  }
}

// noinspection JSUnusedGlobalSymbols
export class ProgressUI {
  private readonly p: cliProgress.MultiBar | null = null
  private readonly files: cliProgress.SingleBar | null = null

  constructor(total: number, maxNameLen: number, quiet: boolean) {
    if (quiet) return
    // const barWidth = Math.max(
    //   10,
    //   (process.stderr.columns || 80) - maxNameLen - 16,
    // )
    const pad = " ".repeat(maxNameLen + 3)
    this.p = new cliProgress.MultiBar({
      barCompleteChar: ".",
      barIncompleteChar: " ",
      hideCursor: true,
    })
    this.files = this.p.create(
      total,
      0,
      { pad },
      {
        format: "{value}/{total} {bar}",
        // barsize: barWidth,
      },
    ) as cliProgress.SingleBar
  }

  loading(msg: string): LoadProgress {
    if (this.p == null) return new LoadProgress(null, msg)
    return new LoadProgress(this.p, msg)
  }

  addFile(name: string, maxLen: number): FileProgress {
    if (this.p == null) return new FileProgress(null, name, maxLen)
    return new FileProgress(this.p, name, maxLen)
  }

  incFiles(): void {
    if (this.files == null) return
    this.files.increment()
  }

  finish(): void {
    if (this.p == null || this.files == null) return
    this.p.remove(this.files)
    this.p.stop()
  }
}
