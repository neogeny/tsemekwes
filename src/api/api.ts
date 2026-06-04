import { type Cfg } from "@config"
import {
  isParseError,
  isParseFailure,
  newCtx,
  type ParseFailure,
} from "@context"
import { StrCursor } from "@input"
import { bootGrammar as boot, loadGrammarFromJSON as loadJSON } from "@json"
import type { Grammar } from "@peg"
import { compileGrammar } from "@peg"
import type { Tree } from "@trees"
import { ext, readText } from "@util"
import { readFile } from "node:fs/promises"
import { ApiError } from "./error.js"

export function parseGrammar(grammar: string, cfg?: Cfg): Tree {
  const boot = bootGrammar()
  const cursor = new StrCursor(grammar)
  const merged = cfg ?? undefined
  const ctx = newCtx(cursor, merged)

  try {
    return boot.parse(ctx, merged) as unknown as Tree
  } catch (error) {
    if (!isParseError(error)) {
      throw error
    }
    if (isParseFailure(error)) {
      let failure = error as ParseFailure
      throw new ApiError(failure.memento.msg, failure)
    }
    throw new ApiError("failed to parse grammar", error)
  }
}

export function compile(grammar: string, cfg?: Cfg): Grammar {
  const tree = parseGrammar(grammar, cfg)
  return compileGrammar(tree)
}

export function parseInput(parser: Grammar, text: string, cfg?: Cfg): Tree {
  const cursor = new StrCursor(text)
  const merged = cfg ?? undefined
  const ctx = newCtx(cursor, merged)

  try {
    return parser.parse(ctx, merged) as unknown as Tree
  } catch (error) {
    if (!isParseError(error)) {
      throw error
    }
    let failure: ParseFailure | null
    if (isParseFailure(error)) {
      failure = error as ParseFailure
    } else {
      failure = ctx.furthestFailure()
    }
    if (failure !== null) throw new ApiError(failure.memento.msg)
    throw new ApiError("failed to parse grammar", error)
  }
}

export function parse(grammar: string, text: string, cfg?: Cfg): Tree {
  try {
    const parser = compile(grammar, cfg)
    return parseInput(parser, text, cfg)
  } catch (e) {
    if (e instanceof ApiError) throw e
    // throw new ApiError(`parse failed: ${(e as Error).message}`, e)
    throw e
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

export function grammarPretty(grammar: Grammar): string {
  return grammar.pretty()
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
