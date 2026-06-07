#!/usr/bin/env node

import { getProjectGitVersion } from "@util"
import { Command, Help, Option } from "commander"
import picocolors from "picocolors"
import { cmdBoot } from "./cmd-boot"
import { cmdGrammar } from "./cmd-grammar"
import { cmdInfo } from "./cmd-info"
import { cmdRun } from "./cmd-run"
import { writeOutput } from "./lib"

export async function cli_main() {
  const program = await command()
  await program.parseAsync(process.argv)
}

async function command(): Promise<Command> {
  const program = new Command()

  process.env.FORCE_COLOR = "1"
  const pc = picocolors.createColors(true)

  const baseHelp = new Help()
  baseHelp.showGlobalOptions = true
  program.configureHelp({
    // 2. Use the clean base instance here instead of the recursive 'helper'
    formatHelp: (cmd) => {
      const regularHelp = baseHelp.formatHelp(cmd, baseHelp)

      return regularHelp
        .replace(/(<[^>]+>|\[[^\]]+])/g, pc.cyan("$1"))
        .replace(/(?<!\w)(-\w|--\w[\w-]+)/g, pc.cyanBright("$1"))
        .replace(/^\s{2}(\w[\w-]+)(?=\s)/gm, pc.cyanBright("$1"))
        .replace(/^Usage:/gm, pc.greenBright("Usage:"))
        .replace(/^Commands:/gm, pc.greenBright("Commands:"))
        .replace(/^Global Options:/gm, pc.greenBright("Global Options:"))
        .replace(/^Options:/gm, pc.greenBright("Options:"))
    },
  })

  const colorOption = new Option(
    "-c, --color <when>",
    "control terminal color output",
  )
    .choices(["auto", "always", "never"])
    .default("auto")

  function getOpts(
    cmd: Command,
    opts: Record<string, unknown>,
  ): Record<string, unknown> {
    opts = { ...cmd.optsWithGlobals(), ...opts }
    const colorize =
      opts.color === "always" || (opts.color === "auto" && process.stderr.isTTY)
    return { ...opts, colorize }
  }

  program
    .description("꘩TS’emekwes — A PEG parser generator for TypeScript")
    .name("emekwes")
    .addOption(colorOption)
    .option("-o, --output <path>", "write output to file instead of stdout")
    .option("-t, --trace", "display a detailed trace of the parsing process")
    .version(await getProjectGitVersion())
    .action(() => {
      program.help()
    })

  program
    .command("run <grammar> [inputs...]")
    .description("execute a grammar against one or more input files")
    .option("-j, --json", "output the parse tree in JSON format")
    .option("-s, --start <rule>", "name of the start rule", "start")
    .option("-q, --quiet", "suppress progress bar output")
    .option(
      "-n, --nproc <number>",
      "number of concurrent workers (default: CPU count)",
      (v) => parseInt(v, 10),
      0,
    )
    .action(async (grammar, inputs, opts, cmd) => {
      opts = getOpts(cmd, opts)
      await writeOutput(await cmdRun(grammar, inputs, opts), opts)
    })

  program
    .command("boot")
    .description("the internal boot grammar")
    .option("-j, --json", "print the boot grammar in JSON format")
    .option("-p, --pretty", "pretty-print the boot grammar", true)
    .action(async (opts, cmd) => {
      opts = getOpts(cmd, opts)
      await writeOutput(await cmdBoot(opts), opts)
    })

  program
    .command("grammar <grammar>")
    .description("compile and inspect a grammar")
    .option("-j, --json", "print the grammar in JSON format")
    .option("-p, --pretty", "pretty-print the grammar (default)", true)
    .action(async (grammar, opts, cmd) => {
      opts = getOpts(cmd, opts)
      await writeOutput(await cmdGrammar(grammar, opts), opts)
    })

  program
    .command("info")
    .description("show feature implementation status")
    .action(() => {
      cmdInfo()
    })
  return program
}
