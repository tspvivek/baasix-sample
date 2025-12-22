import { startMCPServer } from "@tspvivek/baasix-mcp-server";

if (import.meta.url === `file://${process.argv[1]}`) {
  startMCPServer().catch((error) => {
    console.error('Failed to start MCP server:', error);
    process.exit(1);
  });
}
