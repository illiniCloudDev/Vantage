import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  // 1. Root and Build paths are now automatic since we're inside the /frontend folder
  // 2. We keep the alias because it's great for clean imports like '@/components/...'
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // 3. Keep the proxy for LOCAL development
  // This won't affect the Render production build
  server: {
    proxy: {
      '/api': {
        target: 'https://vantage-backend-lqdt.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})