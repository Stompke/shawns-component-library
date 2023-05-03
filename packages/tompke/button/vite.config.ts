import path from 'path';
import { defineConfig, normalizePath } from 'vite';
import VitePluginCustomElementsManifest from 'vite-plugin-cem';
import dts from 'vite-plugin-dts';
import ViteTsConfigPathsPlugin from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['README.md', 'CHANGELOG.md'],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: '@tompke/button',
      fileName: 'button',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        /^lit/,
        /^tailwindcss/,
        /^@tompke(?!\/shared|\/utilities)[/\w-]+/,
      ],
    },
  },
  test: {
    globals: true,
    cache: {
      dir: '../../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['../../../tools/setupTest.ts'],
  },
  plugins: [
    dts({
      tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true,
      rollupTypes: true,
      copyDtsFiles: true,
    }),
    VitePluginCustomElementsManifest({
      files: ['packages/tompke/button/src/lib/button.ts'],
      lit: true,
      packageJson: true,
    }),
    ViteTsConfigPathsPlugin({
      root: '../../../',
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'README.md',
          dest: normalizePath(
            path.join(__dirname, '../../../dist/packages/tompke/button')
          ),
        },
        {
          src: 'CHANGELOG.md',
          dest: normalizePath(
            path.join(__dirname, '../../../dist/packages/tompke/button')
          ),
        },
      ],
    }),
  ],
});
