import color from "picocolors"
import type { Grammar } from "./grammar.js"

export function grammarSummary(g: Grammar, colorize?: boolean): string {
  const lines: string[] = []
  const pc = color.createColors(colorize !== false)

  lines.push(pc.bold(pc.cyan(g.name)))
  lines.push("")

  if (g.directives.length > 0) {
    lines.push(pc.dim("directives:"))
    for (const d of g.directives) {
      lines.push(`  ${pc.yellow(`@${d[0]}`)} ${pc.dim("::")} ${d[1]}`)
    }
  }

  if (g.keywords.length > 0) {
    if (g.directives.length > 0) lines.push("")
    lines.push(`${pc.dim("keywords:")} ${pc.green(g.keywords.join(", "))}`)
  }

  if (g.directives.length > 0 || g.keywords.length > 0) lines.push("")
  lines.push(`${pc.dim("rules:")} ${g.rules.length}`)
  for (const r of g.rules) {
    const deco =
      r.decorators.length > 0
        ? ` ${pc.green(`[${r.decorators.join(", ")}]`)}`
        : ""
    lines.push(`  ${pc.yellow(r.name)}${deco}`)
  }

  return lines.join("\n")
}
