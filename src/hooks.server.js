// SvelteKit 인증 훅 - Authentik SSO를 위한 서버 측 설정
import { SvelteKitAuth } from '@auth/sveltekit';

/** @type {import('@auth/core').AuthConfig} */
const authConfig = {
	providers: [
		// Authentik OIDC 프로바이더 설정
		{
			id: 'authentik',
			name: 'Authentik',
			type: 'oidc',
			// 환경 변수에서 Authentik 설정 로드
			issuer: process.env.AUTHENTIK_ISSUER || 'https://authentik.company/application/o/your-app/',
			clientId: process.env.AUTHENTIK_CLIENT_ID || 'your-client-id',
			clientSecret: process.env.AUTHENTIK_CLIENT_SECRET || 'your-client-secret',
			authorization: {
				params: {
					scope: 'openid profile email',
				},
			},
		},
	],
	// 인증 비밀키 (프로덕션에서는 반드시 환경 변수로 설정)
	secret: process.env.AUTH_SECRET || 'development-secret-change-in-production',
	// 신뢰할 수 있는 호스트 설정
	trustHost: true,
	callbacks: {
		// JWT 토큰 콜백 - 사용자 정보를 토큰에 추가
		async jwt({ token, user, account }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
			}
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		// 세션 콜백 - 클라이언트에 전달할 세션 데이터 설정
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = String(token.id);
				session.user.email = String(token.email);
				session.user.name = String(token.name);
			}
			return session;
		},
	},
	pages: {
		// 로그인 페이지 경로
		signIn: '/auth/signin',
		// 에러 페이지 경로
		error: '/auth/error',
	},
};

export const { handle, signIn, signOut } = SvelteKitAuth(authConfig);
