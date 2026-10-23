import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// `vite preview` falls back to the root index.html for /about; serve the
// prerendered dist/about/index.html instead, as static hosts do.
const prerenderedRoutes = () => ({
  name: 'prerendered-routes',
  configurePreviewServer(server) {
    server.middlewares.use((req, _res, next) => {
      const url = req.url.split('?')[0]
      if (!path.extname(url) && url !== '/') {
        const file = path.join(server.config.build.outDir, url, 'index.html')
        if (fs.existsSync(file)) req.url = `${url.replace(/\/$/, '')}/index.html`
      }
      next()
    })
  },
})

export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderedRoutes()],
  build: {
    chunkSizeWarningLimit: 1200,
  },
})
