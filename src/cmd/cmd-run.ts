import { loadGrammar, parseInput } from "@api"
import { grammarSummary } from "@peg"
import { treeToJSONStr } from "@trees"
import { newCfg, readText } from "@util"
import { asjsons } from "@util/asjson"
import path from "node:path"
import { OutputItem, OutputSet } from "./lib"

export async function cmdRun(
  grammarPath: string,
  inputPaths: string[],
  options: {
    json?: boolean
    start?: string
    trace?: boolean
    colorize?: boolean
  },
): Promise<OutputSet> {
  const cfg = newCfg(options)
  const g = await loadGrammar(grammarPath, cfg)
  const outputs: OutputItem[] = []

  if (inputPaths.length === 0) {
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

  let errcount = 0
  for (const inputPath of inputPaths) {
    try {
      const inputText = await readText(inputPath)
      const tree = parseInput(g, inputText, cfg)
      outputs.push({
        name: path.basename(inputPath),
        payload: treeToJSONStr(tree),
      })
    } catch (e: unknown) {
      errcount++
      console.error(`Error: ${inputPath}: ${(e as Error).message}`)
    }
  }

  console.error(
    `Parsed ${inputPaths.length} files  ${outputs.length} passed  ${errcount} errors`,
  )
  return { lang: "json", outputs }
}
