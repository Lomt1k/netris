import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: './',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "/src/styles/global/mixins.scss" as *;'
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    watch: false,
  }
})
