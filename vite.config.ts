import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'pathe'
import AutoImport from 'unplugin-auto-import/vite'
import { IonicResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    Components({
      dirs: ['src/components'],
      deep: true,
      resolvers: [
        IonicResolver(),
      ],
      dts: './src/components.d.ts',
    }),
    AutoImport({
      imports: ['vue', 'pinia'],
      dts: './src/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
