import path from "node:path"
import { loadGrammarFromPath } from "@api"
import { grammarSummary } from "@peg"
import { newCfg } from "@util"
import { asjsons } from "@util/asjson"
import type { BundledLanguage } from "shiki"
import type { OutputSet } from "./lib"

export async function cmdGrammar(
  grammarPath: string,
  options: {
    json?: boolean
    pretty?: boolean
    trace?: boolean
    colorize?: boolean
  },
): Promise<OutputSet> {
  const cfg = newCfg(options)
  cfg.source = grammarPath
  const [_, g] = await loadGrammarFromPath(grammarPath, cfg)

  let payload: string
  let lang: BundledLanguage
  if (options.json) {
    payload = asjsons(g)
    lang = "json" as BundledLanguage
  } else if (options.pretty) {
    payload = g.pretty()
    lang = "asciidoc" as BundledLanguage
  } else {
    payload = grammarSummary(g, options.colorize)
    lang = "json" as BundledLanguage
  }

  return {
    lang,
    outputs: [{ name: path.basename(grammarPath), payload }],
  }
}
