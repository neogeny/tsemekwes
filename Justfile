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
    biome format --write .

# Check both structural code metrics and type definitions
lint: fmt
    biome lint --write .
    bun x tsc --noEmit

# Compile the TypeScript codebase down into a single high-performance binary artifact
build: clean
    bun build ./src/cmd/cli.ts --outdir ./dist --target bun

# Execute a specific script file instantly through the native bun runtime engine
run script:
    bun run -- {{ script }}

# Run the entire test pipeline directly using Bun
test:
    bun test src/**/*.test.ts src/**/__tests__/*.test.ts
