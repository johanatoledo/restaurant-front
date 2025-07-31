import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',  // Ya estás en /front/
  base: '/',
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/admin': 'http://localhost:3000',
      '/menu': 'http://localhost:3000',
      '/uploads': 'http://localhost:3000',
      '/ingresar': 'http://localhost:3000',
      '/ingresarUsuario': 'http://localhost:3000',
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    manifest: true, 
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        ingresar: path.resolve(__dirname, 'ingresar.html'),
        ingresarUsuario: path.resolve(__dirname, 'ingresarUsuario.html'),
        menu: path.resolve(__dirname, 'menu.html'),
        errorpage: path.resolve(__dirname, '404.html'),
      }
    }
  }
});
