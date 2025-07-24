// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'front', 
  base: './', 
  server: {
    port: 5500, 
    open: true, 
    proxy: {
      // 
      '/inicio': {
        target: 'http://localhost:5500',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
  }
});

