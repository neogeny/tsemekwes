export class LinkError extends Error {
  constructor(msg: string, options?: ErrorOptions) {
    super(msg, options)
    this.name = "LinkError"
  }
}
