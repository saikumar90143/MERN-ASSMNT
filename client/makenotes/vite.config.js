// vite.config.js
import { defineConfig } from 'vite';
import proxy from 'http-proxy-middleware';

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000', // Replace with your backend server URL
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});