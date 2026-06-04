import { loadGrammar, parseInput } from "@api"
import { bootGrammar } from "@json"
import { newCfg, readText } from "@util/helpers"
import { asjsons } from "@util/asjson"
import { treeToJSONStr } from "@trees"
import { grammarSummary } from "@peg"
import path from "node:path"
import fs from "node:fs"

export interface OutputItem {
  name: string
  payload: string
}

const modeStdout = 0
const modeFile = 1
const modeDir = 2

function outputMode(outputPath: string): number {
  if (!outputPath || outputPath === "-") return modeStdout
  try {
    const stat = fs.statSync(outputPath)
    if (stat.isDirectory()) return modeDir
    return modeFile
  } catch {
    // path doesn't exist
  }
  if (!path.extname(outputPath)) return modeDir
  return modeFile
}

function langExt(lang: string): string {
  switch (lang) {
    case "json":
      return ".json"
    default:
      return ".txt"
  }
}

function replaceExt(name: string, newExt: string): string {
  const old = path.extname(name)
  if (old) name = name.slice(0, -old.length)
  return name + newExt
}

function joinOutputs(outputs: OutputItem[]): string {
  return outputs.map((o) => o.payload).join("\n")
}

export function writeOutputs(
  lang: string,
  outputs: OutputItem[],
  outputPath: string,
): void {
  switch (outputMode(outputPath)) {
    case modeStdout:
      for (const o of outputs) console.log(o.payload)
      break
    case modeFile:
      fs.writeFileSync(outputPath, joinOutputs(outputs), "utf-8")
      break
    case modeDir: {
      const ext = langExt(lang)
      fs.mkdirSync(outputPath, { recursive: true })
      for (const o of outputs) {
        const name = replaceExt(o.name, ext)
        const outPath = path.join(outputPath, name)
        fs.writeFileSync(outPath, o.payload, "utf-8")
      }
      break
    }
  }
}

export async function cmdRun(
  grammarPath: string,
  inputPaths: string[],
  options: {
    json?: boolean
    start?: string
    trace?: boolean
    colorize?: boolean
  },
): Promise<{ lang: string; outputs: OutputItem[] }> {
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

export async function cmdBoot(options: {
  json?: boolean
  pretty?: boolean
  colorize?: boolean
  output?: string
}): Promise<{ lang: string; outputs: OutputItem[] }> {
  const g = bootGrammar()

  let payload: string
  let lang: string
  if (options.json) {
    payload = asjsons(g)
    lang = "json"
  } else if (options.pretty) {
    payload = g.pretty()
    lang = "txt"
  } else {
    payload = grammarSummary(g, options.colorize)
    lang = "json"
  }

  return { lang, outputs: [{ name: "boot", payload }] }
}

export async function cmdGrammar(
  grammarPath: string,
  options: {
    json?: boolean
    pretty?: boolean
    trace?: boolean
    colorize?: boolean
  },
): Promise<{ lang: string; outputs: OutputItem[] }> {
  const cfg = newCfg(options)
  cfg.source = grammarPath
  const g = await loadGrammar(grammarPath, cfg)

  let payload: string
  let lang: string
  if (options.json) {
    payload = asjsons(g)
    lang = "json"
  } else if (options.pretty) {
    payload = g.pretty()
    lang = "txt"
  } else {
    payload = grammarSummary(g, options.colorize)
    lang = "json"
  }

  return {
    lang,
    outputs: [{ name: path.basename(grammarPath), payload }],
  }
}

export function cmdInfo(): void {
  const features = [
    ["API function", "Status", "Depends on"],
    ["───", "───", "───"],
    ["bootGrammar", "done", "boot grammar JSON + link"],
    ["loadGrammarFromJSON", "done", "JSON  Grammar deserialization"],
    ["parseInput", "done", "Grammar.parseAt() used directly"],
    ["parseGrammar", "done", "boot grammar + fold + compileGrammar"],
    ["compile", "done", "parseGrammar + Grammar.initialize()"],
    ["parse", "done", "compile + parseInput"],
    ["grammarToJSON", "stub", "Grammar.toJSON()"],
    ["grammarPretty", "done", "Grammar.pretty()"],
  ]
  console.log("TS\u2019emekwes v0.0.0 \u2014 Feature Status\n")
  for (const row of features) {
    console.log(`  ${row[0].padEnd(25)} ${row[1].padEnd(12)} ${row[2]}`)
  }
  console.log("\nUse `emekwes <command> --help` for command details.")
}
