import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

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
    outDir: 'lib',
    rollupOptions: {
      external: ['ora'],
      output: {
        globals: {
          ora: 'ora',
        },
      },
    },
  },
});
