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
