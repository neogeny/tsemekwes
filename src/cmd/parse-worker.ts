import { readFile } from "node:fs/promises"
import path from "node:path"
import { parentPort, workerData } from "node:worker_threads"
import { loadGrammarFromJSON, parseInput } from "@api"
import { defaultCfg } from "@config"
import { treeToJSONStr } from "@trees"
import { decompress } from "@util/compress"

async function loadGrammarFromCompressed() {
  const json = await decompress(workerData.grammarJson as Uint8Array)
  return loadGrammarFromJSON(json)
}

const grammar = await loadGrammarFromCompressed()

const baseCfg = defaultCfg()
baseCfg.start = (workerData.start as string | undefined) ?? baseCfg.start
baseCfg.trace = (workerData.trace as boolean | undefined) ?? baseCfg.trace

parentPort?.on("message", async (msg) => {
  const { fileId, inputPath } = msg as { fileId: number; inputPath: string }

  let text: string
  if (msg.text !== undefined) {
    text = msg.text as string
  } else {
    try {
      text = await readFile(inputPath, "utf-8")
    } catch {
      parentPort?.postMessage({ type: "result", fileId, readError: true })
      return
    }
  }

  const fileCfg = baseCfg.merge({
    heart: {
      heartbeat: (mark: number, total: number) => {
        parentPort?.postMessage({ type: "heartbeat", fileId, mark, total })
      },
    },
    source: inputPath,
  })

  try {
    const tree = parseInput(grammar, text, fileCfg)
    parentPort?.postMessage({
      type: "result",
      fileId,
      name: path.basename(inputPath),
      text: text,
      payload: treeToJSONStr(tree),
    })
  } catch (e) {
    parentPort?.postMessage({
      type: "result",
      fileId,
      parseError: true,
      error: (e as Error).message,
    })
  }
})
