import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // In development, forward /api calls to the Express server (npm run server)
    proxy: { '/api': 'http://localhost:5000' },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) {
            return 'three-vendor';
          }
          if (id.includes('node_modules/gsap') || id.includes('node_modules/framer-motion')) {
            return 'animation-vendor';
          }
        },
      },
    },
  },
})
