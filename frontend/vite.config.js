import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  build: {
    // Target modern browsers — smaller, faster output
    target: 'esnext',

    // Terser removes console.log, debugger, dead code
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn', 'console.info'],
        passes: 2,
      },
      mangle: { safari10: false },
      format: { comments: false },
    },

    rollupOptions: {
      output: {
        // Separate cacheable vendor chunks — browser only re-downloads
        // when THAT specific library changes, not when app code changes
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router':       ['react-router-dom'],
          'framer':       ['framer-motion'],
          'icons':        ['lucide-react'],   // was merged into index (50+ kB)
        },
        // Predictable file names for long-term caching
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },

    // Assets < 3 kB get inlined as base64 (reduces HTTP requests)
    assetsInlineLimit: 3072,

    chunkSizeWarningLimit: 800,
    sourcemap: false,
    cssCodeSplit: true,
    // Preload directives for split chunks (faster navigation)
    modulePreload: { polyfill: false },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
})
