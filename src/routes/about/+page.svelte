<script>
	import SiteHeader from "$lib/components/SiteHeader.svelte";

	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
	let clientTime = $state(/** @type {string | null} */ (null));

	$effect(() => {
		clientTime = new Date().toISOString();
	});
</script>

<svelte:head>
	<title>About - Xheize Sandbox</title>
	<meta name="description" content="Xheize의 개발 관심사와 SvelteKit 기반 샌드박스를 소개합니다." />
	<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
</svelte:head>

<SiteHeader active="none" />

<main class="relative min-h-screen overflow-hidden bg-background text-on-background font-roboto">
	<div class="ambient ambient-one"></div>
	<div class="ambient ambient-two"></div>

	<div class="responsive-shell relative z-10 pt-28 sm:pt-36 pb-16 sm:pb-24">
		<section class="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] xl:gap-14">
			<div class="max-w-3xl">
				<div class="mb-5 inline-flex items-center gap-2 rounded-m3-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-primary-text">
					<span class="material-symbols-rounded text-sm">waving_hand</span>
					ABOUT THE BUILDER
				</div>
				<h1 class="font-outfit text-[clamp(2.8rem,8vw,6.4rem)] font-extrabold leading-[0.94] tracking-[-0.045em] text-on-background text-balance">
					만들고, 운영하고,<br /><span class="text-primary-text">계속 개선합니다.</span>
				</h1>
				<p class="mt-6 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:text-lg">
					{data.profile.experience}. 빠른 웹 경험과 안정적인 인프라 사이의 연결을 탐구하는 개인 샌드박스입니다.
				</p>
				<div class="mt-7 flex flex-wrap gap-2">
					{#each data.profile.interests as interest}
						<span class="rounded-m3-full border border-outline-variant/30 bg-surface-container px-4 py-2 text-xs font-medium text-on-surface">{interest}</span>
					{/each}
				</div>
			</div>

			<aside class="relative overflow-hidden rounded-m3-xl border border-outline-variant/30 bg-surface-container/90 p-5 shadow-m3-elevation-3 backdrop-blur-xl sm:p-7">
				<div class="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl"></div>
				<div class="relative flex items-center gap-4">
					<div class="grid h-16 w-16 shrink-0 place-items-center rounded-[20px] border border-primary/20 bg-primary/10 text-primary-text sm:h-20 sm:w-20">
						<span class="material-symbols-rounded text-4xl sm:text-5xl">person</span>
					</div>
					<div class="min-w-0">
						<p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary-text">Profile</p>
						<h2 class="truncate font-outfit text-2xl font-extrabold sm:text-3xl">{data.profile.name}</h2>
						<p class="mt-1 text-sm text-on-surface-variant">{data.profile.title}</p>
					</div>
				</div>
				<div class="relative mt-7 grid grid-cols-3 gap-2 sm:gap-3">
					<div class="stat"><strong>SSR</strong><span>rendering</span></div>
					<div class="stat"><strong>Svelte 5</strong><span>frontend</span></div>
					<div class="stat"><strong>Node</strong><span>runtime</span></div>
				</div>
			</aside>
		</section>

		<section class="mt-10 grid gap-5 lg:mt-16 lg:grid-cols-[0.8fr_1.2fr]">
			<div class="rounded-m3-xl border border-outline-variant/25 bg-surface-container-low p-5 sm:p-7">
				<span class="material-symbols-rounded text-3xl text-secondary">architecture</span>
				<h2 class="mt-5 font-outfit text-2xl font-bold">Working principles</h2>
				<p class="mt-3 text-sm leading-relaxed text-on-surface-variant sm:text-base">작게 실험하고, 실제 환경에서 관찰한 뒤, 반복 가능한 구조로 정리합니다. 화면의 디테일과 운영 안정성을 같은 제품 경험으로 봅니다.</p>
			</div>

			<div class="rounded-m3-xl border border-outline-variant/25 bg-surface-container p-5 sm:p-7">
				<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
					<div><p class="text-xs font-semibold uppercase tracking-[0.16em] text-primary-text">Live render trace</p><h2 class="mt-2 font-outfit text-2xl font-bold">SSR → Hydration</h2></div>
					<span class="w-fit rounded-m3-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">Connected</span>
				</div>
				<div class="mt-6 grid gap-3">
					<div class="trace-row"><span class="material-symbols-rounded">dns</span><div><small>Server render</small><code>{data.serverTime}</code></div></div>
					{#if clientTime}<div class="trace-row"><span class="material-symbols-rounded">devices</span><div><small>Client hydration</small><code>{clientTime}</code></div></div>{/if}
				</div>
			</div>
		</section>
	</div>
</main>

<style>
	.ambient { position: absolute; pointer-events: none; border-radius: 999px; filter: blur(90px); opacity: .55; }
	.ambient-one { width: min(55vw, 700px); aspect-ratio: 1; top: -18%; right: -12%; background: rgba(85, 26, 139, .22); }
	.ambient-two { width: min(42vw, 520px); aspect-ratio: 1; bottom: 0; left: -12%; background: rgba(150, 123, 182, .12); }
	.stat { min-width: 0; border: 1px solid rgba(147,143,153,.16); border-radius: 16px; background: rgba(15,13,19,.5); padding: 14px 10px; text-align: center; }
	.stat strong, .stat span { display: block; overflow: hidden; text-overflow: ellipsis; }
	.stat strong { color: var(--md-sys-color-on-surface); font: 700 clamp(.75rem, 2.5vw, .95rem)/1.15 "Outfit", sans-serif; }
	.stat span { margin-top: 5px; color: var(--md-sys-color-on-surface-variant); font-size: .65rem; }
	.trace-row { display: grid; grid-template-columns: 42px minmax(0, 1fr); align-items: center; gap: 12px; min-width: 0; border: 1px solid rgba(147,143,153,.16); border-radius: 16px; background: rgba(15,13,19,.48); padding: 12px; }
	.trace-row > span { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 13px; background: rgba(208,188,255,.1); color: var(--md-sys-color-primary-text); }
	.trace-row div { min-width: 0; }
	.trace-row small, .trace-row code { display: block; }
	.trace-row small { margin-bottom: 5px; color: var(--md-sys-color-on-surface-variant); font-size: .7rem; text-transform: uppercase; letter-spacing: .08em; }
	.trace-row code { overflow: hidden; color: var(--md-sys-color-on-surface); font-size: clamp(.68rem, 2.2vw, .8rem); text-overflow: ellipsis; white-space: nowrap; }
	@media (max-height: 760px) and (min-width: 900px) { .responsive-shell { padding-top: 104px; padding-bottom: 48px; } }
</style>
