export * from "./api/index.js"
export * from "./config/index.js"
export * from "./context/index.js"
export * from "./input/index.js"
export * from "./peg/index.js"
export * from "./trees/index.js"
export * from "./util/index.js"

import { cli_main } from "./cmd/cli"

async function main() {
  await cli_main()
}

await main()
