import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/about-us.html'),
        enhancing: resolve(__dirname, 'src/enhancing-farmer-lives.html'),
        innovation: resolve(__dirname, 'src/innovation.html'),
        krug: resolve(__dirname, 'src/krug-co.html'),
        mediaKit: resolve(__dirname, 'src/media-kit.html'),
        media: resolve(__dirname, 'src/media.html'),
        partner: resolve(__dirname, 'src/partner-with-us.html'),
        solutions: resolve(__dirname, 'src/solutions.html')
      }
    }
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],
});
