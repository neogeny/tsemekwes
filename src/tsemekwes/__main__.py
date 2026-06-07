import sys

from tsemekwes.bun import exec


def main() -> int:
    return exec(sys.argv[1:] if len(sys.argv) > 1 else ["--help"])


if __name__ == "__main__":
    sys.exit(main())
