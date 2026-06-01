# Set the shell to bash and enable 'pipefail' to catch errors early
set shell := ["bash", "-uc"]

# Default target: lists all available workspace commands
default:
    @just --list

# Check for non-default dependencies and install them globally if missing
[private]
tools:
    @command -v tsx >/dev/null 2>&1 || (echo "Installing 'tsx' for fast TS execution..." && npm install -g tsx)
    @command -v tsc >/dev/null 2>&1 || (echo "Installing TypeScript compiler..." && npm install -g typescript)

# Start development file-watcher mode for your CLI entry point
dev path="src/cli.ts": tools
    tsx watch {{ path }}

# Clean build artifacts
clean:
    rm -rf dist/

# Compile the TypeScript library and CLI code for production distribution
build: clean tools
    tsc

# Execute a specific script file instantly through the tsx runtime engine
run script: tools
    tsx {{ script }}

test: test-unit test-integration

# Optional: Split them up if you want to run them independently
test-unit: tools
    tsx --test src/**/*.test.ts

test-integration: tools
    @if [ -d "tests" ]; then \
        tsx --test tests/**/*.test.ts; \
    else \
        echo "No tests directory found. Create tests/ to run verification pipelines."; \
    fi
