import { readFile } from "node:fs/promises"
import path from "node:path"
import { loadGrammar, parseInput } from "@api"
import { grammarSummary } from "@peg"
import { treeToJSONStr } from "@trees"
import { newCfg } from "@util"
import { asjsons } from "@util/asjson"
import type { OutputItem, OutputSet } from "./lib"
import { ProgressUI } from "./progress"

export async function cmdRun(
  grammarPath: string,
  inputPaths: string[],
  options: {
    json?: boolean
    start?: string
    trace?: boolean
    colorize?: boolean
    quiet?: boolean
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
  const prog = new ProgressUI(inputPaths.length, maxNameLen, quiet)
  const loader = prog.loading("loading grammar")
  cfg.heartbeat = loader.heartbeat()
  const g = await loadGrammar(grammarPath, cfg)
  loader.finish()

  let errcount = 0
  for (const inputPath of inputPaths) {
    const fName = path.basename(inputPath)
    const fp = prog.addFile(fName, maxNameLen)

    try {
      const data = await readFile(inputPath, "utf-8")
      fp.setLength(data.length)

      cfg.heartbeat = fp.heartbeat()
      cfg.source = inputPath

      const tree = parseInput(g, data, cfg)
      prog.incFiles()

      fp.success()
      outputs.push({
        name: fName,
        payload: treeToJSONStr(tree),
      })
    } catch (e: unknown) {
      errcount++
      prog.incFiles()
      fp.fail()
      console.error(`Error: ${inputPath}: ${(e as Error).message}`)
    }
  }

  prog.finish()

  console.error(
    `Parsed ${inputPaths.length} files  ${outputs.length} passed  ${errcount} errors`,
  )
  return { lang: "json", outputs }
}
