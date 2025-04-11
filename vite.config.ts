/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from "vite-plugin-mkcert"


// Dynamically determine the base path from the environment variable or use '/' by default
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [
      react(), 
      mkcert()
    ],
    base: env.VITE_BASE_PATH || '/', // Set the base path dynamically from the environment variable
    test: {
      include: ["./src/**/*.test.*"],
      exclude: ["./tests/e2e/*"],
      environment: 'jsdom',
      globals: true,         // Enable global test functions      
      setupFiles: './src/setupTests.ts',
    },
  };
});