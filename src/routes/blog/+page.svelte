<script>
 import { fade } from 'svelte/transition';
 import SiteHeader from '$lib/components/SiteHeader.svelte';
	import PageHeading from "$lib/components/PageHeading.svelte";
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

	<div class="responsive-shell page-layout">

			<!-- --- POST LIST VIEW --- -->
			<PageHeading title="개발 기록" description="인프라 구축과 웹 개발에서 배우고 실험한 내용을 기록합니다." />

			<!-- Category Filter Tags -->
			<div class="site-filters mb-8">
				{#each categories as cat}
					<button
						onclick={() => (selectedCategory = cat)}
                        aria-pressed={selectedCategory === cat}
						class="site-filter
						{selectedCategory === cat
							? 'bg-primary text-on-primary shadow-m3-elevation-1'
							: 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}"
					>
						{cat === "All" ? "전체" : cat}
					</button>
				{/each}
			</div>

			<!-- Posts Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
				{#each filteredPosts as post (post.id)}
					<div
						class="site-card flex flex-col justify-between group"
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
								class="site-text-link"
							>
								<span>글 읽기</span>
								<span aria-hidden="true" class="material-symbols-rounded text-xs transition-transform group-hover:translate-x-0.5">arrow_forward</span>
							</a>
						</div>
					</div>
				{/each}
			</div>

	</div>

</main>
