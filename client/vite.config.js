import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react({babel: {parserOpts: {plugins:[],}, plugins: []}})],
  server: {
    proxy: {
      '/api': {
        target: process.env.RAILWAY_PUBLIC_DOMAIN || 'http://127.0.0.1:5555',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})