# Copyright © 2017-2026 Juancarlo Añez (apalala@gmail.com)
# SPDX-License-Identifier: Apache-2.0
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path
from subprocess import CompletedProcess
from typing import Any

BUNDIST = "bundist"


def _project_root() -> Path:
    return Path(__file__).resolve().parent.parent.parent


tsemekwes_js = _project_root() / BUNDIST / "tsemekwes.js"


def _cmd(args: list[str]) -> list[str]:
    return [
        sys.executable,
        "-m",
        "pybun",
        "run",
        str(tsemekwes_js),
        "--quiet",
        *args,
    ]


def run(args: list[str], output: str | None = None) -> str:
    if output is not None:
        args = ["-o", output, *args]
    cp = subprocess.run(_cmd(args), capture_output=True, text=True)
    return check_output(cp)


def exec(args: list[str]) -> int:
    import os

    os.execv(sys.executable, _cmd(args))


def check_output(cp: CompletedProcess) -> str:
    if cp.returncode != 0:
        msg = cp.stderr.strip() or f"exit {cp.returncode}"
        raise ValueError(f"tsemekwes error: {msg}")
    return cp.stderr.strip()


def run_json(args: list[str]) -> Any:
    result = run(args)
    if result.returncode != 0:
        msg = result.stderr.strip() or f"exit {result.returncode}"
        raise RuntimeError(f"tsemekwes error: {msg}")
    return json.loads(result.stderr.strip())
