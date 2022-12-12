import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// const resolve = require('path');
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
  ],
  server: {
    host: '127.0.0.1',
    port: 5173,
    // 是否开启 https
    https: false,
    proxy: {
      '/api': {
        // 后台地址
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    }
  },
})
