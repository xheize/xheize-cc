import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";

export const SESSION_COOKIE = "xheize_session";
export const FLOW_COOKIE = "xheize_oidc_flow";

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const sessionMaxAge = 60 * 60 * 8;
const flowMaxAge = 60 * 10;

/** @typedef {{ sub: string, email?: string, name?: string, picture?: string, expiresAt: number }} SessionUser */
/** @typedef {{ state: string, returnTo: string, redirectUri: string, expiresAt: number }} AuthFlow */

/** @param {Uint8Array} bytes */
function base64url(bytes) {
	return Buffer.from(bytes).toString("base64url");
}

/** @param {string} value */
function fromBase64url(value) {
	return new Uint8Array(Buffer.from(value, "base64url"));
}

/** @param {string} purpose */
async function encryptionKey(purpose) {
	const secret = env.AUTH_SECRET?.trim();
	if (!secret || secret.length < 32) {
		throw new Error("AUTH_SECRET must contain at least 32 characters");
	}
	const digest = await crypto.subtle.digest("SHA-256", encoder.encode(`${purpose}:${secret}`));
	return crypto.subtle.importKey("raw", digest, "AES-GCM", false, ["encrypt", "decrypt"]);
}

/** @param {unknown} value @param {string} purpose */
async function seal(value, purpose) {
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const key = await encryptionKey(purpose);
	const encrypted = await crypto.subtle.encrypt(
		{ name: "AES-GCM", iv },
		key,
		encoder.encode(JSON.stringify(value)),
	);
	return `${base64url(iv)}.${base64url(new Uint8Array(encrypted))}`;
}

/** @param {string | undefined} value @param {string} purpose @returns {Promise<any>} */
async function unseal(value, purpose) {
	if (!value) return null;
	const [ivValue, encryptedValue, ...extra] = value.split(".");
	if (!ivValue || !encryptedValue || extra.length > 0) return null;
	try {
		const key = await encryptionKey(purpose);
		const decrypted = await crypto.subtle.decrypt(
			{ name: "AES-GCM", iv: fromBase64url(ivValue) },
			key,
			fromBase64url(encryptedValue),
		);
		return JSON.parse(decoder.decode(decrypted));
	} catch {
		return null;
	}
}

export function isAuthConfigured() {
	return Boolean(
		env.SSO_ISSUER?.trim() &&
		env.SSO_CLIENT_ID?.trim() &&
		env.SSO_CLIENT_SECRET?.trim() &&
		env.AUTH_SECRET?.trim() &&
		env.AUTH_SECRET.trim().length >= 32,
	);
}

export function getAuthConfig() {
	const issuer = env.SSO_ISSUER?.trim();
	const clientId = env.SSO_CLIENT_ID?.trim();
	const clientSecret = env.SSO_CLIENT_SECRET?.trim();
	if (!issuer || !clientId || !clientSecret || !isAuthConfigured()) {
		throw new Error("SSO environment variables are not fully configured");
	}
	return {
		issuer: issuer.replace(/\/$/, ""),
		clientId,
		clientSecret,
	};
}

/** @param {string | null | undefined} value */
export function safeReturnTo(value) {
	return value?.startsWith("/") && !value.startsWith("//") ? value : "/";
}

/** @param {number} maxAge */
function cookieOptions(maxAge) {
	return {
		path: "/",
		httpOnly: true,
		sameSite: /** @type {const} */ ("lax"),
		secure: !dev,
		maxAge,
	};
}

/** @param {import('@sveltejs/kit').Cookies} cookies @param {AuthFlow} flow */
export async function setAuthFlow(cookies, flow) {
	cookies.set(FLOW_COOKIE, await seal(flow, "oidc-flow"), cookieOptions(flowMaxAge));
}

/** @param {import('@sveltejs/kit').Cookies} cookies @returns {Promise<AuthFlow | null>} */
export async function readAuthFlow(cookies) {
	const flow = await unseal(cookies.get(FLOW_COOKIE), "oidc-flow");
	if (!flow || typeof flow.state !== "string" || typeof flow.redirectUri !== "string" || flow.expiresAt < Date.now()) return null;
	return flow;
}

/** @param {import('@sveltejs/kit').Cookies} cookies */
export function clearAuthFlow(cookies) {
	cookies.delete(FLOW_COOKIE, { path: "/" });
}

/** @param {import('@sveltejs/kit').Cookies} cookies @param {Omit<SessionUser, 'expiresAt'>} user */
export async function setSession(cookies, user) {
	const session = { ...user, expiresAt: Date.now() + sessionMaxAge * 1000 };
	cookies.set(SESSION_COOKIE, await seal(session, "session"), cookieOptions(sessionMaxAge));
}

/** @param {import('@sveltejs/kit').Cookies} cookies @returns {Promise<SessionUser | null>} */
export async function readSession(cookies) {
	const session = await unseal(cookies.get(SESSION_COOKIE), "session");
	if (!session || typeof session.sub !== "string" || session.expiresAt < Date.now()) return null;
	return session;
}

/** @param {import('@sveltejs/kit').Cookies} cookies */
export function clearSession(cookies) {
	cookies.delete(SESSION_COOKIE, { path: "/" });
}

/** @param {string} pathname */
export function isProtectedPath(pathname) {
	if (!isAuthConfigured()) return false;
	const configured = env.AUTH_PROTECTED_ROUTES?.split(",").map((path) => path.trim()).filter(Boolean) ?? ["/aichat"];
	return configured.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function randomToken() {
	return base64url(crypto.getRandomValues(new Uint8Array(32)));
}

export async function getOIDCMetadata() {
	const { issuer } = getAuthConfig();
	const response = await fetch(`${issuer}/.well-known/openid-configuration`, {
		headers: { accept: "application/json" },
		signal: AbortSignal.timeout(5000),
	});
	if (!response.ok) throw new Error(`OIDC discovery failed (${response.status})`);
	const metadata = await response.json();
	if (metadata.issuer !== issuer || !metadata.authorization_endpoint || !metadata.token_endpoint || !metadata.userinfo_endpoint) {
		throw new Error("OIDC discovery response is incomplete or has an unexpected issuer");
	}
	return metadata;
}
