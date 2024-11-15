import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: '@talismn/connect-ui',
      formats: ['es', 'cjs'],
      fileName: 'connect-ui',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
    emptyOutDir: false,
  },
  plugins: [
    react(),
    svgr(),
    cssInjectedByJsPlugin({ dev: { enableDev: true } }),
    dts({ tsconfigPath: './tsconfig.app.json', rollupTypes: true }),
  ],
})
