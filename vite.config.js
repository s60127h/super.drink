import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/super.drink/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
