// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface SessionUser {
			sub: string;
			email?: string;
			name?: string;
			picture?: string;
			expiresAt: number;
		}
		interface Locals {
			user: SessionUser | null;
		}
		interface PageData {
			user?: SessionUser | null;
			authConfigured?: boolean;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
