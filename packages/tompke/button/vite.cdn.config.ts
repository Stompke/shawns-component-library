import { defineConfig } from 'vite';
import ViteTsConfigPathsPlugin from 'vite-tsconfig-paths';
import replace from '@rollup/plugin-replace';
import { env } from 'process';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: '@tompke/button',
      fileName: () => `button.js`,
    },
    rollupOptions: {
      output: [
        {
          name: '@tompke/button',
          dir: `dist/packages/tompke/button/dist/button@${env.NODE_ENV === 'production' ? 'latest' : 'next'}`,
          format: 'umd',
        },
        {
          name: '@tompke/button',
          dir: `dist/packages/tompke/button/dist/button@${pkg.version}`,
          format: 'umd',
        },
      ],
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify('production'),
          preventAssignment: true,
        }),
      ],
    },
  },
  plugins: [
    ViteTsConfigPathsPlugin({
      root: '../../../',
    }),
  ],
});
