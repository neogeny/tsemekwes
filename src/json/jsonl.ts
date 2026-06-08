export function toSingleLineJSON(prettyJson: string): string {
  const parsed = JSON.parse(prettyJson);
  return JSON.stringify(parsed);
}

export function toJSONLines(jsonBlocks: (object | string)[]): string {
  return jsonBlocks
    .map((block) => (typeof block === "string" ? block : JSON.stringify(block)))
    .join("\n");
}
