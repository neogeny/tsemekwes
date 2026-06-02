export class ApiError extends Error {
  constructor(
    msg: string,
    public readonly _cause?: unknown,
  ) {
    super(msg)
    this.name = "ApiError"
    this._cause = _cause
  }
}
