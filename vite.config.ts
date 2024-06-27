import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      formats: ['es', 'umd'],
      entry: {
        index: './src/index.ts',
      },
      name: '[name]',
      fileName: '[name]',
    },
    outDir: 'lib', // 打包后存放的目录文件
  },
})
