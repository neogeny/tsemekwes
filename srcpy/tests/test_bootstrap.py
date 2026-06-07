"""Tests for grammar parsing — mirrors src/__tests__/bootstrap.test.ts.

Adjusted for the actual Python API surface.
parseGrammar returns json.loads() of the CLI's stderr output — a dict or list.
"""

from __future__ import annotations

import json

import pytest
from tsemekwes.api import bootGrammar, parseGrammar, temp_path_from_text


def _as_str(tree: dict | list) -> str:
    return json.dumps(tree).lower()


class TestParseGrammar:
    def test_simple_grammar(self):
        with temp_path_from_text("@@grammar :: Simple\nstart: 'hello'", suffix=".ebnf") as path:
            tree = parseGrammar(path)
            assert isinstance(tree, dict)
            assert tree.get("name") == "Simple"

    def test_multiple_rules(self):
        grammar = """\
@@grammar :: Multi
start = a | b | c ;
a = 'a' ;
b = 'b' ;
c = 'c' ;"""
        with temp_path_from_text(grammar, suffix=".ebnf") as path:
            tree = parseGrammar(path)
            assert isinstance(tree, dict)
            assert "rules" in tree

    def test_directive(self):
        grammar = """\
@@grammar :: Directives
@@whitespace :: /\\s+/
start: 'hello'"""
        with temp_path_from_text(grammar, suffix=".ebnf") as path:
            tree = parseGrammar(path)
            s = _as_str(tree)
            assert "whitespace" in s


class TestParseExpressions:
    def test_token(self):
        with temp_path_from_text("@@grammar :: T start: 'foo' 'bar'", suffix=".ebnf") as path:
            tree = parseGrammar(path)
            s = _as_str(tree)
            assert "token" in s

    def test_pattern(self):
        with temp_path_from_text("@@grammar :: P start: /\\d+/", suffix=".ebnf") as path:
            tree = parseGrammar(path)
            s = _as_str(tree)
            assert "pattern" in s

    def test_choice(self):
        with temp_path_from_text("@@grammar :: C start: 'a' | 'b' | 'c'", suffix=".ebnf") as path:
            tree = parseGrammar(path)
            s = _as_str(tree)
            assert "choice" in s


class TestIntegration:
    def test_complex_grammar(self):
        grammar = """\
@@grammar :: Complex
@@whitespace :: /\\s+/
start = expression ;
expression = term ('+' term)* | term ('-' term)* ;
term = factor ('*' factor)* | factor ('/' factor)* ;
factor = NUMBER | '(' expression ')' ;
NUMBER = /\\d+/ ;"""
        with temp_path_from_text(grammar, suffix=".ebnf") as path:
            tree = parseGrammar(path)
            assert isinstance(tree, dict)
            assert tree.get("name") == "Complex"

    def test_boot_grammar_structure(self):
        grammar = bootGrammar()
        assert "name" in grammar
        assert "rules" in grammar
        assert len(grammar["rules"]) > 0


class TestErrorHandling:
    def test_invalid_grammar_raises(self):
        with temp_path_from_text("@@grammar :: Broken\nstart: <%%%>", suffix=".ebnf") as path:
            with pytest.raises((ValueError, Exception)):
                parseGrammar(path)

    def test_empty_grammar_raises(self):
        with temp_path_from_text("", suffix=".ebnf") as path:
            with pytest.raises((ValueError, Exception)):
                parseGrammar(path)
