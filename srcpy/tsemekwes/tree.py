# Copyright © 2017-2026 Juancarlo Añez (apalala@gmail.com)
# SPDX-License-Identifier: Apache-2.0

"""Recursive JSON-like type representing a parse tree."""

from typing import TypedDict

type Tree = dict[str, Tree] | list[Tree] | object | str | int | float | bool | None


class TreeNode(TypedDict):
    __class__: str  # pyright: ignore[reportIncompatibleMethodOverride]
    ast: Tree
