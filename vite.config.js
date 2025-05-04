import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    strictPort: true,
    port: 4000,
    },
    resolve: {}
  // server: {
  //   hmr: {
  //     host: 'guesthouseb.nitj.ac.in',
  //     port: 443,
  //     protocol: 'wss',
  //   },
  //   proxy: {
  //     '/api': {
  //       target: 'http://127.0.0.1:9000',
  //       changeOrigin: true,
  //       secure: false,
  //       ws: true, // Enable WebSocket proxying
  //     },
  //   },
  // },
})

