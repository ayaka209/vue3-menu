import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//@ts-ignore
import * as babel from '@babel/core';


const babelPlugin = {
  name: 'plugin-babel',
  transform: (src: any, id: any) => {
    if (/\.(jsx?|vue)$/.test(id)) {              // the pattern of the file to handle
      return babel.transform(src, {
        filename: id,
        babelrc: true,
      });
    }
  },
};
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/lib.ts'),
      name: 'vue3Menu',
      // the proper extensions will be added
      fileName: 'vue3Menu',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue({
      script: {
        babelParserPlugins: ['decorators'],     // must enable decorators support
      },
    }),
    babelPlugin,                                // must be after the vue plugin
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
