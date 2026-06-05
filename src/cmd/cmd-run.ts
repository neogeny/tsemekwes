import { readFile } from "node:fs/promises"
import { availableParallelism } from "node:os"
import path from "node:path"
import { loadGrammar, parseInput } from "@api"
import { grammarSummary } from "@peg"
import { treeToJSONStr } from "@trees"
import { newCfg } from "@util"
import { asjsons } from "@util/asjson"
import color from "picocolors"
import type { OutputItem, OutputSet } from "./lib"
import { Semaphore } from "./lib"
import type { ProgressUI } from "./progress"
import { ProgressUI as UI } from "./progress"

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
  const quiet = options.quiet ?? false
  const cfg = newCfg(options)
  const outputs: OutputItem[] = []

  if (inputPaths.length === 0) {
    const g = await loadGrammar(grammarPath, cfg)
    if (options.json) {
      outputs.push({ name: path.basename(grammarPath), payload: asjsons(g) })
      return { lang: "json", outputs }
    }
    outputs.push({
      name: path.basename(grammarPath),
      payload: grammarSummary(g, options.colorize),
    })
    return { lang: "json", outputs }
  }

  const maxNameLen = inputPaths.reduce(
    (m, p) => Math.max(m, path.basename(p).length),
    0,
  )
  const prog: ProgressUI = new UI(inputPaths.length, maxNameLen, quiet)
  const loader = prog.loading("loading grammar")
  cfg.heartbeat = loader.heartbeat()
  const g = await loadGrammar(grammarPath, cfg)
  loader.finish()

  const maxWorkers = (options.nproc ?? 0) || availableParallelism() || 4
  const sem = new Semaphore(maxWorkers)

  const results = await Promise.all(
    inputPaths.map(async (inputPath) => {
      await sem.acquire()
      const fName = path.basename(inputPath)
      const fp = prog.addFile(fName, maxNameLen)
      try {
        const data = await readFile(inputPath, "utf-8")
        fp.setLength(data.length)
        const fileCfg = cfg.override({
          heartbeat: fp.heartbeat(),
          source: inputPath,
        })
        const tree = parseInput(g, data, fileCfg)
        prog.incFiles()
        fp.success()
        return { name: fName, payload: treeToJSONStr(tree) }
      } catch (e: unknown) {
        prog.incFiles()
        fp.fail()
        console.error(`Error: ${inputPath}: ${(e as Error).message}`)
        return null
      } finally {
        sem.release()
      }
    }),
  )
  prog.finish()

  let errcount = 0
  for (const r of results) {
    if (r) {
      outputs.push(r)
    } else {
      errcount++
    }
  }

  const pc = color.createColors(options.colorize ?? true)
  console.error(
    `${pc.whiteBright(`Parsed`)} ${pc.cyanBright(`${inputPaths.length} files`)}` +
      ` ${pc.green(`${outputs.length} passed`)}` +
      ` ${pc.red(`${errcount} errors`)}`,
  )
  return { lang: "json", outputs }
}
