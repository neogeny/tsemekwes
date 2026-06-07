# Copyright © 2017-2026 Juancarlo Añez (apalala@gmail.com)
# SPDX-License-Identifier: Apache-2.0
from __future__ import annotations

import json
from typing import Any

from .types import Grammar


class GrammarImpl:
    def __init__(self, grammar: Grammar):
        self._grammar = grammar

    def json(self) -> Any:
        return json.loads(str(self))

    def __str__(self) -> str:
        return json.dumps(self._grammar)
