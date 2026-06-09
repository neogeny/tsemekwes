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
    bun x biome format --semicolons=as-needed {{ src }} --write

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
        {{ src }}/tsemekwes.ts {{ src }}/cmd/parse-worker.ts \
        --outdir {{ bundist }} --target bun

bundle: build
    bun build \
        {{ src }}/tsemekwes.ts \
        {{ src }}/cmd/parse-worker.ts \
        --compile \
        --minify --sourcemap \
        --outfile  bin/tsemekwes

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
    # curl -fsSL https://bun.com/install | bash
    bun install typescript
    bun install bun-types
    bun install biome

py-types:
    uv run ts2python {{ srcpy }}/tsemekwes/types.ts \
      -o {{ srcpy }}/tsemekwes/ts/ --compatibility 3.12

py-doc:
    uv run -m pdoc -o doc -d markdown \
    tsemekwes \
    tsemekwes.api \
    tsemekwes.peg \
    tsemekwes.tree

py-build: build
    uvx hatch build --no-hooks

# Trigger a test publish to PyPI via GitHub Actions
py-publish-test: py-build
    gh workflow run testpublish.yml
    gh run list --workflow=testpublish.yml

# Trigger a production publish to PyPI via GitHub Actions
py-publish: py-build
    gh workflow run publish.yml
    gh run list --workflow=publish.yml
