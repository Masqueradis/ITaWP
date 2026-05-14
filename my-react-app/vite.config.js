import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,           // Позволяет не импортировать describe, it, expect в каждом файле
    environment: 'jsdom',    // Эмуляция браузера для тестов React
    setupFiles: './src/setupTests.js', // Твой файл с настройками
  },
})