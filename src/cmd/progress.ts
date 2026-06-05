import { DeadHeart, type Heart } from "@util/heartbeat"
import cliProgress from "cli-progress"
import picocolors from "picocolors"

class ProgressHeart implements Heart {
  constructor(private bar: cliProgress.SingleBar | null) {}

  heartbeat(mark: number, total: number): void {
    if (this.bar == null) return
    this.bar.setTotal(total)
    this.bar.update(mark)
  }
}

export class LoadProgress {
  private readonly parent: cliProgress.MultiBar | null = null
  private bar: cliProgress.SingleBar | null = null
  private readonly hb: Heart | null = null

  constructor(p: cliProgress.MultiBar | null, msg: string, total: number) {
    if (p == null) return
    this.parent = p
    this.bar = p.create(
      total / 20,
      0,
      { msg },
      {
        format: " {msg} {bar}",
        barIncompleteChar: ".",
        barCompleteChar: "-",
      },
    ) as cliProgress.SingleBar
    this.hb = new ProgressHeart(this.bar)
    this.bar.render()
  }

  heart(): Heart {
    return this.hb ?? new DeadHeart()
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
  private readonly hb: Heart | null = null
  private length = 0

  constructor(p: cliProgress.MultiBar | null, name: string, maxLen: number) {
    if (p == null) return
    this.parent = p
    const padded = name.padEnd(maxLen)
    const pc = picocolors.createColors(true)
    this.bar = p.create(
      100,
      0,
      { filename: padded },
      {
        format: " {filename} º {bar} º {percentage}%",
        barCompleteString: `${pc.green("─")}${pc.reset("")}`,
        barCompleteChar: "⎯",
        barIncompleteChar: " ",
      },
    ) as cliProgress.SingleBar
    this.hb = new ProgressHeart(this.bar)
  }

  heart(): Heart {
    return this.hb ?? new DeadHeart()
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
    const barWidth = Math.max(
      10,
      (process.stderr.columns || 80) - maxNameLen - 16,
    )
    const pad = " ".repeat(maxNameLen + 3)
    this.p = new cliProgress.MultiBar({
      barCompleteChar: ".",
      barIncompleteChar: " ",
      hideCursor: true,
      clearOnComplete: true,
      stopOnComplete: true,
    })
    this.files = this.p.create(
      total,
      0,
      { pad },
      {
        format: "{value}/{total} {bar}º",
        barsize: barWidth,
        hideCursor: true,
        barCompleteChar: ".",
        barIncompleteChar: " ",
        clearOnComplete: true,
      },
    ) as cliProgress.SingleBar
  }

  loading(msg: string, total: number): LoadProgress {
    if (this.p == null) {
      throw Error("CANT'T HAPPEN")
    }
    return new LoadProgress(this.p, msg, total)
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
    this.p.stop()
    this.p.remove(this.files)
  }
}
