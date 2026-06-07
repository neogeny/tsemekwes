from __future__ import annotations

import json
import subprocess
import sys
import tempfile
from pathlib import Path
from typing import Any

BUNDIST = "bundist"


def _project_root() -> Path:
    return Path(__file__).resolve().parent.parent.parent


tsemekwes_js = _project_root() / BUNDIST / "tsemekwes.js"


def _cmd(args: list[str]) -> list[str]:
    return [sys.executable, "-m", "pybun", "run", str(tsemekwes_js), *args]


def run(args: list[str], **kwargs: Any) -> subprocess.CompletedProcess:
    kwargs.setdefault("capture_output", True)
    kwargs.setdefault("text", True)
    return subprocess.run(_cmd(args), **kwargs)


def exec(args: list[str]) -> int:
    import os

    os.execv(sys.executable, _cmd(args))


def run_json(args: list[str]) -> Any:
    with tempfile.NamedTemporaryFile(mode="r", suffix=".json", delete=False) as f:
        out_path = f.name
    try:
        result = run([*args, "-o", out_path])
        if result.returncode != 0:
            msg = result.stderr.strip() or f"exit {result.returncode}"
            raise RuntimeError(f"tsemekwes error: {msg}")
        return json.loads(Path(out_path).read_text())
    finally:
        Path(out_path).unlink(missing_ok=True)
