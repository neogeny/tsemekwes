# ꘩TS’emekwes
**꘩TS’emekwes** A PEG parser generator in `TypeScript`

**꘩TS’emekwes** is the Go sibling of [竜TatSu] (Python), [⻰OGoPEGo] (Go), and [铁修TieXiu] (Rust). It is functionally complete and passes the same test suite as its siblings.

[竜TatSu]: https://github.com/neogeny/tatsu
[铁修TieXiu]: https://github.com/neogeny/tiexiu
[⻰OGoPEGo]: https://github.com/neogeny/ogopego

Refer to the [竜TatSu documentation] for grammar syntax, semantics, and usage. The local [SYNTAX.md](SYNTAX.md) describes the grammar format.

[竜TatSu documentation]: https://tatsu.readthedocs.io/

The CLI tool is a great way to explored the features offered by the library:

```bash
$ emekwes --help
```


## Implementation
* The syntax for regular expressions is the one suported by [XRegExp], as **TatSu**-style grammars have normally used `(?m)` flags to make it easier to define patterns for comments, whitespace, and so on.

[XRegExp]: https://xregexp.com/
