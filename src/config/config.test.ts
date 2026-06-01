import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Cfg, defaultCfg } from "./config.js";

describe("Cfg", () => {
  it("defaultCfg returns empty Cfg", () => {
    const cfg = defaultCfg();
    assert.ok(cfg instanceof Cfg);
    assert.equal(cfg.source, "");
    assert.equal(cfg.ignoreCase, false);
    assert.equal(cfg.nameChars, "");
    assert.equal(cfg.nameGuard, null);
    assert.equal(cfg.whitespace, null);
    assert.equal(cfg.comments, "");
    assert.equal(cfg.eolComments, "");
  });

  it("fields can be set", () => {
    const cfg = new Cfg();
    cfg.source = "test.ebnf";
    cfg.ignoreCase = true;
    cfg.nameChars = "$";
    cfg.nameGuard = true;
    cfg.whitespace = "[ \\t]+";
    cfg.comments = "#.*";
    cfg.eolComments = "#.*$";
    assert.equal(cfg.source, "test.ebnf");
    assert.equal(cfg.ignoreCase, true);
  });

  it("multiple instances are independent", () => {
    const a = new Cfg();
    const b = new Cfg();
    a.source = "a";
    b.source = "b";
    assert.equal(a.source, "a");
    assert.equal(b.source, "b");
  });
});
