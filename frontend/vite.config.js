import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue({
      template: {
        // Don't try to resolve absolute asset paths (e.g. /marketpro/...) in SFC <img src>
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/payment': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
