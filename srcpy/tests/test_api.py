"""Tests for the high-level Python API functions.

Matches the actual API surface in srcpy/tsemekwes/api.py.
"""

from __future__ import annotations

import json
from pathlib import Path

import pytest
from tsemekwes.api import (
    boot_grammar,
    boot_pretty,
    compile,
    grammar_pretty,
    loads_grammar,
    parse_grammar,
    parse_inputs,
    read_grammar,
    temp_path_from_text,
)


class TestParseGrammar:
    """parseGrammar(path, *, trace=False, output=None) -> Tree"""

    def test_parse_grammar_returns_tree(self, simple_grammar: str):
        with temp_path_from_text(simple_grammar, suffix=".ebnf") as path:
            tree = parse_grammar(path)
            assert tree is not None
            assert isinstance(tree, dict | list)

    def test_parse_grammar_returns_dict(self, simple_grammar: str):
        with temp_path_from_text(simple_grammar, suffix=".ebnf") as path:
            tree = parse_grammar(path)
            assert isinstance(tree, dict)

    def test_parse_grammar_with_directives(self, grammar_with_directives: str):
        with temp_path_from_text(grammar_with_directives, suffix=".ebnf") as path:
            tree = parse_grammar(path)
            if isinstance(tree, dict):
                assert "name" in tree or "directives" in str(tree)


class TestBootGrammar:
    """bootGrammar(*, output=None) -> Grammar

    Calls bun run tsemekwes.js boot --json.
    Grammar is a TypedDict (dict subclass) with keys: name, directives, keywords, rules.
    """

    def test_boot_grammar_is_dict(self):
        grammar = boot_grammar()
        assert isinstance(grammar, dict)

    def test_boot_grammar_has_expected_keys(self):
        grammar = boot_grammar()
        assert "name" in grammar
        assert "rules" in grammar

    def test_boot_grammar_has_rules_list(self):
        grammar = boot_grammar()
        assert isinstance(grammar["rules"], list)

    def test_boot_grammar_name_is_str(self):
        grammar = boot_grammar()
        assert isinstance(grammar.get("name"), str)

    def test_boot_pretty_returns_string(self):
        result = boot_pretty()
        assert isinstance(result, str)
        assert len(result) > 0


class TestCompileGrammar:
    """compileGrammar(path, *, output=None) -> Grammar

    Calls bun run tsemekwes.js grammar -j <path>.
    """

    def test_compile_from_file(self, grammar_file: Path):
        grammar = compile(str(grammar_file))
        assert isinstance(grammar, dict)

    def test_compiled_grammar_has_name(self, grammar_file: Path):
        grammar = compile(str(grammar_file))
        assert grammar.get("name") == "Simple"

    def test_compiled_grammar_has_rules(self, grammar_file: Path):
        grammar = compile(str(grammar_file))
        assert "rules" in grammar
        assert isinstance(grammar["rules"], list)

    def test_compile_calc_grammar(self, calc_grammar_file: Path):
        grammar = compile(str(calc_grammar_file))
        assert grammar.get("name") == "Calc"

    def test_compile_nonexistent_file_fails(self):
        with pytest.raises((ValueError, OSError, Exception)):
            compile("/nonexistent/path.ebnf")


class TestParseInput:
    """parse_inputs(path, inputs, *, start=None, nproc=None, trace=False, output=None) -> list[Tree]

    Calls bun run tsemekwes.js run -j [start] [nproc] [trace] <path> <inputs...>.

    inputs are file paths — the CLI reads input text from those files.
    Returns one parse Tree per input file (JSONL on stdout).
    """

    def test_parse_input_returns_list(self, grammar_file: Path, tmp_path: Path):
        input_file = tmp_path / "input.txt"
        input_file.write_text("hello")
        result = parse_inputs(str(grammar_file), [str(input_file)])
        assert isinstance(result, list)
        assert len(result) == 1

    def test_parse_with_start_rule(self, grammar_file: Path, tmp_path: Path):
        input_file = tmp_path / "input.txt"
        input_file.write_text("hello")
        result = parse_inputs(str(grammar_file), [str(input_file)], start="start")
        assert isinstance(result, list)
        assert len(result) == 1

    def test_parse_invalid_input_fails(self, grammar_file: Path, tmp_path: Path):
        input_file = tmp_path / "input.txt"
        input_file.write_text("world")
        with pytest.raises((ValueError, Exception)):
            parse_inputs(str(grammar_file), [str(input_file)])

    def test_parse_multiple_inputs(self, grammar_file: Path, tmp_path: Path):
        input_file = tmp_path / "input.txt"
        input_file.write_text("hello")
        result = parse_inputs(
            str(grammar_file), [str(input_file), str(input_file)], nproc=1
        )
        assert isinstance(result, list)
        assert len(result) == 2


class TestLoadGrammar:
    """loadGrammarFromJSON(json_str) -> Grammar
    loadGrammarFromPath(path) -> Grammar

    These are pure-Python (no subprocess) — they read JSON and construct a Grammar TypedDict.
    """

    def test_load_from_json(self):
        json_str = '{"name": "Test", "directives": {}, "keywords": [], "rules": []}'
        grammar = loads_grammar(json_str)
        assert grammar.get("name") == "Test"

    def test_load_from_path(self):
        data = '{"name": "Test", "directives": {}, "keywords": [], "rules": []}'
        with temp_path_from_text(data, suffix=".json") as path:
            grammar = read_grammar(path)
            assert isinstance(grammar, dict)

    def test_load_from_path_matches_compile(self, grammar_file: Path):
        from_compile = compile(str(grammar_file))
        json_str = json.dumps(from_compile)
        with temp_path_from_text(json_str, suffix=".json") as path:
            from_path = read_grammar(path)
            assert from_path == from_compile

    def test_load_roundtrip(self):
        data = {"name": "X", "directives": {}, "keywords": [], "rules": []}
        json_str = json.dumps(data)
        loaded = loads_grammar(json_str)
        assert loaded == data


class TestGrammarPretty:
    """grammarPretty(path, *, output=None) -> str

    Calls bun run tsemekwes.js grammar --pretty <path>.
    """

    def test_grammar_pretty_returns_string(self, grammar_file: Path):
        result = grammar_pretty(str(grammar_file))
        assert isinstance(result, str)
        assert len(result) > 0

    def test_grammar_pretty_calc(self, calc_grammar_file: Path):
        result = grammar_pretty(str(calc_grammar_file))
        assert isinstance(result, str)
