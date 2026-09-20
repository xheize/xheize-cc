import { posts } from '$lib/data/posts';

/** @type {import('./$types').PageServerLoad} */
export function load() {
 return { posts: posts.map(({ content, ...post }) => post) };
}
