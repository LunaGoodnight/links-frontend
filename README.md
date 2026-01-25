# Links Frontend

Public website for the Links Management System built with Next.js 16.

> For full documentation, see the main [README](../links-backend/README.md) in links-backend.

## Quick Start

```bash
# Install dependencies
pnpm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:5005" > .env.local

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Features

- Server-side rendering for SEO
- Responsive grid layout
- Category filtering
- Search functionality
- Image optimization with Next.js Image

## Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Docker

```bash
# Build and run
docker compose up -d

# Available at http://localhost:3004
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5005` |
