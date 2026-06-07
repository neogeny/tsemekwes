# Copyright © 2017-2026 Juancarlo Añez (apalala@gmail.com)
# SPDX-License-Identifier: Apache-2.0
import subprocess
import sys

subprocess.call([sys.executable, "-m", "pybun", *sys.argv[1:]])
