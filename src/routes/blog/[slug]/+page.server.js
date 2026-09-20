import { error } from '@sveltejs/kit';
import { posts } from '$lib/data/posts';
import { renderMarkdown } from '$lib/server/markdown';

/** @type {import('./$types').PageServerLoad} */
export function load({ params }) {
	const post = posts.find((post) => post.slug === params.slug);
	if (!post) error(404, '글을 찾을 수 없습니다.');
	const { content, ...metadata } = post;
	return { post: metadata, html: renderMarkdown(content) };
}
