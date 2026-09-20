<script>
 import { fade } from 'svelte/transition';
 import SiteHeader from '$lib/components/SiteHeader.svelte';
 let { data } = $props();
 let selectedCategory = $state('All');
 const categories = ['All', 'Frontend', 'DevOps', 'Infrastructure'];
 let filteredPosts = $derived(selectedCategory === 'All' ? data.posts : data.posts.filter((post) => post.category === selectedCategory));
</script>

<svelte:head>
	<title>Tech Blog - Xheize Sandbox</title>
	<meta
		name="description"
		content="인프라 가상화, 컨테이너 오케스트레이션, 그리고 프론트엔드 최신 스택에 대한 기술적 고민을 기록한 블로그."
	/>
</svelte:head>

<main
	class="w-full min-h-screen bg-background text-on-background relative overflow-hidden font-roboto selection:bg-primary-text/30 selection:text-white"
>
	<SiteHeader active="blog" />

	<!-- Glowing Ambient Background Blobs -->
	<div
		class="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-primary-text/5 blur-[90px] pointer-events-none -top-12 -left-12 -z-10"
	></div>
	<div
		class="absolute w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-full bg-secondary-container/10 blur-[80px] pointer-events-none bottom-1/4 -right-12 -z-10"
	></div>

	<div class="responsive-shell pt-24 sm:pt-28 pb-12">

			<!-- --- POST LIST VIEW --- -->
			<section class="text-center py-5 md:py-10 max-w-3xl mx-auto mb-4 sm:mb-6">
				<h1
					class="font-outfit font-extrabold text-[clamp(2.35rem,6vw,4rem)] leading-[1.05] tracking-tight text-on-background mb-4 text-balance"
				>
					Tech Records
				</h1>
				<p class="text-on-surface-variant text-sm md:text-base leading-relaxed">
					인프라 아키텍처 자동화, 도커 컨테이너 가상화, Svelte 개발 철학 등 기술적인 경험과 배움을 기록하는 공간입니다.
				</p>
			</section>

			<!-- Category Filter Tags -->
			<div class="flex items-center sm:justify-center gap-2 mb-7 sm:mb-10 overflow-x-auto py-1 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none]">
				{#each categories as cat}
					<button
						onclick={() => (selectedCategory = cat)}
                        aria-pressed={selectedCategory === cat}
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
			<div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
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
							<a href={`/blog/${post.slug}`}
								class="flex items-center gap-1 text-primary-text font-outfit font-bold text-xs uppercase hover:underline cursor-pointer bg-transparent border-none p-0"
							>
								<span>Read Article</span>
								<span aria-hidden="true" class="material-symbols-rounded text-xs transition-transform group-hover:translate-x-0.5">arrow_forward</span>
							</a>
						</div>
					</div>
				{/each}
			</div>

	</div>

	<!-- Footer -->
	<footer
		class="w-full bg-surface-container-lowest border-t border-outline-variant/20 py-8 px-6 text-center text-xs font-outfit text-on-surface-variant tracking-wider mt-12"
	>
		<p>© {new Date().getFullYear()} Xheize Sandbox. Designed with M3 Dark Theme.</p>
		<p class="mt-1 opacity-70">Powered by Svelte 5 (Runes) & Tailwind CSS</p>
	</footer>
</main>
