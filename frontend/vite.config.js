import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({

  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',  // Aquí le dices a Vite que @ apunta a la carpeta src

    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
      },
   },
  },
})
