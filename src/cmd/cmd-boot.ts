import { BundledLanguage } from "shiki"
import { bootGrammar } from "@json"
import { grammarSummary } from "@peg"
import { asjsons } from "@util/asjson"
import { OutputSet } from "./lib"

export async function cmdBoot(options: {
  json?: boolean
  pretty?: boolean
  colorize?: boolean
  output?: string
}): Promise<OutputSet> {
  const g = bootGrammar()

  let payload: string
  let lang: BundledLanguage
  if (options.json) {
    payload = asjsons(g)
    lang = "json" as BundledLanguage
  } else if (options.pretty) {
    payload = g.pretty()
    lang = "asciidoc"
  } else {
    payload = grammarSummary(g, options.colorize)
    lang = "json" as BundledLanguage
  }

  return { lang, outputs: [{ name: "boot", payload }] }
}
