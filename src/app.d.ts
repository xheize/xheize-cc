// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			// Auth.js 세션 정보
			session?: {
				user?: {
					id: string;
					name?: string;
					email?: string;
					image?: string;
				};
			};
		}
		interface PageData {
			// 페이지에서 사용할 세션 데이터
			session?: {
				user?: {
					id: string;
					name?: string;
					email?: string;
					image?: string;
				};
			};
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
