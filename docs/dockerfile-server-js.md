# Dockerfile & `server.js` Explained

## Overview

The `CMD ["node", "server.js"]` in the Dockerfile runs a **Next.js auto-generated** file. You do not need to create or maintain `server.js` yourself.

## How It Works

### 1. Build Phase (Dockerfile)

```dockerfile
# Build the application
RUN pnpm build
```

When `pnpm build` runs, Next.js detects `output: "standalone"` in `next.config.ts` and generates a minimal standalone build at `.next/standalone/`, which includes a `server.js` entry point.

### 2. Copy Phase (Dockerfile)

```dockerfile
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
```

The entire `.next/standalone/` directory (including `server.js`) is copied into the container's working directory `/app/`.

### 3. Run Phase (Dockerfile)

```dockerfile
CMD ["node", "server.js"]
```

The container starts the production server by running the auto-generated `server.js`.

## What Does `server.js` Do?

The generated file is located at `.next/standalone/links-frontend/server.js`. It performs the following:

1. **Reads environment variables** — `PORT` (default `3000`) and `HOSTNAME` (default `0.0.0.0`)
2. **Embeds the full Next.js config** inline (no need for `next.config.ts` at runtime)
3. **Starts the production server** using `next/dist/server/lib/start-server`

```js
// Simplified version of what the generated file does
const { startServer } = require('next/dist/server/lib/start-server')

startServer({
  dir: __dirname,
  isDev: false,
  config: nextConfig,   // embedded inline
  hostname: '0.0.0.0',
  port: 3000,
  allowRetry: false,
})
```

## Why Standalone Output?

The `output: "standalone"` option produces a self-contained build that:

- **Does not require `node_modules`** — all necessary dependencies are bundled
- **Produces a smaller Docker image** — only includes files needed at runtime
- **Simplifies deployment** — just run `node server.js` to start the app
