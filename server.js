const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const path = require('path')

// ─── Logger ───────────────────────────────────────────────────────────────────
const LOG_DIR = path.join(__dirname, 'logs')
const LOG_FILE = path.join(LOG_DIR, 'app.log')

if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true })

function log(level, message, extra) {
  const ts = new Date().toISOString()
  const line = extra
    ? `[${ts}] [${level}] ${message} | ${JSON.stringify(extra)}`
    : `[${ts}] [${level}] ${message}`
  process.stdout.write(line + '\n')
  try { fs.appendFileSync(LOG_FILE, line + '\n') } catch (_) {}
}

// ─── Uncaught error safety net ────────────────────────────────────────────────
process.on('uncaughtException', (err) => {
  log('FATAL', 'Uncaught exception', { message: err.message, stack: err.stack })
  process.exit(1)
})
process.on('unhandledRejection', (reason) => {
  log('FATAL', 'Unhandled rejection', { reason: String(reason) })
  process.exit(1)
})

// ─── Always run as production ─────────────────────────────────────────────────
process.env.NODE_ENV = 'production'

const hostname = process.env.HOST || 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

log('INFO', `Starting server | NODE_ENV=${process.env.NODE_ENV} | port=${port} | Node=${process.version}`)

// ─── Check that .next build exists ────────────────────────────────────────────
const buildDir = path.join(__dirname, '.next')
if (!fs.existsSync(buildDir)) {
  log('FATAL', '.next folder not found — run "npm run build" before starting the server')
  process.exit(1)
}

// ─── Boot Next.js ─────────────────────────────────────────────────────────────
const app = next({ dev: false, hostname, port })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true)
        log('REQ', `${req.method} ${req.url}`)
        await handle(req, res, parsedUrl)
      } catch (err) {
        log('ERROR', `Request handler error for ${req.url}`, {
          message: err.message,
          stack: err.stack,
        })
        res.statusCode = 500
        res.end('internal server error')
      }
    })
      .once('error', (err) => {
        log('FATAL', 'HTTP server error', { message: err.message, stack: err.stack })
        process.exit(1)
      })
      .listen(port, () => {
        log('INFO', `Server is ready on http://${hostname}:${port}`)
      })
  })
  .catch((err) => {
    log('FATAL', 'Next.js failed to prepare', { message: err.message, stack: err.stack })
    process.exit(1)
  })
