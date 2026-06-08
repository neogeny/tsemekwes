# Copyright © 2017-2026 Juancarlo Añez (apalala@gmail.com)
# SPDX-License-Identifier: Apache-2.0
"""TS'emekwes — a PEG parser generator for TypeScript.

Parse grammar files, compile them into Grammar objects, and
parse input files against compiled grammars.

All type annotations (Grammar, Rule, AnyExp, etc.) use TypedDict
and map directly to the JSON serialization format.

Usage:

```python
    from tsemekwes import api
```
"""

from . import __version__, api, peg, tree  # noqa: F401
from .__version__ import __toolname__, __version__
from .api import (
    boot_grammar,
    boot_pretty,
    compile,
    loads_grammar,
    parse_grammar,
    parse_inputs,
    read_grammar,
)
from .peg import Exp, Grammar, Rule
from .tree import Tree

__all__ = [
    "__toolname__",
    "__version__",
    "boot_grammar",
    "boot_pretty",
    "compile",
    "Exp",
    "Grammar",
    "loads_grammar",
    "parse_grammar",
    "parse_inputs",
    "read_grammar",
    "Rule",
    "Tree",
]
