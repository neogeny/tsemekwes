# Set the shell to bash and enable 'pipefail' to catch errors early
set shell := ["bash", "-uc"]

# Default target: lists all available workspace commands
default:
    @just --list

# Check for non-default dependencies and install them globally if missing
[private]
tools:
    @command -v bun >/dev/null 2>&1 || (echo "Installing Bun..." && npm install -g bun)
    @command -v tsx >/dev/null 2>&1 || (echo "Installing 'tsx'..." && npm install -g tsx)
    @command -v tsc >/dev/null 2>&1 || (echo "Installing TypeScript..." && npm install -g typescript)
    @command -v prettier >/dev/null 2>&1 || (echo "Installing Prettier..." && npm install -g prettier)
    @command -v eslint >/dev/null 2>&1 || (echo "Installing ESLint..." && npm install -g eslint)
    @command -v biome >/dev/null 2>&1 || (echo "Installing Biome linter/formatter..." && npm install -g @biomejs/biome)

# Start development file-watcher mode for your CLI entry point
dev path="src/cli.ts": tools
    tsx watch {{ path }}

# Clean build artifacts
clean:
    rm -rf dist/

fmt:
    npx prettier --quiet --write "**/*.ts"

# Run both the ESLint and Biome code-quality linters
lint: tools fmt
    @biome check --write .
    @eslint . --fix

# Compile the TypeScript library and CLI code for production distribution
build: clean tools
    tsc

# Execute a specific script file instantly through the tsx runtime engine
run script: tools
    tsx {{ script }}

test: test-unit test-integration

# Optional: Split them up if you want to run them independently
test-unit: lint
    tsx --test src/**/*.test.ts

test-integration: lint
    @if [ -d "tests" ]; then \
        tsx --test tests/**/*.test.ts; \
    else \
        echo "No tests directory found. Create tests/ to run verification pipelines."; \
    fi
