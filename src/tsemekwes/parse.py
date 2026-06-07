from __future__ import annotations

import tempfile
from pathlib import Path

from tsemekwes import bun


def parse(
    grammar: str | Path,
    text: str,
    *,
    start: str | None = None,
    trace: bool = False,
) -> list[str]:
    grammar = Path(grammar)
    args = ["run", str(grammar), "-j"]
    if start:
        args += ["-s", start]
    if trace:
        args.append("-t")

    if text:
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".txt", delete=False
        ) as f:
            input_path = f.name
            f.write(text)
        args.append(input_path)
    try:
        return list(bun.run_json(args))
    finally:
        if text:
            Path(input_path).unlink(missing_ok=True)
