import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
/*export default defineConfig({
  plugins: [react()],
})*/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Kích hoạt truy cập qua IP mạng nội bộ
    port: 5173  // Bạn có thể giữ nguyên hoặc đổi port tại đây
  }
})