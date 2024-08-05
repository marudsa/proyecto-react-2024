import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL,  // Dirección del servidor externo
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')  // Reescribir el camino de la URL
      }
    }
  }
})
