import assert from 'node:assert/strict';
import { generateKeyPair, exportJWK, SignJWT } from 'jose';
import { posts } from '../src/lib/data/posts.js';

// Load build artifacts at runtime; generated bundles are not source type-check targets.
const serverModule = '../build/server/index.js';
const manifestModule = '../build/server/manifest.js';
const { Server } = await import(serverModule);
const { manifest } = await import(manifestModule);
const server = new Server(manifest);
const origin = 'https://portal.example.test';
/** @param {string} path @param {RequestInit} [init] @returns {Promise<Response>} */
function request(path, init) {
	return server.respond(new Request(`${origin}${path}`, init), { getClientAddress: () => '127.0.0.1' });
}

await server.init({ env: {} });
for (const path of ['/', '/blog', '/usedtech', '/about', '/contact', ...posts.map((post) => `/blog/${post.slug}`)]) {
	const response = await request(path);
	assert.equal(response.status, 200, path);
	const html = await response.text();
	assert.match(html, /lang="ko"/, path);
	assert.match(html, /href="\/about"/, path);
	assert.match(html, /href="\/contact"/, path);
	if (path.startsWith('/blog/')) assert.match(html, /<h2>/, path);
	if (path === '/') {
		assert.ok(html.includes(`POSTS (${posts.length})`));
		assert.ok(html.includes('실제 서버 상태와 연결되어 있지 않습니다.'));
	}
	if (path === '/contact') assert.ok(html.includes('문의 채널을 준비하고 있습니다.'));
}
assert.equal((await request('/blog/missing-post')).status, 404);
assert.equal((await request('/aichat')).status, 404);
const logout = await request('/auth/logout?returnTo=%2F%5Cexample.org');
assert.equal(logout.status, 303);
assert.equal(logout.headers.get('location'), '/');
const localLogout = await request('/auth/logout?returnTo=%2Fblog%2Fsvelte-5-runes');
assert.equal(localLogout.headers.get('location'), '/blog/svelte-5-runes');

await server.init({ env: { AUTH_PROTECTED_ROUTES: '/blog' } });
assert.equal((await request('/blog')).status, 503);
assert.equal((await request('/%62log/svelte-5-runes')).status, 503);
assert.equal((await request('/about')).status, 200);

await server.init({ env: {
	SSO_ISSUER: 'https://sso.example.test', SSO_CLIENT_ID: 'smoke-test',
	SSO_CLIENT_SECRET: 'test-only', AUTH_SECRET: 'test-only-session-secret-at-least-32-characters',
	AUTH_PROTECTED_ROUTES: '/blog'
} });
const aboutWithAuth = await request('/about');
assert.equal(aboutWithAuth.status, 200);
assert.match(await aboutWithAuth.text(), /aria-label="로그인"/);
const protectedPost = await request('/blog/svelte-5-runes');
assert.equal(protectedPost.status, 303);
assert.equal(protectedPost.headers.get('location'), '/auth/login?returnTo=%2Fblog%2Fsvelte-5-runes');
for (const path of ['/%62log', '/%62log/svelte-5-runes']) {
	assert.equal((await request(path)).status, 303, path);
}
const trailingSlash = await request('/blog/');
assert.equal(trailingSlash.status, 308);
assert.equal(trailingSlash.headers.get('location'), '/blog');
// Isolated provider to verify cookie compatibility; not a deployed SSO test.
const { privateKey, publicKey } = await generateKeyPair('RS256');
const publicJwk = { ...await exportJWK(publicKey), kid: 'test-key', alg: 'RS256' };
let nonce = '';
let invalidMode = '';
const originalFetch = globalThis.fetch;
globalThis.fetch = async (/** @type {RequestInfo | URL} */ input) => {
	const url = input instanceof Request ? input.url : String(input);
	if (url === 'https://sso.example.test/.well-known/openid-configuration') {
		return Response.json({ issuer: 'https://sso.example.test', authorization_endpoint: 'https://sso.example.test/authorize', token_endpoint: 'https://sso.example.test/token', userinfo_endpoint: 'https://sso.example.test/userinfo', jwks_uri: 'https://sso.example.test/jwks' });
	}
	if (url === 'https://sso.example.test/jwks') return Response.json({ keys: [publicJwk] });
	if (url === 'https://sso.example.test/token') {
		if (invalidMode === 'missing') return Response.json({ access_token: 'test-only-token' });
		const idToken = await new SignJWT({ nonce: invalidMode === 'nonce' ? 'wrong' : nonce })
			.setProtectedHeader({ alg: 'RS256', kid: 'test-key' })
			.setIssuer(invalidMode === 'issuer' ? 'https://other.test' : 'https://sso.example.test')
			.setAudience(invalidMode === 'audience' ? 'other-client' : 'smoke-test')
			.setSubject('test-user').setIssuedAt()
			.setExpirationTime(invalidMode === 'expired' ? Math.floor(Date.now() / 1000) - 60 : '5m')
			.sign(privateKey);
		return Response.json({ access_token: 'test-only-token', id_token: invalidMode === 'signature' ? idToken.slice(0, -10) + 'AAAAAAAAAA' : idToken });
	}
	if (url === 'https://sso.example.test/userinfo') return Response.json({ sub: invalidMode === 'subject' ? 'other-user' : 'test-user', name: 'Smoke test' });
	throw new Error(`Unexpected outbound request: ${url}`);
};
try {
	const login = await request('/auth/login?returnTo=%2Fblog%2Fsvelte-5-runes');
	assert.equal(login.status, 303);
	const authorization = new URL(login.headers.get('location') ?? '');
	nonce = authorization.searchParams.get('nonce') ?? '';
	assert.ok(nonce);
	const flowCookie = login.headers.getSetCookie().find((cookie) => cookie.startsWith('xheize_oidc_flow='));
	assert.ok(flowCookie);
	assert.match(flowCookie, /HttpOnly/i);
	assert.match(flowCookie, /Secure/i);
	const callback = await request(`/auth/callback?code=test-code&state=${authorization.searchParams.get('state')}`, { headers: { cookie: flowCookie.split(';')[0] } });
	assert.equal(callback.status, 303);
	assert.equal(callback.headers.get('location'), '/blog/svelte-5-runes');
	const sessionCookie = callback.headers.getSetCookie().find((cookie) => cookie.startsWith('xheize_session='));
	assert.ok(sessionCookie);
	assert.equal((await request('/blog/svelte-5-runes', { headers: { cookie: sessionCookie.split(';')[0] } })).status, 200);
	const signout = await request('/auth/logout', { headers: { cookie: sessionCookie.split(';')[0] } });
	assert.equal(signout.status, 303);
	assert.ok(signout.headers.getSetCookie().some((cookie) => cookie.startsWith('xheize_session=') && /Max-Age=0/i.test(cookie)));
	for (const mode of ['missing', 'issuer', 'audience', 'expired', 'nonce', 'signature', 'subject']) {
		invalidMode = mode;
		const start = await request('/auth/login');
		const destination = new URL(start.headers.get('location') ?? '');
		nonce = destination.searchParams.get('nonce') ?? '';
		const cookie = start.headers.getSetCookie().find((value) => value.startsWith('xheize_oidc_flow='));
		assert.ok(cookie);
		const rejected = await request(`/auth/callback?code=test-code&state=${destination.searchParams.get('state')}`, { headers: { cookie: cookie.split(';')[0] } });
		assert.equal(rejected.status, 502, mode);
		assert.ok(!rejected.headers.getSetCookie().some((value) => value.startsWith('xheize_session=')), mode);
	}
} finally {
	globalThis.fetch = originalFetch;
}
console.log('Server smoke checks passed: pages, article URLs, missing routes, redirects, route protection and simulated OIDC cookie flow.');
