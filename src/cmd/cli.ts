#!/usr/bin/env node

import { Command, Help, Option } from "commander"
import picocolors from "picocolors"
import { getProjectGitVersion } from "@util"
import { cmdBoot, cmdGrammar, cmdInfo, cmdRun, writeOutputs } from "./cmd"

const program = new Command()

process.env.FORCE_COLOR = "1"
const pc = picocolors.createColors(true)

const baseHelp = new Help()
program.configureHelp({
  commandDescription: (cmd) => pc.dim(cmd.description()),
  optionDescription: (option) => pc.dim(option.description),

  // 2. Use the clean base instance here instead of the recursive 'helper'
  formatHelp: (cmd) => {
    const regularHelp = baseHelp.formatHelp(cmd, baseHelp)

    return regularHelp
        .replace(/(<[^>]+>|\[[^\]]+])/g, pc.green("$1"))
      .replace(/(-\w|--\w[\w-]+)/g, pc.yellow("$1"))
      .replace(/^Usage:/gm, pc.cyanBright("Usage:"))
      .replace(/^Commands:/gm, pc.cyanBright("Commands:"))
      .replace(/^Options:/gm, pc.cyanBright("Options:"))
  },
})

const colorOption = new Option(
  "-c, --color <when>",
  "control terminal color output",
)
  .choices(["auto", "always", "never"])
  .default("auto")

let gopts = {}
program
  .description("꘩TS’emekwes — A PEG parser generator for TypeScript")
  .name("emekwes")
  .version(await getProjectGitVersion())
  .option("-o, --output <path>", "write output to file instead of stdout")
  .option("--trace", "display a detailed trace of the parsing process")
  .addOption(colorOption)
  // .action((options, _command) => {
  //   const colorize =
  //     options.color === "always" ||
  //     (options.color === "auto" && !options.output && process.stdout.isTTY)
  //   gopts = { ...gopts, ...options, colorize }
  // })

program
  .command("run <grammar> [inputs...]")
  .description("execute a grammar against one or more input files")
  .option("-j, --json", "output the parse tree in JSON format")
  .option("-s, --start <rule>", "name of the start rule", "start")
  .action(async (grammar, inputs, options, _command) => {
    options = { ...gopts, ...options }
    const { lang, outputs } = await cmdRun(grammar, inputs, options)
    writeOutputs(lang, outputs, options.output ?? "")
  })

program
  .command("boot")
  .description("the internal boot grammar")
  .option("-j, --json", "print the boot grammar in JSON format")
  .option("-p, --pretty", "pretty-print the boot grammar", true)
  .action(async (options, _command) => {
    options = { ...gopts, ...options }
    const { lang, outputs } = await cmdBoot(options)
    writeOutputs(lang, outputs, options.output ?? "")
  })

program
  .command("grammar <grammar>")
  .description("compile and inspect a grammar")
  .option("-j, --json", "print the grammar in JSON format")
  .option("-p, --pretty", "pretty-print the grammar (default)", true)
  .action(async (grammar, options, _command) => {
    options = { ...gopts, ...options }
    const { lang, outputs } = await cmdGrammar(grammar, options)
    writeOutputs(lang, outputs, options.output ?? "")
  })

program
  .command("info")
  .description("show feature implementation status")
  .action(() => {
    cmdInfo()
  })

program.parse(process.argv)
