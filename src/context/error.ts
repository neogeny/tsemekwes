import {Ctx} from "./ctx";
import {Memento} from "./memento";

export class ParseError extends Error {
  // Brand the class to ensure detection even across bundles
  readonly __isParseError = true;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'ParseError';
  }

  static isParseError(error: unknown): error is ParseError {
    return error instanceof ParseError
        || (!!error && (error as any).__isParseError === true);
  }
}

export class ParseFailure extends ParseError{
  public readonly memento: Memento

  constructor(
      public readonly start: number,
      msg: string,
      ctx: Ctx,
     options?: ErrorOptions
  ) {
    super(msg, options)
    this.name = "ParseFailure"
    this.memento = new Memento(
        start,
        msg,
        ctx.cursor(),
        ctx.callStack(),
        ctx.cfg().colorize as boolean,
    )
  }

  get mark(): number {
    return this.memento.mark
  }

  static isParseFailure(error: unknown): error is ParseFailure {
    return error instanceof ParseFailure
        || (!!error && (error as any).__isMyCustomError === true);
  }
}

export function isParseFailure(error: unknown): boolean {
  return ParseFailure.isParseFailure(error)
}

export function isParseError(error: unknown): boolean {
  return ParseError.isParseError(error)
}