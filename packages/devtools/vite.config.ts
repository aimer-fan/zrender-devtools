import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  build: {
    lib: {
    // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, './src/index.ts'),
      name: 'zrender-devtools',
      // the proper extensions will be added
      fileName: 'zrender-devtools',
    },
  },
  plugins: [vue()],
})
