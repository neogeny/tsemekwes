import { readFile } from "node:fs/promises"
import { ext, readText } from "@totetsu/cmd/helpers.js"
import { type Cfg, defaultCfg } from "../config/config.js"
import { newCtx } from "../context/index.js"
import { StrCursor } from "@input/cursor-str.js"
import { bootGrammar as boot } from "../json/boot.js"
import { loadGrammarFromJSON as loadJSON } from "../json/import.js"
import { compileGrammar } from "../peg/compile.js"
import type { Grammar } from "../peg/grammar.js"
import type { Tree } from "../trees/tree.js"

export class ApiError extends Error {
  constructor(
    msg: string,
    public readonly cause?: unknown,
  ) {
    super(msg)
    this.name = "ApiError"
  }
}

export function defaultConfig(): Cfg {
  return defaultCfg()
}

export function parseGrammar(grammar: string, cfg?: Cfg): Tree {
  const boot = bootGrammar()
  const cursor = new StrCursor(grammar)
  const merged = cfg ?? undefined
  const ctx = newCtx(cursor, merged)
  const tree = boot.parseAt(ctx, merged)
  if (tree == null) {
    const failure = ctx.furthestFailure()
    if (failure) throw new ApiError(failure.memento.error())
    throw new ApiError("failed to parse grammar")
  }
  return tree
}

export function compile(grammar: string, cfg?: Cfg): Grammar {
  try {
    const tree = parseGrammar(grammar, cfg)
    const compiled = compileGrammar(tree)
    return compiled
  } catch (e) {
    throw e
    // if (e instanceof ApiError) throw e
    // throw new ApiError(`grammar compilation failed: ${(e as Error).message}`, e)
  }
}

export function parseInput(parser: Grammar, text: string, cfg?: Cfg): Tree {
  const cursor = new StrCursor(text)
  const merged = cfg ?? undefined
  const ctx = newCtx(cursor, merged)
  const result = parser.parseAt(ctx, merged)
  if (result == null) {
    const failure = ctx.furthestFailure()
    if (failure) throw new ApiError(failure.memento.error())
    throw new ApiError("parse failed")
  }
  return result
}

export function parse(grammar: string, text: string, cfg?: Cfg): Tree {
  try {
    const parser = compile(grammar, cfg)
    return parseInput(parser, text, cfg)
  } catch (e) {
    if (e instanceof ApiError) throw e
    throw new ApiError(`parse failed: ${(e as Error).message}`, e)
  }
}

export function bootGrammar(): Grammar {
  return boot()
}

export function loadGrammarFromJSON(json: string): Grammar {
  const data = JSON.parse(json)
  return loadJSON(data)
}

export function grammarToJSON(): string {
  throw new ApiError(
    "grammarToJSON is not yet implemented — needs Grammar.toJSON() serialization.",
  )
}

export function grammarPretty(): string {
  throw new ApiError(
    "grammarPretty is not yet implemented — needs Grammar.prettyPrint().",
  )
}

export async function loadGrammar(
  grammarPath: string,
  cfg?: Cfg,
): Promise<Grammar> {
  if (grammarPath === "-") {
    const text = await readText(grammarPath)
    return compile(text, cfg)
  }
  const e = ext(grammarPath)
  if (e === "json") {
    const raw = await readFile(grammarPath, "utf-8")
    return loadGrammarFromJSON(raw)
  }
  const text = await readFile(grammarPath, "utf-8")
  return compile(text, cfg)
}
