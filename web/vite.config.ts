import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/auth-api': {
        target: 'https://app.woffu.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/auth-api/, '/api'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            const targetUrl = `https://app.woffu.com${proxyReq.path}`;
            console.log(`[AUTH PROXY] ${proxyReq.method} ${targetUrl}`);
            console.log(`[AUTH PROXY] Headers:`, JSON.stringify(Object.fromEntries(
              Object.entries(proxyReq.getHeaders())
            )));
            let body = '';
            req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
            req.on('end', () => {
              console.log(`[AUTH PROXY] Request body: ${body}`);
            });
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            let body = '';
            proxyRes.on('data', (chunk: Buffer) => { body += chunk.toString(); });
            proxyRes.on('end', () => {
              console.log(`[AUTH PROXY] Response ${proxyRes.statusCode}: ${body.substring(0, 500)}`);
            });
          });
        },
      },
      '/woffu-api': {
        target: 'https://liferay.woffu.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/woffu-api/, '/api'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            console.log(`[WOFFU] ${proxyReq.method} ${proxyReq.path}`);
            console.log(`[WOFFU] Authorization: ${proxyReq.getHeader('authorization')}`);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log(`[WOFFU] Response: ${proxyRes.statusCode} for ${req.url}`);
          });
        },
      },
    },
  },
})
