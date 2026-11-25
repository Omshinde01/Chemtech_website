import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: {
    // In development, forward /api calls to the Express server (npm run server)
    proxy: { '/api': 'http://localhost:5000' },
  },
  build: {
    manifest: !isSsrBuild,
    // three.js is one large lazy chunk, only fetched when a 3D section nears the screen
    chunkSizeWarningLimit: 1300,
  },
}))
