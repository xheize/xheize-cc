<script>
	import { fade, slide } from "svelte/transition";

	// Svelte 5 Runes for state management
	let { data } = $props();
	let posts = $derived(data.posts || []);

	let y = $state(0);
	let isScrolled = $derived(y > 20);

	// Filter and Selection states
	let selectedCategory = $state("All");
	/** @type {number | null} */
	let selectedPostId = $state(null);

	const categories = ["All", "Frontend", "DevOps", "Infrastructure"];

	// Derive filtered posts using Rune
	let filteredPosts = $derived(
		selectedCategory === "All"
			? posts
			: posts.filter((post) => post.category === selectedCategory)
	);

	// Get selected post details
	let currentPost = $derived(
		posts.find((p) => p.id === selectedPostId)
	);

	/**
	 * Select a post to read

	// Derive filtered posts using Rune
	let filteredPosts = $derived(
		selectedCategory === "All"
			? posts
			: posts.filter((post) => post.category === selectedCategory)
	);

	// Get selected post details
	let currentPost = $derived(
		posts.find((p) => p.id === selectedPostId)
	);

	/**
	 * Select a post to read
	 * @param {number} id
	 */
	function selectPost(id) {
		selectedPostId = id;
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
</script>

<svelte:window bind:scrollY={y} />

<svelte:head>
	<title>Tech Blog - Xheize Sandbox</title>
	<meta
		name="description"
		content="인프라 가상화, 컨테이너 오케스트레이션, 그리고 프론트엔드 최신 스택에 대한 기술적 고민을 기록한 블로그."
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Roboto:wght@300;400;500;700&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
		rel="stylesheet"
	/>
</svelte:head>

<main
	class="w-full min-h-screen bg-background text-on-background relative overflow-hidden font-roboto selection:bg-primary-text/30 selection:text-white"
>
	<!-- Sticky Header (M3 Top App Bar Style) -->
	<header
		class="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-6 py-4 flex items-center justify-between"
		class:scrolled-header={isScrolled}
	>
		<!-- Left: Logo -->
		<a
			href="/"
			class="flex items-center gap-2 bg-transparent border-none cursor-pointer focus:outline-none group text-left p-0 decoration-none"
		>
			<div
				class="w-8 h-8 rounded-m3-sm bg-primary-text/10 flex items-center justify-center group-hover:bg-primary-text/20 transition-colors"
			>
				<span class="material-symbols-rounded text-primary-text text-xl"
					>fort</span
				>
			</div>
			<span
				class="font-outfit font-extrabold text-xl tracking-wide text-primary-text transition-transform group-hover:scale-102"
			>
				Xheize
			</span>
		</a>

		<!-- Right: Quick Navigation Actions -->
		<nav class="flex items-center gap-2">
			<a href="/#card-blog" class="nav-btn active-nav-btn decoration-none">
				<span class="material-symbols-rounded text-sm md:hidden"
					>article</span
				>
				<span class="hidden md:inline">Blog</span>
			</a>
			<a href="/#card-status" class="nav-btn decoration-none">
				<span class="material-symbols-rounded text-sm md:hidden"
					>dns</span
				>
				<span class="hidden md:inline">System Status</span>
			</a>
			<a href="/usedtech" class="nav-btn decoration-none">
				<span class="material-symbols-rounded text-sm md:hidden"
					>settings_suggest</span
				>
				<span class="hidden md:inline">Tech Stack</span>
			</a>
			<a href="/aichat" class="nav-btn decoration-none">
				<span class="material-symbols-rounded text-sm md:hidden"
					>chat</span
				>
				<span class="hidden md:inline">AI Chat</span>
			</a>
		</nav>
	</header>

	<!-- Glowing Ambient Background Blobs -->
	<div
		class="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-primary-text/5 blur-[90px] pointer-events-none -top-12 -left-12 -z-10"
	></div>
	<div
		class="absolute w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-full bg-secondary-container/10 blur-[80px] pointer-events-none bottom-1/4 -right-12 -z-10"
	></div>

	<div class="max-w-6xl mx-auto px-4 md:px-8 pt-28 pb-12">
		{#if selectedPostId === null}
			<!-- --- POST LIST VIEW --- -->
			<section class="text-center py-6 md:py-10 max-w-2xl mx-auto mb-6">
				<h1
					class="font-outfit font-extrabold text-4xl md:text-5xl tracking-tight text-on-background mb-4"
				>
					Tech Records
				</h1>
				<p class="text-on-surface-variant text-sm md:text-base leading-relaxed">
					인프라 아키텍처 자동화, 도커 컨테이너 가상화, Svelte 개발 철학 등 기술적인 경험과 배움을 기록하는 공간입니다.
				</p>
			</section>

			<!-- Category Filter Tags -->
			<div class="flex items-center justify-center gap-2 mb-10 overflow-x-auto py-1">
				{#each categories as cat}
					<button
						onclick={() => (selectedCategory = cat)}
						class="px-5 py-2.5 rounded-m3-full font-outfit text-xs font-semibold tracking-wider transition-all duration-200 border border-outline-variant/20 whitespace-nowrap
						{selectedCategory === cat
							? 'bg-primary text-on-primary shadow-m3-elevation-1'
							: 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}"
					>
						{cat}
					</button>
				{/each}
			</div>

			<!-- Posts Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
				{#each filteredPosts as post (post.id)}
					<div
						class="bg-surface-container border border-outline-variant/30 rounded-m3-xl p-6 shadow-sm hover:shadow-m3-elevation-3 transition-all duration-300 flex flex-col justify-between group"
						transition:fade={{ duration: 150 }}
					>
						<div>
							<!-- Meta Row -->
							<div class="flex items-center justify-between mb-4 text-[10px] font-mono font-semibold tracking-widest text-on-surface-variant/80">
								<span class="text-primary-text bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-m3-xs uppercase">
									{post.category}
								</span>
								<span>{post.date}</span>
							</div>

							<!-- Title -->
							<h2 class="font-outfit font-extrabold text-xl text-on-surface mb-3 group-hover:text-primary-text transition-colors leading-tight">
								{post.title}
							</h2>

							<!-- Summary -->
							<p class="font-roboto text-sm text-on-surface-variant leading-relaxed mb-6 font-light">
								{post.summary}
							</p>
						</div>

						<!-- Card Footer Action -->
						<div class="border-t border-outline-variant/10 pt-4 flex items-center justify-between">
							<span class="text-[11px] font-mono text-on-surface-variant/70">{post.readTime}</span>
							<button
								onclick={() => selectPost(post.id)}
								class="flex items-center gap-1 text-primary-text font-outfit font-bold text-xs uppercase hover:underline cursor-pointer bg-transparent border-none p-0"
							>
								<span>Read Article</span>
								<span class="material-symbols-rounded text-xs transition-transform group-hover:translate-x-0.5">arrow_forward</span>
							</button>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<!-- --- POST DETAIL VIEW --- -->
			<div class="max-w-3xl mx-auto bg-surface-container border border-outline-variant/30 rounded-m3-xl p-6 md:p-10 shadow-m3-elevation-2 backdrop-blur-md">
				<!-- Back button -->
				<button
					onclick={() => (selectedPostId = null)}
					class="mb-6 flex items-center gap-1.5 text-on-surface-variant hover:text-primary-text font-outfit font-bold text-xs uppercase tracking-wider cursor-pointer bg-transparent border-none p-0 transition-colors"
				>
					<span class="material-symbols-rounded text-sm">arrow_back</span>
					<span>Back to list</span>
				</button>

				{#if currentPost}
					<!-- Meta -->
					<div class="flex items-center gap-3 mb-4 text-xs font-mono">
						<span class="text-primary-text bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-m3-xs font-bold uppercase">
							{currentPost.category}
						</span>
						<span class="text-on-surface-variant">{currentPost.date}</span>
						<span class="text-on-surface-variant">•</span>
						<span class="text-on-surface-variant">{currentPost.readTime}</span>
					</div>

					<!-- Title -->
					<h1 class="font-outfit font-extrabold text-3xl md:text-4xl text-on-surface mb-6 leading-tight">
						{currentPost.title}
					</h1>

					<!-- Article Content -->
					<article class="prose prose-invert max-w-none font-roboto text-sm md:text-base leading-relaxed text-on-surface-variant/90 space-y-6">
						<!-- Content is whitespace pre-line to format properly -->
						<p class="whitespace-pre-line">
							{currentPost.content}
						</p>
					</article>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Footer -->
	<footer
		class="w-full bg-surface-container-lowest border-t border-outline-variant/20 py-8 px-6 text-center text-xs font-outfit text-on-surface-variant tracking-wider mt-12"
	>
		<p>© {new Date().getFullYear()} Xheize Sandbox. Designed with M3 Dark Theme.</p>
		<p class="mt-1 opacity-70">Powered by Svelte 5 (Runes) & Tailwind CSS</p>
	</footer>
</main>

<style>
	/* Header styles from main page */
	.scrolled-header {
		background-color: rgba(20, 18, 24, 0.8);
		backdrop-filter: blur(12px);
		box-shadow:
			0px 4px 6px -1px rgba(0, 0, 0, 0.1),
			0px 2px 4px -1px rgba(0, 0, 0, 0.06);
		border-bottom: 1px solid rgba(147, 143, 153, 0.1);
	}

	.nav-btn {
		font-family: "Outfit", sans-serif;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--md-sys-color-on-surface-variant);
		background-color: transparent;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		cursor: pointer;
		transition: all 0.2s ease;
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.nav-btn:hover {
		color: var(--md-sys-color-primary-text);
		background-color: rgba(208, 188, 255, 0.08);
	}

	.active-nav-btn {
		color: var(--md-sys-color-primary-text);
		border: 1px solid rgba(208, 188, 255, 0.2);
	}

	:global(body) {
		background-color: var(--md-sys-color-background);
		margin: 0;
		color: var(--md-sys-color-on-background);
	}

	/* Simple Markdown rendering adjustments for article content */
	article h3 {
		font-family: "Outfit", sans-serif;
		color: var(--md-sys-color-on-surface);
		font-size: 1.25rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}
	article code {
		font-family: monospace;
		background-color: var(--md-sys-color-surface-container-high);
		padding: 0.2rem 0.4rem;
		border-radius: 4px;
		color: var(--md-sys-color-primary-text);
	}
	article pre {
		background-color: var(--md-sys-color-surface-container-lowest);
		border: 1px solid rgba(147, 143, 153, 0.1);
		padding: 1rem;
		border-radius: 8px;
		overflow-x: auto;
		margin: 1rem 0;
	}
	article pre code {
		background-color: transparent;
		padding: 0;
		color: var(--md-sys-color-on-surface-variant);
	}
</style>
