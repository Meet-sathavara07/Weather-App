import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
      preprocessorOptions: {
        scss: {},
      },
    },
    build: {
      outDir: 'output',
      rollupOptions: {
        input: './src/index.jsx',
        output: {
          entryFileNames: 'main.js',
        },
      },
      cssCodeSplit: isProduction,
      minify: isProduction,
      sourcemap: !isProduction,
    },
    server: {
      open: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      include: ['@babel/preset-react'],
    },
  };
});
