import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import vue2 from '@vitejs/plugin-vue2';
import vue2Jsx from '@vitejs/plugin-vue2-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    vue2Jsx(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
