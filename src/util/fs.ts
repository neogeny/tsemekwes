import { readFile } from "node:fs/promises"

export async function readPath(
  path: string,
  encoding: BufferEncoding = "utf-8",
): Promise<string> {
  if (path !== "-") {
    return await readFile(path, encoding)
  }
  const chunks: Buffer[] = []
  for await (const chunk of process.stdin) {
    chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks).toString(encoding)
}

export function ext(path: string): string {
  const i = path.lastIndexOf(".")
  return i !== -1 ? path.slice(i + 1).toLowerCase() : ""
}
