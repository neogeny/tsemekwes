import Ctx from "./ctx"
import { Memento } from "./memento"

export class ParseError extends Error {
  // Brand the class to ensure detection even across bundles
  readonly __isParseError = true

  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = "ParseError"
  }

  static isParseError(error: unknown): error is ParseError {
    return (
      error instanceof ParseError ||
      (!!error && (error as any).__isParseError === true)
    )
  }
}

export class BottomError extends ParseError {
  // Brand the class to ensure detection even across bundles
  readonly __isBottomError = true

  constructor(options?: ErrorOptions) {
    super("BOTTOM", options)
    this.name = "BottomError"
  }

  static isBottomError(error: unknown): error is ParseError {
    return (
      error instanceof BottomError ||
      (!!error && (error as any).__isBottomError === true)
    )
  }
}

export const BOTTOM = new BottomError()

export class ParseFailure extends ParseError {
  public readonly memento: Memento

  constructor(
    ctx: Ctx,
    public readonly start: number,
    public readonly cause: ParseError,
  ) {
    let memento = new Memento(
      start,
      cause,
      ctx.cursor(),
      ctx.callStack(),
      ctx.cfg().colorize as boolean,
    )
    super(memento.render(), {cause: memento})
    this.name = "ParseFailure"
    this.memento = memento
    Object.setPrototypeOf(this, ParseFailure.prototype);
  }

  override toString(): string {
    return this.memento.render()
  }

  get mark(): number {
    return this.memento.mark
  }

  static isParseFailure(error: unknown): error is ParseFailure {
    return (
      error instanceof ParseFailure ||
      (!!error && (error as any).__isMyCustomError === true)
    )
  }
}

// noinspection JSUnusedGlobalSymbols
export function isBottomError(error: unknown): boolean {
  return BottomError.isBottomError(error)
}

export function isParseFailure(error: unknown): boolean {
  return ParseFailure.isParseFailure(error)
}

export function isParseError(error: unknown): boolean {
  return ParseError.isParseError(error)
}
