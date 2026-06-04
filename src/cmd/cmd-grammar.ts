import {loadGrammar} from "@api";
import {grammarSummary} from "@peg";
import {newCfg} from "@util";
import {asjsons} from "@util/asjson";
import path from "node:path";
import {OutputSet} from "./lib";

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
    outputs: [{name: path.basename(grammarPath), payload}],
  }
}