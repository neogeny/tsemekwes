from __future__ import annotations

import tempfile
from pathlib import Path

from tsemekwes import bun


class Grammar:
    _path: Path

    def __init__(self, path: Path) -> None:
        self._path = path

    @classmethod
    def load(cls, path: str | Path) -> Grammar:
        return cls(Path(path))

    def parse(self, text: str, *, start: str | None = None) -> list[str]:
        from tsemekwes.parse import parse

        return parse(self._path, text, start=start)

    def info(self) -> str:
        return self._run_grammar()

    def to_json(self) -> dict:
        return dict(bun.run_json(["grammar", str(self._path), "-j"]))

    def pretty(self) -> str:
        return self._run_grammar()

    def _run_grammar(self) -> str:
        with tempfile.NamedTemporaryFile(
            mode="r", suffix=".txt", delete=False
        ) as f:
            out_path = f.name
        try:
            result = bun.run(["grammar", str(self._path), "-o", out_path])
            if result.returncode != 0:
                msg = result.stderr.strip() or f"exit {result.returncode}"
                raise RuntimeError(f"tsemekwes error: {msg}")
            return Path(out_path).read_text()
        finally:
            Path(out_path).unlink(missing_ok=True)
