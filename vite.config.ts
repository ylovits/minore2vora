import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sassGlobImports()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'auth': path.resolve(__dirname, './src/auth'),
      'store': path.resolve(__dirname, './src/store'),
      'utils': path.resolve(__dirname, './src/utils'),
      'interfaces': path.resolve(__dirname, './src/interfaces'),
      'data': path.resolve(__dirname, './src/data'),
      'assets': path.resolve(__dirname, './src/assets'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
});
