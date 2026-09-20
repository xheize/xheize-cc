import { posts } from '$lib/data/posts';
/** @type {import('./$types').PageServerLoad} */
export function load() { return { postCount: posts.length }; }
