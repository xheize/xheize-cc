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
- **First-party SSO ready**: Authorization Code 기반으로 자체 `sso-server`의 OIDC discovery, token, userinfo 엔드포인트와 직접 연동합니다.
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

OIDC 연결에는 다음 값을 설정합니다.

- `SSO_ISSUER`: 자체 `sso-server` issuer URL
- `SSO_CLIENT_ID`, `SSO_CLIENT_SECRET`: `sso-server`에 등록한 confidential client
- `AUTH_SECRET`: 앱 세션을 암호화하는 32자 이상의 랜덤 문자열
- `ORIGIN`: 배포된 앱의 외부 origin
- `AUTH_PROTECTED_ROUTES`: 인증이 필요한 경로 prefix 목록. 기본값은 `/aichat`

`sso-server`에는 앱의 `/auth/callback` URL을 정확히 등록해야 합니다. 개발·운영용 예시는 [docs/sso-client.example.json](docs/sso-client.example.json)에 있습니다. 이 예시의 `XHEIZE_CC_CLIENT_SECRET` 값과 앱의 `SSO_CLIENT_SECRET` 값은 같아야 합니다.

인증이 설정되지 않은 로컬 환경에서는 모든 페이지가 공개 상태로 동작합니다. 설정이 완료되면 AI Chat이 기본적으로 로그인 보호를 받으며, 헤더에 로그인/계정 버튼이 나타납니다.

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
  └── hooks.server.js # 자체 sso-server OIDC 세션 및 보호 경로 처리
```
