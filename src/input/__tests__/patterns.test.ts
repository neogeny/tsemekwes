import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { Cfg } from "../../config/config.js"
import {
  configurePatterns,
  defaultPatterns,
  newPatterns,
  TokenizingPatterns,
} from "../patterns.js"

describe("patterns", () => {
  it("newPatterns compiles regexps", () => {
    const p = newPatterns(`\\s+`, `#.*`, `#.*$`)
    assert.ok(p.wsp instanceof RegExp)
    assert.ok(p.cmt instanceof RegExp)
    assert.ok(p.eol instanceof RegExp)
  })

  it("defaultPatterns creates default patterns", () => {
    const p = defaultPatterns()
    assert.ok(p.wsp instanceof RegExp)
    assert.ok(p.cmt instanceof RegExp)
    assert.ok(p.eol instanceof RegExp)
    assert.equal(p.nonDefault, false)
  })

  it("default wsp matches whitespace", () => {
    const p = defaultPatterns()
    assert.ok(p.wsp?.test(" "))
    assert.ok(p.wsp?.test("\t"))
    assert.ok(p.wsp?.test("\r\n \t \n"))
    assert.ok(!p.wsp?.test("a"))
  })

  it("default cmt matches # comments", () => {
    const p = defaultPatterns()
    assert.ok(p.cmt?.test("# foo"))
    assert.ok(!p.cmt?.test("not a comment"))
  })

  it("configurePatterns sets nonDefault with whitespace override", () => {
    const p = defaultPatterns()
    const cfg = new Cfg()
    cfg.whitespace = "[ \\t]+"
    configurePatterns(p, cfg)
    assert.equal(p.nonDefault, true)
    assert.ok(p.wsp?.test("  "))
  })

  it("configurePatterns sets whitespace to null for empty string", () => {
    const p = defaultPatterns()
    const cfg = new Cfg()
    cfg.whitespace = ""
    configurePatterns(p, cfg)
    assert.equal(p.wsp, null)
  })

  it("configurePatterns sets cmt from comments", () => {
    const p = defaultPatterns()
    const cfg = new Cfg()
    cfg.comments = "//.*"
    configurePatterns(p, cfg)
    assert.ok(p.cmt instanceof RegExp)
    assert.ok(p.cmt?.test("// hello"))
  })

  it("configurePatterns sets eol from eolComments", () => {
    const p = defaultPatterns()
    const cfg = new Cfg()
    cfg.eolComments = ";.*$"
    configurePatterns(p, cfg)
    assert.ok(p.eol instanceof RegExp)
    assert.ok(p.eol?.test("; comment"))
  })

  it("default patterns are TokenizingPatterns instances", () => {
    const p = defaultPatterns()
    assert.ok(p instanceof TokenizingPatterns)
  })
})
