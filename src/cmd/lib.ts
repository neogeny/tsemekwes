import fs from "node:fs"
import path from "node:path"
import { codeToANSI } from "@shikijs/cli"
import type { BundledLanguage } from "shiki"

export const modeStdout = 0
export const modeFile = 1
export const modeDir = 2

export interface OutputItem {
  name: string
  payload: string
}

export interface OutputSet {
  lang: BundledLanguage
  outputs: OutputItem[]
}

export function outputMode(output: string): number {
  if (!output || output === "-") return modeStdout
  try {
    const stat = fs.statSync(output)
    if (stat.isDirectory()) return modeDir
    return modeFile
  } catch {
    // path doesn't exist
  }
  if (!path.extname(output)) return modeDir
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

export async function writeOutput(
  out: OutputSet,
  options: {
    colorize: boolean
    output?: string
  },
): Promise<void> {
  const { output, colorize } = options
  const outputpath = output ?? "-"
  switch (outputMode(outputpath)) {
    case modeStdout:
      for (const o of out.outputs) {
        const payload = colorize
          ? await codeToANSI(o.payload, out.lang, "nord")
          : o.payload
        console.log(payload)
      }
      break
    case modeFile:
      fs.writeFileSync(outputpath, joinOutputs(out.outputs), "utf-8")
      break
    case modeDir: {
      const ext = langExt(out.lang)
      fs.mkdirSync(outputpath, { recursive: true })
      for (const o of out.outputs) {
        const name = replaceExt(o.name, ext)
        const outPath = path.join(outputpath, name)
        fs.writeFileSync(outPath, o.payload, "utf-8")
      }
      break
    }
  }
}
