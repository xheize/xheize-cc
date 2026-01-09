# xheize-cc

My personal page built with SvelteKit - featuring Server-Side Rendering (SSR).

## Features

- ⚡ **Server-Side Rendering (SSR)** - Pages are rendered on the server for optimal performance and SEO
- 🎨 **Modern Svelte 5** - Using the latest Svelte features including Runes
- 🚀 **Fast Navigation** - Client-side routing for instant page transitions
- 📱 **Responsive Design** - Works great on all devices
- 🔧 **Easy to Deploy** - Configured with @sveltejs/adapter-node for Docker deployment
- 🐳 **Docker Ready** - Includes Dockerfile for containerized deployment

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

The app will be available at `http://localhost:5173`

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Docker Deployment

### Build Docker Image

```bash
docker build -t xheize-cc .
```

### Run Docker Container

```bash
docker run -p 3000:3000 xheize-cc
```

The app will be available at `http://localhost:3000`

### Docker Compose (Optional)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

## Project Structure

```
src/
├── routes/              # SvelteKit routes (pages)
│   ├── +page.svelte    # Home page
│   ├── about/          # About page with SSR data loading
│   └── contact/        # Contact page
├── lib/                # Shared components and utilities
└── app.html            # HTML template
```

## SSR in Action

This site demonstrates Server-Side Rendering:

1. **Initial Load**: HTML is rendered on the server and sent to the browser
2. **Hydration**: JavaScript loads and makes the page interactive
3. **Navigation**: Subsequent page changes use client-side routing

Visit the About page to see a live demonstration of SSR with server and client timestamps!

## Technology Stack

- **Framework**: SvelteKit 2.x
- **Language**: JavaScript with JSDoc type checking
- **Build Tool**: Vite
- **Adapter**: @sveltejs/adapter-node (for Docker/Node.js deployment)
- **Runtime**: Node.js 20

## Deployment

To deploy your app, the @sveltejs/adapter-node is configured for:
- Docker containers
- Node.js servers
- Cloud platforms (AWS, GCP, Azure, etc.)
- VPS hosting

> For more information on deployment, see the [SvelteKit adapter documentation](https://svelte.dev/docs/kit/adapters).
