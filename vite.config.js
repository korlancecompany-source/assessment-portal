import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function localApiPlugin() {
  return {
    name: 'local-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/coding/')) {
          const endpoint = req.url.split('?')[0].replace('/api/coding/', '')
          try {
            let handlerModule
            if (endpoint === 'start') {
              handlerModule = await import('./api/coding/start.js')
            } else if (endpoint === 'run') {
              handlerModule = await import('./api/coding/run.js')
            } else if (endpoint === 'submit') {
              handlerModule = await import('./api/coding/submit.js')
            }

            if (handlerModule && handlerModule.default) {
              let body = ''
              req.on('data', (chunk) => {
                body += chunk
              })
              req.on('end', async () => {
                try {
                  req.body = body ? JSON.parse(body) : {}
                } catch {
                  req.body = {}
                }
                const fakeRes = {
                  status(code) {
                    res.statusCode = code
                    return fakeRes
                  },
                  json(data) {
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify(data))
                    return fakeRes
                  },
                }
                await handlerModule.default(req, fakeRes)
              })
              return
            }
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: err.message }))
            return
          }
        }
        next()
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), localApiPlugin()],
})
