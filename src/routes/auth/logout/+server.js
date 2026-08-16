import { redirect } from "@sveltejs/kit";
import { clearAuthFlow, clearSession, safeReturnTo } from "$lib/server/auth";

/** @type {import('./$types').RequestHandler} */
export function GET({ cookies, url }) {
	clearAuthFlow(cookies);
	clearSession(cookies);
	redirect(303, safeReturnTo(url.searchParams.get("returnTo")));
}
