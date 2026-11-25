import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from https://23maxb.github.io/blennemann-site/
export default defineConfig({
  plugins: [react()],
  base: '/blennemann-site/',
})
