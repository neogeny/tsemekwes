# Copyright © 2017-2026 Juancarlo Añez (apalala@gmail.com)
# SPDX-License-Identifier: Apache-2.0
import sys

from tsemekwes.bun import exec


def main() -> int:
    return exec(sys.argv[1:] if len(sys.argv) > 1 else ["--help"])


if __name__ == "__main__":
    sys.exit(main())
