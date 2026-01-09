# Node.js 20 기반 이미지 사용
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 소스 코드 복사
COPY . .

# SvelteKit 애플리케이션 빌드
RUN npm run build

# 프로덕션 이미지 생성
FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 파일과 필요한 파일만 복사
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.svelte-kit ./.svelte-kit

# 프로덕션 의존성만 설치
RUN npm ci --omit=dev

# 환경 변수 설정
ENV NODE_ENV=production
ENV PORT=3000

# 포트 노출
EXPOSE 3000

# 애플리케이션 실행
CMD ["node", "build"]
