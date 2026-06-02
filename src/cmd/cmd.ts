import { loadGrammar, parseInput } from "@api"
import { bootGrammar } from "@json"
import { newCfg, readText } from "@util/helpers"
import { asjsonStr } from "@util/asjson"
import { treeToJSONStr } from "@trees"

export async function cmdRun(
  grammarPath: string,
  inputPaths: string[],
  options: { json?: boolean; start?: string; trace?: boolean },
): Promise<void> {
  const cfg = newCfg(options)
  const g = await loadGrammar(grammarPath, cfg)

  if (inputPaths.length === 0) {
    if (options.json) {
      console.log(asjsonStr(g))
    } else {
      console.log(`Compiled grammar: ${g.name}`)
      console.log(`  rules: ${g.rules.length}`)
      for (const r of g.rules) console.log(`  - ${r.name}`)
    }
    return
  }

  const results: {
    file: string
    ok: boolean
    data?: string
    error?: string
  }[] = []
  for (const inputPath of inputPaths) {
    try {
      const inputText = await readText(inputPath)
      const tree = parseInput(g, inputText, cfg)
      results.push({
        file: inputPath,
        ok: true,
        data: treeToJSONStr(tree),
      })
    } catch (e: unknown) {
      results.push({
        file: inputPath,
        ok: false,
        error: (e as Error).message,
      })
    }
  }

  if (options.json) {
    console.log(JSON.stringify(results, null, 2))
  } else {
    let passed = 0
    let errors = 0
    for (const r of results) {
      if (r.ok) {
        passed++
        console.log(r.data)
      } else {
        errors++
        console.error(`Error: ${r.file}: ${r.error}`)
      }
    }
    console.error(
      `Parsed ${results.length} files  ${passed} passed  ${errors} errors`,
    )
  }
}

export function cmdBoot(options: { json?: boolean; pretty?: boolean }): void {
  const g = bootGrammar()
  if (options.json) {
    console.log(asjsonStr(g))
  } else {
    console.log(`Boot grammar: ${g.name}`)
    console.log(`  rules: ${g.rules.length}`)
    console.log(`  directives: ${g.directives.length}`)
    console.log(`  keywords: ${g.keywords.length}`)
    for (const d of g.directives) console.log(`  @${d[0]} :: ${d[1]}`)
  }
}

export async function cmdGrammar(
  grammarPath: string,
  options: { json?: boolean; pretty?: boolean; trace?: boolean },
): Promise<void> {
  const cfg = newCfg(options)
  cfg.source = grammarPath
  const g = await loadGrammar(grammarPath, cfg)

  if (options.json) {
    console.log(asjsonStr(g))
  } else {
    console.log(`Grammar: ${g.name}`)
    console.log(`  rules: ${g.rules.length}`)
    for (const r of g.rules) {
      const deco =
        r.decorators.length > 0 ? ` [${r.decorators.join(", ")}]` : ""
      console.log(`  - ${r.name}${deco}`)
    }
    if (g.directives.length > 0) {
      console.log(`  directives:`)
      for (const d of g.directives) console.log(`    ${d[0]} = ${d[1]}`)
    }
    if (g.keywords.length > 0)
      console.log(`  keywords: ${g.keywords.join(", ")}`)
  }
}

export function cmdInfo(): void {
  const features = [
    ["API function", "Status", "Depends on"],
    ["───", "───", "───"],
    ["bootGrammar", "✅ done", "boot grammar JSON + link"],
    ["loadGrammarFromJSON", "✅ done", "JSON → Grammar deserialization"],
    ["parseInput", "✅ done", "Grammar.parseAt() used directly"],
    ["parseGrammar", "✅ done", "boot grammar + fold + compileGrammar"],
    ["compile", "✅ done", "parseGrammar + Grammar.initialize()"],
    ["parse", "✅ done", "compile + parseInput"],
    ["grammarToJSON", "❌ stub", "Grammar.toJSON()"],
    ["grammarPretty", "❌ stub", "Grammar.prettyPrint()"],
  ]
  console.log("TS’emekwes v0.0.0 — Feature Status\n")
  for (const row of features) {
    console.log(`  ${row[0].padEnd(25)} ${row[1].padEnd(12)} ${row[2]}`)
  }
  console.log("\nUse `emekwes <command> --help` for command details.")
}
