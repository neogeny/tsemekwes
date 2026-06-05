import { stat } from "node:fs/promises"
import { availableParallelism } from "node:os"
import path from "node:path"
import { Worker } from "node:worker_threads"
import { loadGrammarFromPath } from "@api"
import type { Cfg } from "@config"
import { newCfg } from "@util"
import { asjsons } from "@util/asjson"
import { compress } from "@util/compress"
import color from "picocolors"
import type { OutputItem, OutputSet } from "./lib"
import { Semaphore } from "./lib"
import type { ProgressUI } from "./progress"
import { ProgressUI as UI } from "./progress"

type WorkerMessage =
  | { type: "heartbeat"; fileId: number; mark: number; total: number }
  | { type: "result"; fileId: number; readError: true }
  | { type: "result"; fileId: number; parseError: true; error: string }
  | { type: "result"; fileId: number; name: string; payload: string }

async function loadGrammarFromPathToCompressed(
  grammarPath: string,
  cfg: Cfg,
): Promise<Uint8Array> {
  const grammar = await loadGrammarFromPath(grammarPath, cfg)
  return compress(asjsons(grammar))
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
  const prog: ProgressUI = new UI(inputPaths.length, maxNameLen, quiet)

  const { size } = await stat(grammarPath)
  const ldprog = prog.loading("loading grammar", size)
  const loadCfg = cfg.merge({ heart: ldprog.heart() })
  const grammarPalyload = await loadGrammarFromPathToCompressed(
    grammarPath,
    loadCfg,
  )
  ldprog.finish()

  const maxWorkers = (options.nproc ?? 0) || availableParallelism() || 8
  const workers = Array.from(
    { length: maxWorkers },
    () =>
      new Worker(new URL("./parse-worker.ts", import.meta.url), {
        workerData: {
          grammarJson: grammarPalyload,
          start: options.start,
          trace: options.trace,
        },
      }),
  )

  type FileProgress = ReturnType<typeof prog.addFile>
  const pending = new Map<
    number,
    { fp: FileProgress; resolve: (msg: WorkerMessage) => void }
  >()

  for (const w of workers) {
    w.on("message", (msg: WorkerMessage) => {
      if (msg.type === "heartbeat") {
        const entry = pending.get(msg.fileId)
        if (!entry) return
        entry.fp.heart().heartbeat(msg.mark, msg.total)
        return
      }
      if (msg.type !== "result") return
      const entry = pending.get(msg.fileId)
      if (!entry) return
      pending.delete(msg.fileId)
      entry.resolve(msg)
    })
  }

  const outputs: OutputItem[] = []
  const sem = new Semaphore(maxWorkers)
  let nextFileId = 0
  let errcount = 0
  await Promise.all(
    inputPaths.map(async (inputPath) => {
      const fileId = nextFileId++
      const fName = path.basename(inputPath)
      const { size } = await stat(inputPath)

      await sem.acquire()
      const fp = prog.addFile(fName, maxNameLen)
      fp.setLength(size)

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
        prog.incFiles()
        if ("readError" in msg) {
          fp.fail()
          errcount++
          return
        }
        if ("parseError" in msg) {
          fp.fail()
          errcount++
          console.error(`Error: ${inputPath}: ${msg.error}`)
          return
        }
        fp.success()
        outputs.push({ name: msg.name, payload: msg.payload })
      } finally {
        sem.release()
      }
    }),
  )

  await Promise.all(workers.map((w) => w.terminate()))
  prog.finish()

  console.error(
    `${pc.whiteBright(`Parsed`)} ${pc.cyanBright(`${inputPaths.length} files`)}` +
      ` ${pc.green(`${outputs.length} passed`)}` +
      ` ${pc.red(`${errcount} errors`)}`,
  )
  return { lang: "json", outputs }
}
