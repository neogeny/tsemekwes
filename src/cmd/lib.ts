import fs from "node:fs"
import path from "node:path"

export const modeStdout = 0
export const modeFile = 1
export const modeDir = 2

export interface OutputItem {
  name: string
  payload: string
}

export interface OutputSet {
  lang: string
  outputs: OutputItem[]
}

export function outputMode(outputPath: string): number {
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

export function writeOutput(out: OutputSet, outputPath: string): void {
  switch (outputMode(outputPath)) {
    case modeStdout:
      for (const o of out.outputs) console.log(o.payload)
      break
    case modeFile:
      fs.writeFileSync(outputPath, joinOutputs(out.outputs), "utf-8")
      break
    case modeDir: {
      const ext = langExt(out.lang)
      fs.mkdirSync(outputPath, { recursive: true })
      for (const o of out.outputs) {
        const name = replaceExt(o.name, ext)
        const outPath = path.join(outputPath, name)
        fs.writeFileSync(outPath, o.payload, "utf-8")
      }
      break
    }
  }
}
