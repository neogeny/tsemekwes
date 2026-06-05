import { stat } from "node:fs/promises"
import { availableParallelism } from "node:os"
import path from "node:path"
import { Worker } from "node:worker_threads"
import { loadGrammar } from "@api"
import type { Cfg } from "@config"
import { newCfg, readStdin } from "@util"
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

async function getCompressedGrammarPayload(
  grammarPath: string,
  cfg: Cfg,
): Promise<Uint8Array> {
  const grammar = await loadGrammar(grammarPath, cfg)
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
  const loader = prog.loading("loading grammar...")
  cfg.heartbeat = loader.heartbeat()
  const grammarJson = await getCompressedGrammarPayload(grammarPath, cfg)
  loader.finish()

  const maxWorkers = (options.nproc ?? 0) || availableParallelism() || 8
  const sem = new Semaphore(maxWorkers)
  const outputs: OutputItem[] = []
  let errcount = 0

  const workers = Array.from(
    { length: maxWorkers },
    () =>
      new Worker(new URL("./parse-worker.ts", import.meta.url), {
        workerData: {
          grammarJson,
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
  let nextFileId = 0

  for (const w of workers) {
    w.on("message", (msg: WorkerMessage) => {
      if (msg.type === "heartbeat") {
        const entry = pending.get(msg.fileId)
        if (!entry) return
        entry.fp.heartbeat().tick(msg.mark, msg.total)
        return
      }
      if (msg.type !== "result") return
      const entry = pending.get(msg.fileId)
      if (!entry) return
      pending.delete(msg.fileId)
      entry.resolve(msg)
    })
  }

  await Promise.all(
    inputPaths.map(async (inputPath) => {
      await sem.acquire()
      const fName = path.basename(inputPath)
      const fp = prog.addFile(fName, maxNameLen)

      const fileId = nextFileId++
      const postMsg: Record<string, unknown> = {
        type: "parse",
        fileId,
        inputPath,
      }

      if (inputPath === "-") {
        const text = await readStdin()
        fp.setLength(text.length)
        postMsg.text = text
      } else {
        const { size } = await stat(inputPath)
        fp.setLength(size)
      }

      const msg = await new Promise<WorkerMessage>((resolve) => {
        pending.set(fileId, { fp, resolve })
        workers[fileId % maxWorkers].postMessage(postMsg)
      })
      sem.release()

      if (msg.type !== "result") return
      if ("readError" in msg) {
        fp.fail()
        errcount++
        prog.incFiles()
        return
      }
      if ("parseError" in msg) {
        fp.fail()
        errcount++
        prog.incFiles()
        console.error(`Error: ${inputPath}: ${msg.error}`)
        return
      }
      fp.success()
      outputs.push({ name: msg.name, payload: msg.payload })
      prog.incFiles()
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
