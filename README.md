# ꘩TS’emekwes
**꘩TS’emekwes** A PEG parser generator in `TypeScript`

**꘩TS’emekwes** is the Go sibling of [竜TatSu] (Python), [⻰OGoPEGo] (Go), and [铁修TieXiu] (Rust). It is functionally complete and passes the same test suite as its siblings.

[竜TatSu]: https://github.com/neogeny/tatsu
[铁修TieXiu]: https://github.com/neogeny/tiexiu
[⻰OGoPEGo]: https://github.com/neogeny/ogopego

Refer to the [竜TatSu documentation] for grammar syntax, semantics, and usage. The local [SYNTAX.md](SYNTAX.md) describes the grammar format.

[竜TatSu documentation]: https://tatsu.readthedocs.io/

See the [CHANGELOG](CHANGELOG.md) for a list of present and pending features.

The CLI tool is a great way to explored the features offered by the library:

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

## License

Licensed under the Apache License, Version 2.0 ([LICENSE](LICENSE) or http://www.apache.org/licenses/LICENSE-2.0).

### Contribution

Unless explicitly stated otherwise, any contribution intentionally submitted
for inclusion in the work, as defined in the Apache-2.0 license, shall be
licensed as above, without any additional terms or conditions.
