import { stat } from "node:fs/promises"
import { availableParallelism } from "node:os"
import path from "node:path"
import { Worker } from "node:worker_threads"
import { loadGrammarFromPath } from "@api"
import type { Cfg } from "@config"
import { countLines, newCfg } from "@util"
import { asjsons } from "@util/asjson"
import { compress } from "@util/compress"
import color from "picocolors"
import type { OutputItem, OutputSet } from "./lib"
import { Semaphore } from "./lib"
import type { FileProgress, LoadProgress, ProgressUI } from "./progress"
import { ProgressUI as UI } from "./progress"

type WorkerMessage =
  | { type: "heartbeat"; fileId: number; mark: number; total: number }
  | { type: "result"; fileId: number; readError: true }
  | { type: "result"; fileId: number; parseError: true; error: string }
  | {
      type: "result"
      fileId: number
      name: string
      text: string
      payload: string
    }

async function loadGrammarFromPathToCompressed(
  path: string,
  cfg: Cfg,
): Promise<[string, Uint8Array]> {
  const [text, grammar] = await loadGrammarFromPath(path, cfg)
  return [text, await compress(asjsons(grammar))]
}

export async function cmdRun(
  grammarPath: string,
  inputPaths: string[],
  options: {
    json?: boolean
    start?: string
    trace?: boolean
    colorize?: boolean
    quiet?: boolean
    nproc?: number
  },
): Promise<OutputSet> {
  const pc = color.createColors(options.colorize ?? true)
  const quiet = options.quiet ?? false
  const cfg = newCfg(options)
  const maxNameLen = inputPaths.reduce(
    (m, p) => Math.max(m, path.basename(p).length),
    0,
  )
  const prog: ProgressUI | undefined = quiet
    ? undefined
    : new UI(inputPaths.length, maxNameLen, quiet)

  const { size } = await stat(grammarPath)
  let loadCfg: Cfg = cfg
  let ldprog: LoadProgress | undefined
  if (prog) {
    ldprog = prog.loading("loading grammar", size)
    loadCfg = cfg.merge({ heart: ldprog.heart() })
  }
  const [_, grammarPalyload] = await loadGrammarFromPathToCompressed(
    grammarPath,
    loadCfg,
  )
  if (ldprog) {
    ldprog.finish()
  }

  const maxWorkers = (options.nproc ?? 0) || availableParallelism() || 8
  const workers = Array.from(
    { length: maxWorkers },
    () =>
      new Worker(new URL("cmd/parse-worker.js", import.meta.url), {
        workerData: {
          grammarJson: grammarPalyload,
          start: options.start,
          trace: options.trace,
        },
      }),
  )

  const pending = new Map<
    number,
    { fp: FileProgress | null; resolve: (msg: WorkerMessage) => void }
  >()

  for (const w of workers) {
    w.on("message", (msg: WorkerMessage) => {
      if (msg.type === "heartbeat") {
        const entry = pending.get(msg.fileId)
        if (!entry) return
        if (entry.fp !== null) {
          entry.fp.heart().heartbeat(msg.mark, msg.total)
        }
        return
      }
      if (msg.type !== "result") return
      const entry = pending.get(msg.fileId)
      if (!entry) return
      pending.delete(msg.fileId)
      entry.resolve(msg)
    })
  }

  const startTime = Date.now()
  const outputs: OutputItem[] = []
  const sem = new Semaphore(maxWorkers)
  let nextFileId = 0
  let errcount = 0
  let sloc = 0
  await Promise.all(
    inputPaths.map(async (inputPath) => {
      const fileId = nextFileId++
      const fName = path.basename(inputPath)

      await sem.acquire()
      const fp = prog ? prog.addFile(fName, maxNameLen) : null
      if (fp) {
        fp.setLength(size)
      }

      const postMsg: Record<string, unknown> = {
        type: "parse",
        fileId,
        inputPath,
      }
      const msg = await new Promise<WorkerMessage>((resolve) => {
        pending.set(fileId, { fp, resolve })
        workers[fileId % maxWorkers].postMessage(postMsg)
      })
      try {
        if (msg.type !== "result") return
        if (prog) {
          prog.incFiles()
        }
        if ("readError" in msg) {
          if (fp) {
            fp.fail()
          }
          errcount++
          return
        }
        if ("parseError" in msg) {
          if (fp) {
            fp.fail()
          }
          errcount++
          console.error(`Error: ${inputPath}: ${msg.error}`)
          return
        }
        if (fp) {
          fp.success()
        }
        outputs.push({ name: msg.name, payload: msg.payload })
        sloc += countLines(msg.text).code
      } finally {
        sem.release()
      }
    }),
  )

  await Promise.all(workers.map((w) => w.terminate()))
  if (prog) {
    prog.finish()
  }

  const elapsed = (Date.now() - startTime) / 1000
  const slocPerSec = elapsed > 0 ? (sloc / elapsed).toFixed(0) : "0"
  if (!quiet) {
    console.error(
      `${pc.whiteBright(`Parsed`)} ${pc.cyanBright(`${inputPaths.length} files`)}` +
        ` ${pc.green(`${outputs.length} passed`)}` +
        ` ${pc.red(`${errcount} errors`)}` +
        ` ${pc.gray(`${sloc} sloc`)} ${pc.gray(`${slocPerSec} sloc/s`)}`,
    )
  }
  return { lang: "json", outputs }
}
