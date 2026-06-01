#!/usr/bin/env node

import { Command } from "commander"
import { cmdBoot, cmdGrammar, cmdInfo, cmdRun } from "./cmd.js"

const program = new Command()

program
  .name("tote")
  .description("怪TōTetSu — PEG parser generator")
  .version("0.0.0")
  .option("-o, --output <path>", "write output to file instead of stdout")
  .option("--trace", "display a detailed trace of the parsing process")

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
