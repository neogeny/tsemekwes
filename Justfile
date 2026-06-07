# Set the shell to bash and enable 'pipefail' to catch errors early

set shell := ["bash", "-uc"]

dist := "./dist/"
tsdist := "./tsdist/"
bundist := "./bundist/"
src := "./src"
srcpy := "./srcpy"

# Default target: lists all available workspace commands
default:
    @just --list

# Clean build artifacts
clean:
    rm -rf {{ dist }} {{ bundist }} {{ tsdist }}

# Format code with Biome
fmt:
    bun x biome format {{ src }} --write

# Check both structural code metrics and type definitions
lint: fmt
    bun x tsc --noEmit
    bun x biome check --write {{ src }}

# Compile the TypeScript codebase down into a single high-performance binary artifact
build: clean lint
    bun tsc \
         --outDir {{ tsdist }} \
        --declaration --emitDeclarationOnly
    bun build \
      {{ src }}/tsemekwes.ts \
      {{ src }}/cmd/parse-worker.ts \
      --outdir {{ bundist }} --target bun
    bun build \
        {{ src }}/tsemekwes.ts \
        {{ src }}/cmd/parse-worker.ts \
        --compile --minify --outfile bin/emekwes

# Execute a specific script file instantly through the native bun runtime engine
run script:
    bun run -- {{ script }}

# Run the entire test pipeline directly using Bun
test: build
    bun test --only-failures --dots \
      {{ src }}/__tests__/*.test.ts \
      {{ src }}/__tests__/**/*.test.ts \
      {{ src }}/**/__tests__/*.test.ts \
      {{ src }}/**/*.test.ts

prof script:
    node --prof --cpu-prof {{ script }}

tools:
    curl -fsSL https://bun.com/install | bash
    bun install npm
    bun npm install typescript
    bun install bun-types
    bun install biome

py-types:
    uv run ts2python {{ srcpy }}/tsemekwes/types.ts \
      -o {{ srcpy }}/tsemekwes --compatibility 3.12

# Build Python distribution packages (sdist + wheel)
py-package: build py-types
    uvx hatch build

# Trigger a test publish to PyPI via GitHub Actions
py-publish-test: py-package
    gh workflow run test_publish.yml
    gh run list --workflow=test_publish.yml

# Trigger a production publish to PyPI via GitHub Actions
py-publish: py-package
    gh workflow run publish.yml
    gh run list --workflow=publish.yml
