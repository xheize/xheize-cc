import { redirect } from "@sveltejs/kit";
import { isAuthConfigured, isProtectedPath, readSession } from "$lib/server/auth";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	event.locals.user = isAuthConfigured() ? await readSession(event.cookies) : null;

	if (isProtectedPath(event.url.pathname) && !event.locals.user) {
		const returnTo = `${event.url.pathname}${event.url.search}`;
		redirect(303, `/auth/login?returnTo=${encodeURIComponent(returnTo)}`);
	}

	return resolve(event);
}
