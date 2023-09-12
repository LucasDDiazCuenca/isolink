import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['com']
  },
  build: {
    commonjsOptions: {
      include: [/com/, /node_modules/]
    }
  }
})