import { TSemekwesError } from "@error"

export class ApiError extends TSemekwesError {
  constructor(
    msg: string,
    public readonly cause?: unknown,
  ) {
    super(msg, { cause: cause })
    this.name = "ApiError"
  }
}
