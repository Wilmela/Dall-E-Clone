import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/v1": {
  //       target: "https://dalle-d9wt.onrender.com/api",
  //     },
  //   },
  // },
});
