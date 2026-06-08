# Copyright © 2017-2026 Juancarlo Añez (apalala@gmail.com)
# SPDX-License-Identifier: Apache-2.0
"""Python interface matching src/api/api.ts, calling the CLI out-of-process."""

from __future__ import annotations

import json
import tempfile
from collections.abc import Generator
from contextlib import contextmanager
from pathlib import Path

from . import bun
from .peg import Grammar
from .tree import Tree


def _build_grammar_args(
    path: str,
    *,
    trace: bool = False,
) -> list[str]:
    args = ["grammar", "-j", path]
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


@contextmanager
def temp_path_from_text(
    text: str, suffix: str = ".ebnf", encoding: str = "utf-8"
) -> Generator:
    """Write text to a temp file and yield its path. Cleans up on exit."""
    with tempfile.NamedTemporaryFile(
        mode="w+",
        suffix=suffix,
        encoding=encoding,
        delete=True,
    ) as tmp:
        tmp.write(text)
        tmp.flush()
        yield tmp.name


def parse_jsonl(s: str) -> list[Tree]:
    """Parse JSON Lines: one JSON value per line."""
    result: list[Tree] = []
    for line in s.strip().splitlines():
        line = line.strip()
        if not line:
            continue
        result.append(json.loads(line))
    return result


def parse_grammar(
    path: str,
    *,
    trace: bool = False,
    output: str | None = None,
) -> Tree:
    """Parse a grammar file and return the parse tree."""
    result = bun.run(_build_grammar_args(path, trace=trace), output=output)
    return json.loads(result)


def compile(path: str, *, output: str | None = None) -> Grammar:
    """Compile a grammar file into a Grammar."""
    grammar = json.loads(bun.run(["grammar", "-j", path], output=output))
    return Grammar(grammar)


def parse_inputs(
    path: str,
    inputs: list[str],
    *,
    start: str | None = None,
    nproc: int | None = None,
    trace: bool = False,
    output: str | None = None,
) -> list[Tree]:
    """Parse each input file against the grammar, return one Tree per input (JSONL)."""
    result = bun.run(
        _build_run_args(path, inputs, start=start, nproc=nproc, trace=trace),
        output=output,
    )
    trees = parse_jsonl(result)
    if len(trees) != len(inputs):
        raise ValueError(
            f"parse_inputs: expected {len(inputs)} result(s), got {len(trees)}"
        )
    return trees


def boot_grammar(*, output: str | None = None) -> Grammar:
    """Get the bootstrapped TS'emekwes grammar."""
    if output is not None:
        result = bun.run(["boot", "--json"], output=output)
    else:
        with tempfile.NamedTemporaryFile(
            mode="w+", suffix=".json", encoding="utf-8", delete=True
        ) as tmp:
            bun.run(["boot", "--json"], output=tmp.name)
            result = Path(tmp.name).read_text()
    return Grammar(json.loads(result))


def boot_pretty(*, output: str | None = None) -> str:
    """Get the bootstrapped grammar as a pretty-printed string."""
    return bun.run(["boot", "--pretty"], output=output)


def loads_grammar(json_str: str) -> Grammar:
    """Deserialize a JSON string into a Grammar."""
    return Grammar(json.loads(json_str))


def grammar_pretty(path: str, *, output: str | None = None) -> str:
    """Pretty-print a compiled grammar file."""
    return bun.run(["grammar", "--pretty", path], output=output)


def read_grammar(
    path: str,
) -> Grammar:
    """Read a compiled grammar JSON file as a Grammar."""
    text = Path(path).read_text()
    return Grammar(json.loads(text))
