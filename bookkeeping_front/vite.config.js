import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ['import', {
      libraryName: 'zarm',
      style: true, // or 'css'
    }],
  ],
  css: {
    modules: {
      localsConvention: 'dashesOnly'
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
  // 配置代理
  server: {
    proxy: {
      // 当遇到'/api'路径的时候,将其转换为target的值
      target: 'http://localhost:7001/api/',
      // changeOrigin: true,
      rewirte: path => path.replace(/^\/api/,''), // 将/api重写为空
    }
  },
  // 配置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // src 路径
      'utils': path.resolve(__dirname, 'src/utils') // src 路径
    }
  },
})
