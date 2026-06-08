# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v0.1.0] 2026-06-07 Release

Initial public release, feature-fairly-complete.

### Added

- [x] PEG grammar parsing and compilation to JSON.
- [x] Fast loading JSON representations of grammars.
- [x] The syntax for regular expressions is the one suported by [XRegExp], as **TatSu**-style grammars have normally used `(?m)` flags to make it easier to define patterns for comments, whitespace, and so on.

[XRegExp]: https://xregexp.com/
- [x] Python API (`boot_grammar`, `compile`, `grammar_pretty`, `loads_grammar`, `parse_grammar`, `parse_inputs`, `read_grammar`) with out-of-process and parallel execution using an embedded [Bun] runtime.

[Bun]: https://bun.com

- [x] CLI tool with `boot`, `grammar`, and parallel `run` subcommands.

  ```bash
  $ bin/emekwes run --help
  Usage: emekwes run [options] <grammar> [inputs...]
  
  execute a grammar against one or more input files
  
  Options:
    -j, --json            output the parse tree in JSON format
    -s, --start <rule>    name of the start rule (default: "start")
    -n, --nproc <number>  number of concurrent workers (default: CPU count)
                          (default: 0)
    -h, --help            display help for command
  
  Global Options:
    -c, --color <when>    control terminal color output (choices: "auto",
                          "always", "never", default: "auto")
    -o, --output <path>   write output to file instead of stdout
    -t, --trace           display a detailed trace of the parsing process
    -q, --quiet           suppress progress bar output
    -V, --version         output the version number
  ```


### Mising

- [ ] Semantic actions: Transforming a node tree during parsing
- [ ] Generation of a class model from definitions in rule parameters.
- [ ] There is no separate generation of a compilable parser. JSON models are the way to persist and reuse compiled EBNF, and JSON is already `JavaScript`. 

[Unreleased]: https://github.com/neogeny/tsemekwes/compare/v0.1.0...HEAD
[v0.1.0]: https://github.com/neogeny/tsemekwes/releases/tag/v0.1.0
