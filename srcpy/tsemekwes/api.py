"""Python interface matching src/api/api.ts, calling the CLI out-of-process."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from . import bun
from .tree import Tree
from .types import Grammar


def _build_grammar_args(
    *,
    trace: bool = False,
) -> list[str]:
    args = ["grammar", "-", "-j"]
    if trace:
        args.append("-t")
    return args


def _build_run_args(
    path: str,
    inputs: list[str],
    *,
    start: str | None = None,
    nproc: int | None = None,
    trace: bool = False,
) -> list[str]:
    args = ["run", "-j"]
    if start:
        args += ["-s", start]
    if nproc is not None:
        args += ["-n", str(nproc)]
    if trace:
        args.append("-t")
    args.append(path)
    return [*args, *inputs]


def parseGrammar(
    grammar: str,
    *,
    trace: bool = False,
    output: str | None = None,
) -> Tree:
    result = bun.run(_build_grammar_args(trace=trace), input=grammar, output=output)
    return json.loads(result)


def compile(path: str, *, output: str | None = None) -> Grammar:
    grammar = json.loads(bun.run(["grammar", "-j", path], output=output))
    return Grammar(grammar)


def parseInput(
    path: str,
    inputs: list[str],
    *,
    start: str | None = None,
    nproc: int | None = None,
    trace: bool = False,
    output: str | None = None,
) -> Any:
    result = bun.run(
        _build_run_args(path, inputs, start=start, nproc=nproc, trace=trace),
        output=output,
    )
    return json.loads(result)


def bootGrammar(*, output: str | None = None) -> Grammar:
    result = bun.run(["boot", "--json"], output=output)
    return Grammar(json.loads(result))


def bootPretty(*, output: str | None = None) -> str:
    return bun.run(["boot", "--pretty"], output=output)


def loadGrammarFromJSON(json_str: str) -> Grammar:
    return Grammar(json.loads(json_str))


def grammarPretty(path: str, *, output: str | None = None) -> str:
    return bun.run(["grammar", "--pretty", path], output=output)


def loadGrammarFromPath(
    path: str,
) -> Grammar:
    text = Path(path).read_text()
    return Grammar(json.loads(text))
