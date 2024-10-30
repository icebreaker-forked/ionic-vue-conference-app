import path from 'pathe'
import { defineConfig } from 'vitest/config'
import { getConfig } from './vite.config'

export default defineConfig({
  ...getConfig({
    dts: false,
  }),
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
