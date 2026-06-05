import { readFile } from "node:fs/promises"
import { gzipSync } from "node:zlib"
import { type Cfg, defaultCfg } from "@config"
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

const compileCache = new Map<string, Grammar>()

function cacheKey(text: string): string {
  return gzipSync(Buffer.from(text, "utf-8")).toString("base64")
}

export function parseGrammar(grammar: string, cfg?: Cfg): TreeValue {
  const acfg = defaultCfg().merge(cfg ?? {})

  const boot = bootGrammar()
  const cursor = new StrCursor(dedent(grammar))
  const ctx = newCtx(cursor, acfg)
  try {
    return boot.parse(ctx, acfg)
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
  const key = cacheKey(grammar)
  const cached = compileCache.get(key)
  if (cached) return cached
  const tree = parseGrammar(grammar, cfg)
  const g = compileGrammar(tree)
  compileCache.set(key, g)
  return g
}

export async function parseInputAsync(
  parser: Grammar,
  text: string,
  cfg?: Cfg,
): Promise<TreeValue> {
  return parseInput(parser, text, cfg)
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
  const key = cacheKey(json)
  const cached = compileCache.get(key)
  if (cached) return cached
  const data = JSON.parse(json)
  const g = loadJSON(data)
  compileCache.set(key, g)
  return g
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
