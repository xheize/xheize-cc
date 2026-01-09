# xheize-cc

My personal page built with SvelteKit - featuring Server-Side Rendering (SSR) and Authentik SSO authentication.

## Features

- ⚡ **Server-Side Rendering (SSR)** - Pages are rendered on the server for optimal performance and SEO
- 🔐 **Authentik SSO Integration** - Secure authentication with Single Sign-On support
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

### Configure Authentik SSO

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Update `.env` with your Authentik credentials:

```env
AUTHENTIK_ISSUER=https://authentik.yourdomain.com/application/o/your-app-slug/
AUTHENTIK_CLIENT_ID=your-client-id
AUTHENTIK_CLIENT_SECRET=your-client-secret
AUTH_SECRET=generate-random-secret-here
AUTH_URL=http://localhost:5173
```

3. To generate a secure `AUTH_SECRET`:

```bash
openssl rand -base64 32
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

## Authentik SSO Setup

### Creating an OAuth2/OIDC Application in Authentik

1. Log in to your Authentik admin panel
2. Go to **Applications** → **Providers** → **Create Provider**
3. Select **OAuth2/OpenID Provider**
4. Configure the provider:
   - **Name**: xheize-cc
   - **Authorization flow**: default-authentication-flow
   - **Client type**: Confidential
   - **Redirect URIs**: `http://localhost:5173/auth/callback/authentik` (for development)
   - **Signing Key**: Select your signing certificate
5. Save the provider and note the **Client ID** and **Client Secret**
6. Create an application linking to this provider
7. Copy the **OpenID Configuration Issuer** URL to use as `AUTHENTIK_ISSUER`

## Docker Deployment

### Build Docker Image

```bash
docker build -t xheize-cc .
```

### Run Docker Container

```bash
docker run -p 3000:3000 \
  -e AUTHENTIK_ISSUER=your-issuer-url \
  -e AUTHENTIK_CLIENT_ID=your-client-id \
  -e AUTHENTIK_CLIENT_SECRET=your-client-secret \
  -e AUTH_SECRET=your-secret \
  -e AUTH_URL=https://yourdomain.com \
  xheize-cc
```

The app will be available at `http://localhost:3000`

### Docker Compose

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
      - AUTHENTIK_ISSUER=${AUTHENTIK_ISSUER}
      - AUTHENTIK_CLIENT_ID=${AUTHENTIK_CLIENT_ID}
      - AUTHENTIK_CLIENT_SECRET=${AUTHENTIK_CLIENT_SECRET}
      - AUTH_SECRET=${AUTH_SECRET}
      - AUTH_URL=https://yourdomain.com
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
│   ├── contact/        # Contact page
│   ├── profile/        # Protected profile page (requires auth)
│   └── auth/           # Authentication pages
│       ├── signin/     # Sign in page
│       └── error/      # Auth error page
├── lib/                # Shared components and utilities
├── hooks.server.js     # SvelteKit server hooks (Auth.js config)
└── app.html            # HTML template
```

## Authentication Features

### Public Pages
- Home page with authentication status
- About page
- Contact page

### Protected Pages
- Profile page - Requires Authentik SSO authentication
- Shows user information from Authentik
- Includes sign out functionality

### SSO Flow

1. User clicks "Sign In" button
2. Redirected to Authentik login page
3. After successful authentication, redirected back to the app
4. Session is established and user can access protected pages

## SSR in Action

This site demonstrates Server-Side Rendering:

1. **Initial Load**: HTML is rendered on the server and sent to the browser
2. **Hydration**: JavaScript loads and makes the page interactive
3. **Navigation**: Subsequent page changes use client-side routing

Visit the About page to see a live demonstration of SSR with server and client timestamps!

## Technology Stack

- **Framework**: SvelteKit 2.x
- **Authentication**: Auth.js (NextAuth.js for SvelteKit) with Authentik provider
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
