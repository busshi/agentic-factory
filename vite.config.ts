import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    // 'nested' emits /fr/index.html, /fr/cgu/index.html, etc. so each
    // route resolves the same way a directory-based static host already
    // serves index.html for a folder — no extra rewrite/cleanUrls config
    // needed on top of the existing SPA-fallback rule in vercel.json.
    dirStyle: 'nested',
  },
})
