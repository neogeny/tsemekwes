import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { StrCursor } from "../input/str-cursor.js";
import { Memento } from "./memento.js";

describe("Memento", () => {
  it("captures start, mark, msg, callstack", () => {
    const cursor = new StrCursor("hello world");
    cursor.reset(6);
    const m = new Memento(6, "test error", cursor, ["ruleA", "ruleB"]);
    assert.equal(m.start, 6);
    assert.equal(m.mark, 6);
    assert.equal(m.msg, "test error");
    assert.deepEqual(m.callStack, ["ruleA", "ruleB"]);
  });

  it("mark captures cursor position at construction", () => {
    const cursor = new StrCursor("abcdefghij");
    cursor.reset(3);
    const m = new Memento(0, "err", cursor, []);
    assert.equal(m.mark, 3);
  });

  it("copies callstack defensively", () => {
    const cursor = new StrCursor("hello");
    const cs = ["ruleA"];
    const m = new Memento(0, "err", cursor, cs);
    cs.push("ruleB");
    assert.deepEqual(m.callStack, ["ruleA"]);
  });

  it("error() includes message", () => {
    const cursor = new StrCursor("abc");
    cursor.reset(1);
    const m = new Memento(1, "something went wrong", cursor, []);
    assert.ok(m.error().includes("something went wrong"));
  });

  it("error() shows source lines", () => {
    const text = "line1\nline2\nline3\nline4\nline5\nline6";
    const cursor = new StrCursor(text);
    cursor.reset(12);
    const m = new Memento(12, "error here", cursor, []);
    const err = m.error();
    assert.ok(err.includes("line3"), `should show line3: ${err}`);
    assert.ok(err.includes("^ error here"), `should have caret: ${err}`);
  });

  it("error() shows call stack", () => {
    const cursor = new StrCursor("test");
    const m = new Memento(0, "err", cursor, ["ruleX", "ruleY"]);
    const err = m.error();
    assert.ok(err.includes("ruleX"));
    assert.ok(err.includes("ruleY"));
  });

  it("error() uses input source name", () => {
    const cursor = new StrCursor("test", "test.ebnf", 0);
    const m = new Memento(0, "err", cursor, []);
    const err = m.error();
    assert.ok(err.includes("test.ebnf"));
  });

  it("error() on empty input", () => {
    const cursor = new StrCursor("");
    const m = new Memento(0, "unexpected end", cursor, []);
    assert.ok(m.error().includes("unexpected end"));
  });
});
