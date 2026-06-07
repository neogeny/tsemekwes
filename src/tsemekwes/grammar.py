from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from . import bun
from .types import Grammar


class GrammarImpl(Grammar):
    # def parse(
    #     self,
    #     text: str,
    #     *,
    #     start: str | None = None,
    #     nproc: int | None = None,
    #     trace: bool = False,
    # ) -> Any:
    #     # TODO: the `run` CLI subcommand reads input files via worker threads
    #     # (fs.readFile), not stdin.  Until the CLI supports "-" for input or
    #     # accepts inline text, we cannot avoid a temp file for the input text.
    #     # Grammar is piped via stdin ("-" path → readPath("-")).
    #     args = ["run", "-", "-j"]
    #     if start:
    #         args += ["-s", start]
    #     if nproc is not None:
    #         args += ["-n", str(nproc)]
    #     if trace:
    #         args.append("-t")
    #     result = bun.run(args, input=self.path)
    #     if result.returncode != 0:
    #         msg = result.stderr.strip() or f"exit {result.returncode}"
    #         raise RuntimeError(f"tsemekwes error: {msg}")
    #     return json.loads(result.stderr.strip())

    def info(self) -> str:
        return self._run_grammar()

    def to_json(self) -> Any:
        return json.loads()

    def pretty(self) -> str:
        return self._run_grammar()

    def _run_grammar(
        self,
        extra: list[str] | None = None,
        *,
        trace: bool = False,
    ) -> str:
        args = ["grammar", "-"]
        if extra:
            args.extend(extra)
        if trace:
            args.append("-t")
        result = bun.run(args, input=self.path)
        if result.returncode != 0:
            msg = result.stderr.strip() or f"exit {result.returncode}"
            raise RuntimeError(f"tsemekwes error: {msg}")
        return result.stderr.strip()
