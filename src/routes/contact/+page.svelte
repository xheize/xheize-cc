<script>
 import SiteHeader from '$lib/components/SiteHeader.svelte';
 function showPreparationNotice() { window.alert('준비중입니다.'); }
</script>

<svelte:head>
	<title>Contact - Xheize Sandbox</title>
	<meta name="description" content="Xheize 문의 채널은 준비 중입니다." />
</svelte:head>

<SiteHeader active="contact" />

<main class="relative min-h-screen overflow-hidden bg-background text-on-background font-roboto">
	<div class="ambient"></div>
	<div class="responsive-shell relative z-10 pt-28 sm:pt-36 pb-16 sm:pb-24">
		<section class="mx-auto max-w-3xl text-center">
			<div class="mb-5 inline-flex items-center gap-2 rounded-m3-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-primary-text"><span aria-hidden="true" class="material-symbols-rounded text-sm">forum</span> OPEN CHANNEL</div>
			<h1 class="font-outfit text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-balance">같이 만들 이야기가<br /><span class="text-primary-text">있으신가요?</span></h1>
			<p class="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-on-surface-variant sm:text-lg">인프라, 웹 서비스, 작은 실험까지. 문의 채널을 준비하고 있습니다.</p>
		</section>

		<div class="mx-auto mt-9 grid max-w-6xl gap-5 lg:mt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
			<section class="rounded-m3-xl border border-outline-variant/30 bg-surface-container/90 p-5 shadow-m3-elevation-2 backdrop-blur-xl sm:p-8">
				<div class="mb-6 flex items-center justify-between gap-4"><div><p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary-text">Contact</p><h2 class="mt-2 font-outfit text-2xl font-bold">무엇을 도와드릴까요?</h2></div><span aria-hidden="true" class="material-symbols-rounded text-3xl text-secondary">send</span></div>
                <p class="mb-5 text-sm text-on-surface-variant">문의 채널을 준비하고 있습니다.</p>
                <button type="button" onclick={showPreparationNotice}>문의하기</button>
			</section>

			<aside class="grid gap-4">
				<a class="contact-card" href="https://github.com/xheize" target="_blank" rel="noopener noreferrer"><span class="icon material-symbols-rounded">code</span><span><small>GitHub</small><strong>@xheize</strong></span><span aria-hidden="true" class="material-symbols-rounded">north_east</span></a>
				<div class="contact-card"><span class="icon material-symbols-rounded">location_on</span><span><small>Location</small><strong>Remote · Korea</strong></span></div>
				<div class="rounded-m3-xl border border-outline-variant/20 bg-surface-container-low p-5 sm:p-6"><span aria-hidden="true" class="material-symbols-rounded text-2xl text-primary-text">info</span><h3 class="mt-4 font-outfit text-lg font-bold">준비 중</h3><p class="mt-2 text-sm leading-relaxed text-on-surface-variant">문의 기능은 준비 중이며 현재 메시지를 받지 않습니다.</p></div>
			</aside>
		</div>
	</div>
</main>

<style>
	.ambient { position: absolute; width: min(70vw, 900px); aspect-ratio: 1; top: -30%; left: 50%; transform: translateX(-50%); border-radius: 50%; background: rgba(85,26,139,.2); filter: blur(100px); pointer-events: none; }
	button { display: flex; width: 100%; padding: 0 20px; min-height: 52px; align-items: center; justify-content: center; gap: 10px; border: 0; border-radius: 999px; background: var(--md-sys-color-primary); color: var(--md-sys-color-on-primary); font: 700 .92rem/1 "Outfit", sans-serif; cursor: pointer; box-shadow: var(--shadow-m3-elevation-2); transition: transform 180ms ease, filter 180ms ease; }
	button:hover { filter: brightness(1.12); }
	button:active { transform: scale(.985); }
	.contact-card { display: grid; grid-template-columns: 48px minmax(0,1fr) auto; align-items: center; gap: 13px; min-height: 84px; border: 1px solid rgba(147,143,153,.22); border-radius: 20px; background: var(--md-sys-color-surface-container); padding: 16px; color: var(--md-sys-color-on-surface); text-decoration: none; transition: border-color 180ms ease, transform 180ms ease, background 180ms ease; }
	a.contact-card:hover { transform: translateY(-2px); border-color: rgba(208,188,255,.35); background: var(--md-sys-color-surface-container-high); }
	.contact-card .icon { display: grid; place-items: center; width: 48px; height: 48px; border-radius: 15px; background: rgba(208,188,255,.1); color: var(--md-sys-color-primary-text); }
	.contact-card small, .contact-card strong { display: block; }
	.contact-card small { margin-bottom: 5px; color: var(--md-sys-color-on-surface-variant); font-size: .68rem; text-transform: uppercase; letter-spacing: .1em; }
	.contact-card strong { font: 700 1rem/1.2 "Outfit", sans-serif; }
</style>
