export class TSemekwesError extends Error {
  // Brand the class to ensure detection even across bundles
  get __isTSemekwesError(): boolean {
    return true
  }

  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = "TSemekwesError"
  }

  static isTSemekwesError(error: unknown): error is TSemekwesError {
    return (
      error instanceof TSemekwesError ||
      (!!error && (error as any).__isTSemekwesError === true)
    )
  }
}
