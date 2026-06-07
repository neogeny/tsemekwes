from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from tsemekwes import bun


def parse(
    grammar: str | Path,
    text: str,
    *,
    start: str | None = None,
    trace: bool = False,
) -> Any:
    # TODO: the `run` CLI subcommand reads input files via worker threads
    # (fs.readFile), not stdin.  Until the CLI supports "-" for input or
    # accepts inline text, a temp file is required for the input text.
    grammar_path = Path(grammar)
    args = ["run", str(grammar_path), "-j"]
    if start:
        args += ["-s", start]
    if trace:
        args.append("-t")

    result = bun.run(args)
    if result.returncode != 0:
        msg = result.stderr.strip() or f"exit {result.returncode}"
        raise RuntimeError(f"tsemekwes error: {msg}")
    return json.loads(result.stderr.strip())
