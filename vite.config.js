import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()'
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [vue()],
  server: {
    headers: securityHeaders
  },
  preview: {
    headers: securityHeaders
  },
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
