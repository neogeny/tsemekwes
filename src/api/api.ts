import { readFile } from "node:fs/promises"
import { ext, readText } from "@util"
import { type Cfg, defaultCfg } from "@config"
import {isParseError, isParseFailure, newCtx, ParseFailure} from "@context"
import { StrCursor } from "@input"
import { bootGrammar as boot } from "@json"
import { loadGrammarFromJSON as loadJSON } from "@json"
import { compileGrammar } from "@peg"
import type { Grammar } from "@peg"
import type { Tree } from "@trees"
import { ApiError } from "./error.js"

export function defaultConfig(): Cfg {
  return defaultCfg()
}

export function parseGrammar(grammar: string, cfg?: Cfg): Tree {
  const boot = bootGrammar()
  const cursor = new StrCursor(grammar)
  const merged = cfg ?? undefined
  const ctx = newCtx(cursor, merged)

  let tree: Tree | null = null
  try {
    tree = boot.parse(ctx, merged) as unknown as Tree
  } catch (error) {
    if (!isParseError(error)) {
      throw error
    }
    if (isParseFailure(error)) {
      const failure = error as ParseFailure
      if (failure) throw new ApiError(failure.memento.error())
    }
    throw new ApiError("failed to parse grammar", error)
  }

  if (tree === null) {
    const failure = ctx.furthestFailure()
    if (failure) throw new ApiError(failure.memento.error())
    throw new ApiError("failed to parse grammar")
  }

  return tree
}

export function compile(grammar: string, cfg?: Cfg): Grammar {
  const tree = parseGrammar(grammar, cfg)
  return compileGrammar(tree)
}

export function parseInput(parser: Grammar, text: string, cfg?: Cfg): Tree {
  const cursor = new StrCursor(text)
  const merged = cfg ?? undefined
  const ctx = newCtx(cursor, merged)

  let tree: Tree | null = null
  try {
    tree = parser.parse(ctx, merged) as unknown as Tree
  } catch (error) {
    if (!isParseError(error)) {
      throw error
    }
    if (isParseFailure(error)) {
      const failure = error as ParseFailure
      if (failure) throw new ApiError(failure.memento.error())
    }
    throw new ApiError("failed to parse grammar", error)
  }

  if (tree == null) {
    const failure = ctx.furthestFailure()
    if (failure) throw new ApiError(failure.memento.error())
    throw new ApiError("parse failed")
  }

  return tree
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
