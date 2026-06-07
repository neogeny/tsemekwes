import sys, subprocess

subprocess.call([sys.executable, "-m", "pybun", *sys.argv[1:]])
