# Copyright © 2017-2026 Juancarlo Añez (apalala@gmail.com)
# SPDX-License-Identifier: Apache-2.0
"""Python interface matching src/api/api.ts, calling the CLI out-of-process."""

from __future__ import annotations

import json
import tempfile
from collections.abc import Generator
from contextlib import contextmanager
from pathlib import Path
from typing import Any

from . import bun
from .tree import Tree
from .ts.types import Grammar


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
    with tempfile.NamedTemporaryFile(
        mode="w+",
        suffix=suffix,
        encoding=encoding,
        delete=True,
    ) as tmp:
        tmp.write(text)
        tmp.flush()
        yield tmp.name


def parse_grammar(
    path: str,
    *,
    trace: bool = False,
    output: str | None = None,
) -> Tree:
    result = bun.run(_build_grammar_args(path, trace=trace), output=output)
    return json.loads(result)


def compile(path: str, *, output: str | None = None) -> Grammar:
    grammar = json.loads(bun.run(["grammar", "-j", path], output=output))
    return Grammar(grammar)


def parse_input(
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


def boot_grammar(*, output: str | None = None) -> Grammar:
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
    return bun.run(["boot", "--pretty"], output=output)


def loads_grammar(json_str: str) -> Grammar:
    return Grammar(json.loads(json_str))


def grammar_pretty(path: str, *, output: str | None = None) -> str:
    return bun.run(["grammar", "--pretty", path], output=output)


def read_grammar(
    path: str,
) -> Grammar:
    text = Path(path).read_text()
    return Grammar(json.loads(text))
