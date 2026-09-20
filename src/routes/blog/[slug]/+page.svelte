<script>
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.post.title} - Xheize Blog</title>
	<meta name="description" content={data.post.summary} />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.summary} />
	<meta property="og:type" content="article" />
</svelte:head>

<SiteHeader active="blog" />
<main class="responsive-shell pt-28 sm:pt-36 pb-16">
	<div class="mx-auto max-w-4xl rounded-m3-xl border border-outline-variant/30 bg-surface-container p-5 sm:p-8 md:p-10">
		<a href="/blog" class="text-primary-text underline">← 글 목록</a>
		<div class="mt-7 flex flex-wrap gap-3 text-xs text-on-surface-variant">
			<span>{data.post.category}</span>
			<time datetime={data.post.date}>{data.post.date}</time>
			<span>{data.post.readTime}</span>
		</div>
		<h1 class="mt-4 mb-8 font-outfit text-3xl sm:text-4xl font-bold leading-tight text-on-surface">{data.post.title}</h1>
		<article class="article-content">{@html data.html}</article>
	</div>
</main>

<style>
	.article-content { color: var(--md-sys-color-on-surface-variant); line-height: 1.85; overflow-wrap: anywhere; }
	.article-content :global(h2), .article-content :global(h3) { color: var(--md-sys-color-on-surface); font-weight: 700; line-height: 1.4; margin: 2rem 0 1rem; }
	.article-content :global(h2) { font-size: 1.6rem; }
	.article-content :global(h3) { font-size: 1.3rem; }
	.article-content :global(p) { margin: 1rem 0; }
	.article-content :global(ul), .article-content :global(ol) { padding-left: 1.5rem; margin: 1rem 0; }
	.article-content :global(ul) { list-style: disc; }
	.article-content :global(ol) { list-style: decimal; }
	.article-content :global(li) { margin: .5rem 0; }
	.article-content :global(a) { color: var(--md-sys-color-primary-text); text-decoration: underline; }
	.article-content :global(pre) { max-width: 100%; overflow-x: auto; background: var(--md-sys-color-surface-container-lowest); border-radius: 12px; padding: 1rem; margin: 1.5rem 0; }
	.article-content :global(code) { font-family: monospace; font-size: .9em; }
	.article-content :global(:not(pre) > code) { background: var(--md-sys-color-surface-container-high); border-radius: 4px; padding: .1rem .3rem; }
	.article-content :global(blockquote) { border-left: 3px solid var(--md-sys-color-primary); padding-left: 1rem; }
</style>
