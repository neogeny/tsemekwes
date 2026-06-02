#!/usr/bin/env node

import { Command, Help, Option } from "commander"
import pc from "picocolors"
import { getProjectGitVersion } from "@util"
import { cmdBoot, cmdGrammar, cmdInfo, cmdRun } from "./cmd"

const program = new Command()

process.env.FORCE_COLOR = "1"
const colors = pc.createColors(true) // Hard-forces colors, or use your auto/always flag logic

const baseHelp = new Help()
program.configureHelp({
  commandDescription: (cmd) => colors.dim(cmd.description()),
  optionDescription: (option) => colors.dim(option.description),

  // 2. Use the clean base instance here instead of the recursive 'helper'
  formatHelp: (cmd) => {
    const regularHelp = baseHelp.formatHelp(cmd, baseHelp)

    return regularHelp
      .replace(/^Usage:/gm, colors.bold(colors.cyan("Usage:")))
      .replace(/^Commands:/gm, colors.bold(colors.cyan("Commands:")))
      .replace(/^Options:/gm, colors.bold(colors.cyan("Options:")))
      .replace(/(-\w|--\w[\w-]+)/g, colors.yellow("$1"))
      .replace(/(<[^>]+>|\[[^\]]+])/g, colors.green("$1"))
  },
})

const colorOption = new Option(
  "-c, --color <when>",
  "control terminal color output",
)
  .choices(["auto", "always", "never"])
  .default("auto")

program
  .description("怪TōTetSu — PEG parser generator")
  .name("tote")
  .version(await getProjectGitVersion())
  .option("-o, --output <path>", "write output to file instead of stdout")
  .option("--trace", "display a detailed trace of the parsing process")
  .addOption(colorOption)

program
  .command("run <grammar> [inputs...]")
  .description("execute a grammar against one or more input files")
  .option("-j, --json", "output the parse tree in JSON format")
  .option("-s, --start <rule>", "name of the start rule", "start")
  .action(async (grammarPath, inputPaths, options, command) => {
    const parentOpts = command.parent?.opts?.() ?? {}
    const combinedOpts = { ...parentOpts, ...options }
    try {
      await cmdRun(grammarPath, inputPaths, combinedOpts)
    } catch (e) {
      console.error(`Error: ${(e as Error).message}`)
      process.exit(1)
    }
  })

program
  .command("boot")
  .description("the internal boot grammar")
  .option("-j, --json", "print the boot grammar in JSON format")
  .option("-p, --pretty", "pretty-print the boot grammar", true)
  .action(async (options) => {
    try {
      cmdBoot(options)
    } catch (e) {
      console.error(`Error: ${(e as Error).message}`)
      process.exit(1)
    }
  })

program
  .command("grammar <grammar-path>")
  .description("compile and inspect a grammar")
  .option("-j, --json", "print the grammar in JSON format")
  .option("-p, --pretty", "pretty-print the grammar (default)", true)
  .action(async (grammarPath, options, command) => {
    const parentOpts = command.parent?.opts?.() ?? {}
    const combinedOpts = { ...parentOpts, ...options }
    try {
      await cmdGrammar(grammarPath, combinedOpts)
    } catch (e) {
      console.error(`Error: ${(e as Error).message}`)
      process.exit(1)
    }
  })

program
  .command("info")
  .description("show feature implementation status")
  .action(() => {
    try {
      cmdInfo()
    } catch (e) {
      console.error(`Error: ${(e as Error).message}`)
      process.exit(1)
    }
  })

program.parse(process.argv)
