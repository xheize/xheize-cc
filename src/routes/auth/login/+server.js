import { error, redirect } from "@sveltejs/kit";
import { getAuthConfig, getOIDCMetadata, randomToken, safeReturnTo, setAuthFlow } from "$lib/server/auth";

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies, url }) {
	let authorization;
	try {
		const metadata = await getOIDCMetadata();
		const { clientId } = getAuthConfig();
		const state = randomToken();
		const redirectUri = `${url.origin}/auth/callback`;
		const returnTo = safeReturnTo(url.searchParams.get("returnTo"));

		await setAuthFlow(cookies, {
			state,
			returnTo,
			redirectUri,
			expiresAt: Date.now() + 10 * 60 * 1000,
		});

		authorization = new URL(metadata.authorization_endpoint);
		authorization.searchParams.set("client_id", clientId);
		authorization.searchParams.set("redirect_uri", redirectUri);
		authorization.searchParams.set("response_type", "code");
		authorization.searchParams.set("scope", "openid profile email");
		authorization.searchParams.set("state", state);
	} catch (cause) {
		console.error("OIDC login initialization failed", cause);
		error(503, "SSO 로그인 서버에 연결할 수 없습니다.");
	}

	redirect(303, authorization.toString());
}
