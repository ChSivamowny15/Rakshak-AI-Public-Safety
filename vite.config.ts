import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // 👇 Add this line
  base: '/Rakshak-AI-Public-Safety/',

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          charts: ['recharts'],
          flow: ['@xyflow/react'],
          map: ['leaflet', 'react-leaflet'],
          motion: ['framer-motion'],
          pdf: ['jspdf', 'html2canvas'],
        },
      },
    },
  },
});
