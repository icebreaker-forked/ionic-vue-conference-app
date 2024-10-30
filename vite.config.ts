import type { UserConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { defu } from 'defu'
import path from 'pathe'
import AutoImport from 'unplugin-auto-import/vite'
import { IonicResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export interface GetConfigOptions {
  dts?: boolean
}

export function getConfig(options?: GetConfigOptions): UserConfig {
  const { dts } = defu<Required<GetConfigOptions>, GetConfigOptions[]>(options, {
    dts: true,
  })
  return {
    plugins: [
      vue(),
      legacy(),
      Components({
        dirs: ['src/components'],
        deep: true,
        resolvers: [
          IonicResolver(),
        ],
        dts: dts ? './src/components.d.ts' : false,
      }),
      AutoImport({
        imports: ['vue', 'pinia'],
        dts: dts ? './src/auto-imports.d.ts' : false,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(() => {
  return getConfig()
})
