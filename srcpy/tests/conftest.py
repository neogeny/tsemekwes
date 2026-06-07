from __future__ import annotations

import sys
from pathlib import Path

import pytest

# Ensure the package under srcpy/ is importable
_this_dir = Path(__file__).resolve().parent
_srcpy = _this_dir.parent
if str(_srcpy) not in sys.path:
    sys.path.insert(0, str(_srcpy))


@pytest.fixture
def simple_grammar() -> str:
    return """\
@@grammar :: Simple
start: 'hello'
"""


@pytest.fixture
def grammar_with_directives() -> str:
    return """\
@@grammar :: Directives
@@whitespace :: /\\s+/
@@ignorecase :: True
start: 'hello'
"""


@pytest.fixture
def grammar_file(simple_grammar: str, tmp_path: Path) -> Path:
    p = tmp_path / "test.ebnf"
    p.write_text(simple_grammar)
    return p


@pytest.fixture
def calc_grammar_file(tmp_path: Path) -> Path:
    grammar = """\
@@grammar :: Calc
@@whitespace :: /\\s+/
start = expression $ ;
expression = term ('+' term)* ;
term = factor ('*' factor)* ;
factor = NUMBER | '(' expression ')' ;
NUMBER = /\\d+/ ;
"""
    p = tmp_path / "calc.ebnf"
    p.write_text(grammar)
    return p
