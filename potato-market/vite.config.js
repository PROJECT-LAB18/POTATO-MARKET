import * as path from 'node:path';

import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import macro from 'vite-plugin-babel-macros';



export default defineConfig({
  plugins: [
    macro(), 
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});