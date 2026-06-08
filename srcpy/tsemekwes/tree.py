# Copyright © 2017-2026 Juancarlo Añez (apalala@gmail.com)
# SPDX-License-Identifier: Apache-2.0

"""Recursive JSON-like type representing a parse tree."""

type Tree = dict[str, Tree] | list[Tree] | str | int | float | bool | None
