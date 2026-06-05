import { readFile } from "node:fs/promises"
import path from "node:path"
import { parentPort, workerData } from "node:worker_threads"
import { loadGrammar, parseInput } from "@api"
import { defaultCfg } from "@config"
import { treeToJSONStr } from "@trees"

const grammar = await loadGrammar(workerData.grammarPath as string)

const baseCfg = defaultCfg()
baseCfg.start = (workerData.start as string | undefined) ?? baseCfg.start
baseCfg.trace = (workerData.trace as boolean | undefined) ?? baseCfg.trace

parentPort?.on("message", async (msg) => {
  const { fileId, inputPath } = msg as { fileId: number; inputPath: string }

  let data: string
  if (msg.text !== undefined) {
    data = msg.text as string
  } else {
    try {
      data = await readFile(inputPath, "utf-8")
    } catch {
      parentPort?.postMessage({ type: "result", fileId, readError: true })
      return
    }
  }

  const fileCfg = baseCfg.override({
    heartbeat: {
      tick: (mark: number, total: number) => {
        parentPort?.postMessage({ type: "heartbeat", fileId, mark, total })
      },
    },
    source: inputPath,
  })

  try {
    const tree = parseInput(grammar, data, fileCfg)
    parentPort?.postMessage({
      type: "result",
      fileId,
      name: path.basename(inputPath),
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
