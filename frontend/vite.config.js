import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Use an alias to point to the `redux` module if it's having trouble resolving.
      redux: path.resolve(__dirname, 'node_modules/redux'),
    },
  },
  optimizeDeps: {
    // Make sure Vite pre-bundles these dependencies for compatibility.
    include: ['redux', 'redux-thunk', '@reduxjs/toolkit'],
  },
});
