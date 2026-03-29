import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const parts = id.split('node_modules/')[1]?.split('/') ?? []
            const packageName = parts[0]?.startsWith('@') ? `${parts[0]}-${parts[1]}` : parts[0]
            return packageName ? `vendor-${packageName}` : 'vendor'
          }
        }
      }
    }
  }
})
