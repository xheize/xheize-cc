// 프로필 페이지 서버 로드 - 인증 확인
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
	const session = await event.locals.getSession?.();
	
	// 세션이 없으면 로그인 페이지로 리다이렉트
	if (!session?.user) {
		throw redirect(303, '/auth/signin');
	}
	
	return {
		session
	};
}
