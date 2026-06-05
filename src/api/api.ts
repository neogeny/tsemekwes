import { readFile } from "node:fs/promises"
import type { Cfg } from "@config"
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
import type { TreeValue } from "@trees"
import { ext, readText } from "@util"
import { dedent } from "@util/strings"
import { ApiError } from "./error.js"

export function parseGrammar(grammar: string, cfg?: Cfg): TreeValue {
  const boot = bootGrammar()
  const cursor = new StrCursor(dedent(grammar))
  const merged = cfg ?? undefined
  const ctx = newCtx(cursor, merged)

  try {
    return boot.parse(ctx, merged)
  } catch (error) {
    if (!isParseError(error)) {
      throw error
    }
    if (isParseFailure(error)) {
      const failure = error as ParseFailure
      throw new ApiError(failure.memento.msg, failure)
    }
    throw new ApiError("failed to parse grammar", error)
  }
}

export function compile(grammar: string, cfg?: Cfg): Grammar {
  const tree = parseGrammar(grammar, cfg)
  return compileGrammar(tree)
}

export function parseInput(
  parser: Grammar,
  text: string,
  cfg?: Cfg,
): TreeValue {
  const cursor = new StrCursor(text)
  const merged = cfg ?? undefined
  const ctx = newCtx(cursor, merged)

  try {
    return parser.parse(ctx, merged) as unknown as TreeValue
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
    throw new ApiError("failed to parse input", error)
  }
}

export function parse(grammar: string, text: string, cfg?: Cfg): TreeValue {
  return parseInput(compile(grammar, cfg), text, cfg)
}

export function bootGrammar(): Grammar {
  return boot()
}

export function loadGrammarFromJSON(json: string): Grammar {
  const data = JSON.parse(json)
  return loadJSON(data)
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
