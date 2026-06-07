# Set the shell to bash and enable 'pipefail' to catch errors early

set shell := ["bash", "-uc"]

# Default target: lists all available workspace commands
default:
    @just --list

# Start development file-watcher mode for your CLI entry point
dev path="src/cmd/cli.ts":
    bun --watch run {{ path }}

# Clean build artifacts
clean:
    rm -rf dist/

# Format code with Biome
fmt:
    bun x biome format src/ --write

# Check both structural code metrics and type definitions
lint: fmt
    bun x tsc --noEmit
    bun x biome check --write ./src

# Compile the TypeScript codebase down into a single high-performance binary artifact
build: clean lint
    bun tsc --declaration --emitDeclarationOnly --outDir ./dist
    bun build \
      ./src/tsemekwes.ts \
      ./src/cmd/parse-worker.ts \
      --outdir ./dist --target bun

# Execute a specific script file instantly through the native bun runtime engine
run script:
    bun run -- {{ script }}

# Run the entire test pipeline directly using Bun
test: build
    bun test --only-failures --dots \
      src/__tests__/*.test.ts \
      src/__tests__/**/*.test.ts \
      src/**/__tests__/*.test.ts \
      src/**/*.test.ts

prof script:
    node --prof --cpu-prof {{ script }}

tools:
    curl -fsSL https://bun.com/install | bash
    bun install npm
    bun npm install typescript
    bun install bun-types
    bun install biome
