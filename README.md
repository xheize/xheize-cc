# xheize-cc

Personal page built with SvelteKit.

## Features

- Server-Side Rendering (SSR)
- Svelte 5 + Vite
- Responsive pages (home/about/contact/profile)
- Docker deployment ready

## Getting Started

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Default development URL: http://localhost:5173

### Production build

```bash
npm run build
npm run preview
```

## Docker

### Build image

```bash
docker build -t xheize-cc:latest .
```

### Run container

```bash
docker run --rm -p 3000:3000 --name xheize-cc xheize-cc:latest
```

Default runtime URL: http://localhost:3000

## Environment

Optional environment variables are documented in [.env.example](.env.example).

## Structure

```text
src/
  routes/
  lib/
  hooks.server.js
  app.html
```
