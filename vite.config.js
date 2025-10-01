import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/try' // relative paths so it can work on GH Pages; change to '/REPO_NAME/' if needed
});
