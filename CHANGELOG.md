# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v0.1.0] 2026-06-07 Release

### Added

- Initial public release, feature-complete.
- PEG grammar parsing and compilation to JSON.
- CLI tool with `boot`, `grammar`, and `run` subcommands.
- Python API (`parse_grammar`, `compile`, `parse_inputs`, `boot_grammar`, `grammar_pretty`, `read_grammar`, `loads_grammar`).
- JSONL multi-input support with stream separation (stdout for data, stderr for diagnostics).
- Bootstrap grammar self-compilation.

[Unreleased]: https://github.com/neogeny/tsemekwes/compare/v0.1.0...HEAD
[v0.1.0]: https://github.com/neogeny/tsemekwes/releases/tag/v0.1.0
