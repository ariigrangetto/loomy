/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  optimizeDeps: {
    include: ['tslib']
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
  }
})
