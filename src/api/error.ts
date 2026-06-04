export class ApiError extends Error {
  constructor(
    msg: string,
    public readonly cause?: unknown,
  ) {
    super(msg, { cause: cause })
    this.name = "ApiError"
  }
}
