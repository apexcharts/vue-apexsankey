import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      outDir: 'dist',
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueApexSankey',
      fileName: 'vue-apexsankey'
    },
    rollupOptions: {
      // externalize deps that shouldn't be bundled
      external: ['vue', 'apexsankey', '@svgdotjs/svg.js'],
      output: {
        // handle both named and default exports
        exports: 'named',
        globals: {
          vue: 'Vue',
          apexsankey: 'ApexSankey',
          '@svgdotjs/svg.js': 'SVG'
        }
      }
    }
  }
})
