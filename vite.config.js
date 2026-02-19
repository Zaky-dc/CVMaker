import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Polyfills Buffer, process, and other Node.js globals required by
    // @react-pdf/renderer when running in the browser / Vite dev server.
    nodePolyfills({
      // Only polyfill what we need to keep the bundle lean
      include: ['buffer', 'process', 'stream', 'util'],
      globals: {
        Buffer: false, // Don't inject Buffer globally (saves size in main bundle)
        global: true,
        process: false, // Don't inject process globally
      },
    }),
    react(),
  ],
})
