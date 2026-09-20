import assert from 'node:assert/strict';
import { posts } from '../src/lib/data/posts.js';

// Load build artifacts at runtime; generated bundles are not source type-check targets.
const serverModule = '../build/server/index.js';
const manifestModule = '../build/server/manifest.js';
const { Server } = await import(serverModule);
const { manifest } = await import(manifestModule);
const server = new Server(manifest);
const origin = 'https://portal.example.test';
/** @param {string} path */
function request(path) {
	return server.respond(new Request(`${origin}${path}`), { getClientAddress: () => '127.0.0.1' });
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
	if (path === '/contact') assert.ok(html.includes('입력 내용은 전송·저장되지 않으며'));
}
assert.equal((await request('/blog/missing-post')).status, 404);
assert.equal((await request('/aichat')).status, 404);
const logout = await request('/auth/logout?returnTo=%2F%5Cexample.org');
assert.equal(logout.status, 303);
assert.equal(logout.headers.get('location'), '/');
const localLogout = await request('/auth/logout?returnTo=%2Fblog%2Fsvelte-5-runes');
assert.equal(localLogout.headers.get('location'), '/blog/svelte-5-runes');

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
console.log('Server smoke checks passed: pages, article URLs, missing routes, redirects and route protection.');
