| Plugin | Identifier (for `opencode.json`) | Description | Typical Setup/Init |
| :--- | :--- | :--- | :--- |
| **Oh My Openagent** | `oh-my-openagent` | An all-in-one multi-agent harness for complex codebases and workflow orchestration. | `bunx oh-my-openagent install` |
| **OpenCode Memory** | `opencode-mem` | Adds persistent, cross-session vector-based memory for context retention. | Added to config; auto-downloads |
| **Type Inject** | `opencode-type-inject` | Injects TypeScript signatures and reports type errors in real-time. | `npx @opencode/type-inject setup` |
| **Context7** | `context7` | Injects version-specific, official documentation to prevent hallucinations. | `npx ctx7 setup --opencode` |
| **OpenCode PTY** | `opencode-pty` | Provides interactive terminal support for long-running background processes. | Added to config |
| **Composio (MCP)** | `composio` | Connects OpenCode to external tools and APIs via the Model Context Protocol. | `opencode mcp auth composio` |
