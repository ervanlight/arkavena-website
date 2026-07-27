import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
    // Playwright specs in e2e/ are driven by `npm run test:e2e`, not Vitest.
    exclude: ['node_modules/**', 'e2e/**', '.next/**'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
