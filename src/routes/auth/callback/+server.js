import { error, redirect } from "@sveltejs/kit";
import { clearAuthFlow, getAuthConfig, getOIDCMetadata, readAuthFlow, setSession } from "$lib/server/auth";

/** @type {import('./$types').RequestHandler} */
export async function GET({ cookies, url, fetch }) {
	const flow = await readAuthFlow(cookies);
	clearAuthFlow(cookies);

	if (!flow || url.searchParams.get("state") !== flow.state) {
		error(400, "로그인 요청이 만료되었거나 state 검증에 실패했습니다.");
	}
	if (url.searchParams.has("error")) {
		error(401, `SSO 로그인이 거부되었습니다: ${url.searchParams.get("error")}`);
	}

	const code = url.searchParams.get("code");
	if (!code) error(400, "인증 코드가 없습니다.");

	try {
		const metadata = await getOIDCMetadata();
		const { clientId, clientSecret } = getAuthConfig();
		const tokenResponse = await fetch(metadata.token_endpoint, {
			method: "POST",
			headers: {
				accept: "application/json",
				"content-type": "application/x-www-form-urlencoded",
				authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
			},
			body: new URLSearchParams({
				grant_type: "authorization_code",
				code,
				redirect_uri: flow.redirectUri,
			}),
		});
		if (!tokenResponse.ok) throw new Error(`token exchange failed (${tokenResponse.status})`);
		const tokens = await tokenResponse.json();
		if (!tokens.access_token) throw new Error("token response does not contain an access token");

		const userResponse = await fetch(metadata.userinfo_endpoint, {
			headers: { accept: "application/json", authorization: `Bearer ${tokens.access_token}` },
		});
		if (!userResponse.ok) throw new Error(`userinfo request failed (${userResponse.status})`);
		const profile = await userResponse.json();
		if (!profile.sub || typeof profile.sub !== "string") throw new Error("userinfo response does not contain sub");

		await setSession(cookies, {
			sub: profile.sub,
			email: typeof profile.email === "string" ? profile.email : undefined,
			name: typeof profile.name === "string" ? profile.name : undefined,
			picture: typeof profile.picture === "string" ? profile.picture : undefined,
		});
	} catch (cause) {
		console.error("OIDC callback failed", cause);
		error(502, "SSO 토큰 또는 사용자 정보를 확인하지 못했습니다.");
	}

	redirect(303, flow.returnTo);
}
