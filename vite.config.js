
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  base: './',

  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 5000,

    rollupOptions: {
      input: {
        menu: fileURLToPath(new URL('./index.html', import.meta.url)),
        nivel1: fileURLToPath(new URL('./nivel1.html', import.meta.url)),
        creditos: fileURLToPath(new URL('./creditos.html', import.meta.url))
      },
    },
  },
});
