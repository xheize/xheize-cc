import assert from 'node:assert/strict';
import test from 'node:test';
import { safeReturnTo } from '../src/lib/server/return-to.js';
import { renderMarkdown } from '../src/lib/server/markdown.js';
import { posts } from '../src/lib/data/posts.js';

test('return destinations reject external origins and normalization bypasses', () => {
	for (const value of ['//example.org', '/\\example.org', '/\t/example.org', '/\n/example.org', '/a/..//example.org', 'https://example.org', 'javascript:alert(1)', null, undefined]) {
		assert.equal(safeReturnTo(value), '/', String(value));
	}
	assert.equal(safeReturnTo('/blog/svelte-5-runes?q=hello%20world#code'), '/blog/svelte-5-runes?q=hello%20world#code');
	assert.equal(safeReturnTo('/blog/../about'), '/about');
});

test('Markdown renders structure and code without executable markup', () => {
	const html = renderMarkdown('### Heading\n\n**Bold** and `inline`\n\n- item\n\n```html\n<script>alert(1)</script>\n```\n\n<script>alert(2)</script>\n\n<a href="javascript:alert(3)" onclick="alert(4)">link</a>');
	assert.match(html, /<h3>Heading<\/h3>/);
	assert.match(html, /<strong>Bold<\/strong>/);
	assert.match(html, /<li>item<\/li>/);
	assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
	assert.doesNotMatch(html, /<script|onclick=|javascript:|alert\(2\)/);
});

test('each published post has a unique URL and rendered headings', () => {
	assert.equal(new Set(posts.map((post) => post.slug)).size, posts.length);
	for (const post of posts) {
		assert.match(post.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
		assert.match(renderMarkdown(post.content), /<h2>/);
	}
});
