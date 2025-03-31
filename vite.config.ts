import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/sipa-documentacao': {
        target: 'https://staging-auth.socinpro.org.br',
        changeOrigin: true,
        secure: false, // Desativar SSL strict (caso necessário)
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@models': path.resolve(__dirname, './src/models'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@dtos': path.resolve(__dirname, './src/dtos'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@store': path.resolve(__dirname, './src/store'),
      '@services': path.resolve(__dirname, './src/services'),
    },
  },
})
