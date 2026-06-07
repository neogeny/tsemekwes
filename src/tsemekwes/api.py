"""Python interface matching src/api/api.ts, calling the CLI out-of-process."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from . import bun
from .types import Grammar
from .tree import Tree


def _build_grammar_args(
    *,
    trace: bool = False,
    output: str | None = None,
) -> list[str]:
    args = ["grammar", "-", "-j"]
    if trace:
        args.append("-t")
    if output is not None:
        args += ["-o", output]
    return args


def _build_run_args(
    path: str,
    inputs: list[str],
    *,
    start: str | None = None,
    nproc: int | None = None,
    trace: bool = False,
    output: str | None = None,
) -> list[str]:
    args = ["run", "-j"]
    if start:
        args += ["-s", start]
    if nproc is not None:
        args += ["-n", str(nproc)]
    if trace:
        args.append("-t")
    if output is not None:
        args += ["-o", output]
    args.append(path)
    return [*args, *inputs]


def parseGrammar(
    grammar: str,
    *,
    trace: bool = False,
) -> Tree:
    result = bun.run(_build_grammar_args(trace=trace), input=grammar)
    return json.loads(result)


def compile(path: str) -> Grammar:
    grammar = json.loads(bun.run(["grammar", "-j", path])))
    return Grammar(grammar)


def parseInput(
    path: str,
    inputs: list[str],
    *,
    start: str | None = None,
    nproc: int | None = None,
    trace: bool = False,
) -> Any:
    result = bun.run(_build_run_args(path, inputs, start=start, nproc=nproc, trace=trace))
    return json.loads(result)

def bootGrammar() -> Grammar:
    result = bun.run(["boot", "--json"])
    return Grammar(json.loads(result))


def bootPretty() -> str:
    return bun.run(["boot", "--pretty"])


def loadGrammarFromJSON(json_str: str) -> Grammar:
    return Grammar(json.loads(json_str))


def grammarPretty(path: str) -> str:
    return bun.run(["grammar", "--pretty", path])


def loadGrammarFromPath(
    path: str,
) -> Grammar:
    text = Path(path).read_text()
    return Grammar(json.loads(text))
