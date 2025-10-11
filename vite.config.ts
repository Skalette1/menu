import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/menu/", // Важно для GitHub Pages
  build: {
    outDir: "dist", // Папка для билда
  },
  server: {
    port: 3001,
    host: true, // listen on all network interfaces so other devices on LAN can connect
    // Ensure HMR client uses LAN IP so remote devices connect to correct ws endpoint
    hmr: {
      host: '192.168.100.126',
      protocol: 'ws',
    },
    proxy: {
      // proxy Directus API and assets so frontend can request relative paths
      '/items': {
        target: 'http://localhost:8055',
        changeOrigin: true,
        secure: false,
      },
      '/assets': {
        target: 'http://localhost:8055',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
