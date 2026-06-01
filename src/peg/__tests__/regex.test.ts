// src/peg/__tests__/regex.test.ts
import { parse } from "../index.js"; // Adjust import path as needed

describe("regex rule", () => {
  const parseRegex = (src: string) => parse("regex", src);

  test("simple character class", () => {
    const result = parseRegex("[a-z]");
    expect(result).toMatchObject({ type: "regex", value: "[a-z]" });
  });

  test("escaped characters", () => {
    const result = parseRegex("\\d+");
    expect(result).toMatchObject({ type: "regex", value: "\\d+" });
  });

  test("alternation", () => {
    const result = parseRegex("a|b|c");
    expect(result).toMatchObject({ type: "regex", value: "a|b|c" });
  });

  test("grouping with parentheses", () => {
    const result = parseRegex("(ab)+");
    expect(result).toMatchObject({ type: "regex", value: "(ab)+" });
  });

  test("regex with delimiters and flags", () => {
    const result = parseRegex("/foo/i");
    // The parser may strip delimiters; adjust expectation accordingly.
    expect(result).toMatchObject({ type: "regex", value: "/foo/i" });
  });
});
