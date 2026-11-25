import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from the custom domain root: https://blennemann.com/
export default defineConfig({
  plugins: [react()],
  base: '/',
})
