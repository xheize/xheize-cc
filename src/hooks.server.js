import { error, redirect } from "@sveltejs/kit";
import { isAuthConfigured, isProtectedPath, readSession } from "$lib/server/auth";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	event.locals.user = isAuthConfigured() ? await readSession(event.cookies) : null;

	if (!event.route.id?.startsWith('/auth/') && isProtectedPath(event.url.pathname)) {
		if (!isAuthConfigured()) error(503, "로그인 설정을 확인하는 중입니다.");
		if (!event.locals.user) {
			const returnTo = `${event.url.pathname}${event.url.search}`;
			redirect(303, `/auth/login?returnTo=${encodeURIComponent(returnTo)}`);
		}
	}

	return resolve(event);
}
