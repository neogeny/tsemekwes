export class LinkError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = "LinkError"
  }
}

export class ParseError extends Error {
  // Brand the class to ensure detection even across bundles
  readonly __isMyCustomError = true;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'MyCustomError';
  }

  static isParseError(error: unknown): error is ParseError {
    return error instanceof ParseError
        || (!!error && (error as any).__isMyCustomError === true);
  }
}

export function isParseError(error: unknown): boolean {
  return ParseError.isParseError(error)
}
