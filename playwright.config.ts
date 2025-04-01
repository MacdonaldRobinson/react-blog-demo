import {defineConfig} from "@playwright/test"

export default defineConfig({
    testDir: './tests/e2e/', // Ensure you have a tests directory
    use: {
      baseURL: 'http://localhost:5173', // Set this to your local dev server
      headless: true,
    },
    webServer: {
      command: 'npm run dev', // Ensure this is your Vite dev command
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
    },
  });
  