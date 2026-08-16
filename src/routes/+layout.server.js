import { isAuthConfigured } from "$lib/server/auth";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals }) {
	return {
		user: locals.user,
		authConfigured: isAuthConfigured(),
	};
}
