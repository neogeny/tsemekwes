import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { Cfg, defaultCfg } from "../config.js"

describe("Cfg", () => {
  it("defaultCfg returns Cfg with defaults", () => {
    const cfg = defaultCfg()
    assert.ok(cfg instanceof Cfg)
    assert.equal(cfg.name, undefined)
    assert.equal(cfg.start, undefined)
    assert.equal(cfg.ignoreCase, false)
    assert.equal(cfg.concurrency, undefined)
    assert.equal(cfg.noMemo, false)
    assert.equal(cfg.noPruneMemosOnCut, false)
    assert.equal(cfg.perLineMemos, 8)
    assert.equal(cfg.trace, false)
    assert.equal(cfg.colorize, false)
    assert.equal(cfg.noLeftRecursion, false)
    assert.equal(cfg.nameGuard, null)
    assert.equal(cfg.whitespace, undefined)
    assert.deepEqual(cfg.keywords, [])
    assert.equal(cfg.parseInfo, false)
    assert.equal(cfg.semantics, undefined)
  })

  it("fields can be set", () => {
    const cfg = new Cfg()
    cfg.source = "test.ebnf"
    cfg.ignoreCase = true
    cfg.nameChars = "$"
    cfg.nameGuard = true
    cfg.whitespace = "[ \\t]+"
    cfg.comments = "#.*"
    cfg.eolComments = "#.*$"
    assert.equal(cfg.source, "test.ebnf")
    assert.equal(cfg.ignoreCase, true)
  })

  it("multiple instances are independent", () => {
    const a = new Cfg()
    const b = new Cfg()
    a.source = "a"
    b.source = "b"
    assert.equal(a.source, "a")
    assert.equal(b.source, "b")
  })
})
