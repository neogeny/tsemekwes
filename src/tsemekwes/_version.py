# Copyright © 2017-2026 Juancarlo Añez (apalala@gmail.com)
# SPDX-License-Identifier: BSD-4-Clause

from __future__ import annotations

import importlib.metadata

from .util import Version

__toolname__ = "TSemekwes"

try:
    __toolname__ = importlib.metadata.metadata(__toolname__)["name"]
    __version__ = importlib.metadata.version(__toolname__)
except importlib.metadata.PackageNotFoundError:
    __version__ = "0.1.0"

version = __version__
version_info = Version.parse(version).astuple()
