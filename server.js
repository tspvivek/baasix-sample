/**
 * Baasix Server Entry Point
 * 
 * This is the main entry point for your Baasix-powered application.
 * It imports and starts the server from the @tspvivek/baasix package.
 */

import { startServer } from "@tspvivek/baasix";

// Start the server with proper error handling
startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
