export class ApiError extends Error {
  constructor(
    msg: string,
    public readonly cause?: unknown,
    options?: ErrorOptions
  ) {
    super(msg, options)
    this.name = "ApiError"
    this.cause = cause
  }
}
