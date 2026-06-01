import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  type Tree,
  Text,
  Number,
  Bool,
  Nil,
  Bottom,
  Seq,
  Array,
  MapNode,
  Node,
  Named,
  NamedAsList,
  Override,
  OverrideAsList,
  fold,
  treeToJSONStr,
} from "./tree.js";

function text(s: string): Text {
  return new Text(s);
}
function seq(...items: Tree[]): Seq {
  return new Seq(items);
}
function list(...items: Tree[]): Array {
  return new Array(items);
}

describe("fold", () => {
  it("Nil", () => {
    const result = fold(new Nil());
    assert.ok(result instanceof Nil);
  });

  it("Bottom", () => {
    const result = fold(new Bottom());
    assert.ok(result instanceof Bottom);
  });

  it("null -> Nil", () => {
    const result = fold(null);
    assert.ok(result instanceof Nil);
  });

  it("Text", () => {
    const result = fold(text("hello"));
    assert.ok(result instanceof Text);
    assert.equal((result as Text).value, "hello");
  });

  it("Bool", () => {
    const result = fold(new Bool(true));
    assert.ok(result instanceof Bool);
    assert.equal((result as Bool).value, true);
  });

  it("Number", () => {
    const result = fold(new Number(42.5));
    assert.ok(result instanceof Number);
    assert.equal((result as Number).value, 42.5);
  });

  it("Seq to Array", () => {
    const result = fold(seq(text("a"), text("b"), text("c")));
    assert.ok(result instanceof Array, `expected Array, got ${typeof result}`);
    assert.equal((result as Array).items.length, 3);
    assert.equal(((result as Array).items[0] as Text).value, "a");
  });

  it("List to Array", () => {
    const result = fold(list(text("a"), text("b"), text("c")));
    assert.ok(result instanceof Array, `expected Array, got ${typeof result}`);
    assert.equal((result as Array).items.length, 3);
    assert.equal(((result as Array).items[0] as Text).value, "a");
  });

  it("Named to Map", () => {
    const result = fold(new Named("x", text("hello")));
    assert.ok(result instanceof MapNode, `expected MapNode, got ${typeof result}`);
    const m = result as MapNode;
    assert.ok(m.entries.has("x"));
    assert.equal((m.entries.get("x") as Text).value, "hello");
  });

  it("Override", () => {
    const result = fold(new Override(text("result")));
    assert.ok(result instanceof Text);
    assert.equal((result as Text).value, "result");
  });

  it("Multiple Named", () => {
    const result = fold(
      seq(new Named("a", text("1")), new Named("b", text("2"))),
    );
    assert.ok(result instanceof MapNode, `expected MapNode, got ${typeof result}`);
    const m = result as MapNode;
    assert.equal((m.entries.get("a") as Text).value, "1");
    assert.equal((m.entries.get("b") as Text).value, "2");
  });

  it("Named accumulates", () => {
    const result = fold(
      seq(new Named("x", text("a")), new Named("x", text("b"))),
    );
    assert.ok(result instanceof MapNode, `expected MapNode, got ${typeof result}`);
    const m = result as MapNode;
    const x = m.entries.get("x") as Seq;
    assert.equal((x.items[0] as Text).value, "a");
    assert.equal((x.items[1] as Text).value, "b");
  });

  it("NamedAsList", () => {
    const result = fold(new NamedAsList("items", text("x")));
    assert.ok(result instanceof MapNode, `expected MapNode, got ${typeof result}`);
    const m = result as MapNode;
    const seq = m.entries.get("items") as Seq;
    assert.equal(seq.items.length, 1);
    assert.equal((seq.items[0] as Text).value, "x");
  });

  it("NamedAsList accumulates", () => {
    const result = fold(
      seq(
        new NamedAsList("items", text("a")),
        new NamedAsList("items", text("b")),
      ),
    );
    assert.ok(result instanceof MapNode, `expected MapNode, got ${typeof result}`);
    const m = result as MapNode;
    const items = m.entries.get("items") as Seq;
    assert.equal(items.items.length, 2);
    assert.equal((items.items[0] as Text).value, "a");
    assert.equal((items.items[1] as Text).value, "b");
  });

  it("Override wins", () => {
    const result = fold(
      seq(
        new Named("x", text("ignored")),
        text("also ignored"),
        new Override(text("result")),
      ),
    );
    assert.ok(result instanceof Text);
    assert.equal((result as Text).value, "result");
  });

  it("OverrideAsList", () => {
    const result = fold(
      seq(new OverrideAsList(text("a")), new OverrideAsList(text("b"))),
    );
    assert.ok(result instanceof Array, `expected Array, got ${typeof result}`);
    assert.equal((result as Array).items.length, 2);
  });

  it("Nested Named", () => {
    const result = fold(
      new Named(
        "x",
        seq(new Named("a", text("1")), new Named("b", text("2"))),
      ),
    );
    assert.ok(result instanceof MapNode, `expected MapNode, got ${typeof result}`);
    const m = result as MapNode;
    assert.ok(m.entries.has("x"));
    assert.ok(m.entries.has("a"));
    assert.ok(m.entries.has("b"));
  });

  it("Seq with Nil", () => {
    const result = fold(seq(text("a"), new Nil(), text("b")));
    assert.ok(result instanceof Array, `expected Array, got ${typeof result}`);
    assert.equal((result as Array).items.length, 2);
  });

  it("Rule node", () => {
    const result = fold(new Node("expr", text("42")));
    assert.ok(result instanceof Node);
    const r = result as Node;
    assert.equal(r.typeName, "expr");
  });
});

describe("treeToJSONStr", () => {
  it("Text", () => {
    assert.equal(treeToJSONStr(new Text("hello")), '"hello"');
  });

  it("Number", () => {
    assert.equal(treeToJSONStr(new Number(42.5)), "42.5");
  });

  it("Node with tree", () => {
    const got = treeToJSONStr(new Node("expr", text("42")));
    const want = JSON.stringify({ __class__: "expr", ast: "42" }, null, 2);
    assert.equal(got, want);
  });
});
