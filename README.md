# xheize-cc

Personal portal and technology sandbox infrastructure dashboard built with **SvelteKit (Svelte 5)**. 

Metaphorically designed as a personal "Sandbox (모래성)" portal site that aggregates infrastructure status, personal articles, and local AI assistant helpers.

## 🚀 Features

- **Server-Side Rendering (SSR) & Hydration**: Native SvelteKit SSR capabilities utilizing optimized Node.js adapter runtime.
- **Svelte 5 + Runes**: Built using the reactive system paradigm (`$state`, `$derived`, `$effect`) for precise DOM updates.
- **Modern M3 Dark Theme Design**: High-fidelity dark mode matching Material Design 3 guidelines with smooth scroll storytelling transition animations.
- **Microservices & Infrastructure Integration**:
  - **Tech Blog**: Clean list & detail dynamic routing article viewer populated via isolated data modules.
  - **AI Chat Helper**: Streaming integration with local 무검열 AI backend powered by `vLLM` (`xheize-rlhf` model).
  - **Tech Stack Info**: Category-filtered catalog showing the active system specifications (Kubernetes, Proxmox, DevOps tools).
  - **Live System Status**: Real-time mock dashboard metrics (CPU, RAM, Network Traffic).
- **Security & SSO ready**: Embedded authentication flow utilizing Auth.js (`@auth/sveltekit`) for **Authentik SSO (OIDC)** connection.
- **Docker & CI/CD deployment ready**: Lightweight multi-stage Docker builds and automated Woodpecker CI lint/build testing.

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the template environment file and populate it with your local system config (SSO client secrets, API endpoint configurations):

```bash
cp .env.example .env
```

Refer to the [.env](.env) file for details regarding:
- `AUTHENTIK_ISSUER`, `AUTHENTIK_CLIENT_ID`, `AUTHENTIK_CLIENT_SECRET` (OIDC connection)
- `AUTH_SECRET` (AuthJS secret string)
- `AUTH_URL` (Application runtime URL redirection entry)

### 3. Local Development

```bash
npm run dev
```

Default development URL: [http://localhost:5173](http://localhost:5173)

### 4. Production build & Preview

```bash
npm run build
npm run preview
```

---

## 🐳 Docker Deployment

This repository supports lightweight multi-stage Docker builds using [Dockerfile](Dockerfile) to minimize production image footprint.

### Build image

```bash
docker build -t xheize-cc:latest .
```

### Run container

```bash
docker run --rm -p 3000:3000 --name xheize-cc xheize-cc:latest
```

Default container endpoint: [http://localhost:3000](http://localhost:3000)

---

## 📂 Project Structure

```text
src/
  ├── lib/            # Shared libraries, components, assets
  ├── routes/         # Page routes and SvelteKit endpoints
  │   ├── about/      # Developer profile page
  │   ├── aichat/     # vLLM OIDC Streaming AI chatbot
  │   ├── blog/       # Technical log articles (Svelte 5, Proxmox, DevOps, K8s)
  │   ├── contact/    # Simulated feedback contact form
  │   ├── usedtech/   # Visual tech stack dictionary
  │   ├── +page.svelte# Main interactive storyteller landing dashboard
  │   └── +layout.svelte
  ├── theme/          # SMUI SASS configurations and M3 themes
  ├── app.scss        # Global CSS variable theme mapping (Tailwind v4 ready)
  └── hooks.server.js # Server side authentication hook (Auth.js)
```
