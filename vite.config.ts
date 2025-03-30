import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dynamically determine the base path from the environment variable or use '/' by default
const basePath = process.env.VITE_BASE_PATH || '/';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: basePath, // Set the base path for your app
})
