<script>
	import { onMount } from "svelte";
	import SiteHeader from "$lib/components/SiteHeader.svelte";
	let formSubmitted = $state(false);
	let mounted = $state(false);
	onMount(() => { mounted = true; });
	/** @param {SubmitEvent} event */
	function handleSubmit(event) {
		event.preventDefault();
		formSubmitted = true;
		setTimeout(() => { formSubmitted = false; }, 3000);
	}
</script>

<svelte:head>
	<title>Contact - Xheize Sandbox</title>
	<meta name="description" content="Xheize에게 프로젝트와 기술 이야기를 남겨주세요." />
	<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
</svelte:head>

<SiteHeader active="none" />

<main class="relative min-h-screen overflow-hidden bg-background text-on-background font-roboto">
	<div class="ambient"></div>
	<div class="responsive-shell relative z-10 pt-28 sm:pt-36 pb-16 sm:pb-24">
		<section class="mx-auto max-w-3xl text-center">
			<div class="mb-5 inline-flex items-center gap-2 rounded-m3-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-primary-text"><span class="material-symbols-rounded text-sm">forum</span> OPEN CHANNEL</div>
			<h1 class="font-outfit text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-balance">같이 만들 이야기가<br /><span class="text-primary-text">있으신가요?</span></h1>
			<p class="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-on-surface-variant sm:text-lg">인프라, 웹 서비스, 작은 실험까지. 간단한 메시지를 남겨주세요.</p>
		</section>

		<div class="mx-auto mt-9 grid max-w-6xl gap-5 lg:mt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
			<section class="rounded-m3-xl border border-outline-variant/30 bg-surface-container/90 p-5 shadow-m3-elevation-2 backdrop-blur-xl sm:p-8">
				<div class="mb-6 flex items-center justify-between gap-4"><div><p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary-text">Send a message</p><h2 class="mt-2 font-outfit text-2xl font-bold">무엇을 도와드릴까요?</h2></div><span class="material-symbols-rounded text-3xl text-secondary">send</span></div>
				{#if formSubmitted}<div class="mb-5 flex items-center gap-2 rounded-m3-lg border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-200" role="status"><span class="material-symbols-rounded">check_circle</span> 데모 메시지가 접수되었습니다.</div>{/if}
				<form onsubmit={handleSubmit} class="grid gap-5">
					<label><span>이름</span><input type="text" name="name" autocomplete="name" placeholder="어떻게 불러드릴까요?" required /></label>
					<label><span>이메일</span><input type="email" name="email" autocomplete="email" inputmode="email" placeholder="you@example.com" required /></label>
					<label><span>메시지</span><textarea name="message" rows="6" placeholder="프로젝트나 궁금한 점을 편하게 적어주세요." required></textarea></label>
					<button type="submit" disabled={!mounted}><span>{mounted ? "메시지 보내기" : "준비 중"}</span><span class="material-symbols-rounded">arrow_forward</span></button>
				</form>
			</section>

			<aside class="grid gap-4">
				<a class="contact-card" href="https://github.com/xheize" target="_blank" rel="noopener noreferrer"><span class="icon material-symbols-rounded">code</span><span><small>GitHub</small><strong>@xheize</strong></span><span class="material-symbols-rounded">north_east</span></a>
				<div class="contact-card"><span class="icon material-symbols-rounded">location_on</span><span><small>Location</small><strong>Remote · Korea</strong></span></div>
				<div class="rounded-m3-xl border border-outline-variant/20 bg-surface-container-low p-5 sm:p-6"><span class="material-symbols-rounded text-2xl text-primary-text">info</span><h3 class="mt-4 font-outfit text-lg font-bold">Demo channel</h3><p class="mt-2 text-sm leading-relaxed text-on-surface-variant">현재 폼은 인터페이스 데모이며 실제 메일을 전송하지 않습니다.</p></div>
			</aside>
		</div>
	</div>
</main>

<style>
	.ambient { position: absolute; width: min(70vw, 900px); aspect-ratio: 1; top: -30%; left: 50%; transform: translateX(-50%); border-radius: 50%; background: rgba(85,26,139,.2); filter: blur(100px); pointer-events: none; }
	label { display: grid; gap: 8px; color: var(--md-sys-color-on-surface); font-size: .8rem; font-weight: 600; }
	input, textarea { width: 100%; border: 1px solid rgba(147,143,153,.28); border-radius: 15px; background: rgba(15,13,19,.58); padding: 14px 15px; color: var(--md-sys-color-on-surface); font: 400 1rem/1.4 "Roboto", sans-serif; transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease; }
	textarea { resize: vertical; min-height: 132px; }
	input::placeholder, textarea::placeholder { color: rgba(202,196,208,.55); }
	input:focus, textarea:focus { outline: none; border-color: rgba(208,188,255,.7); background: rgba(15,13,19,.78); box-shadow: 0 0 0 3px rgba(208,188,255,.1); }
	button { display: flex; min-height: 52px; align-items: center; justify-content: center; gap: 10px; border: 0; border-radius: 999px; background: var(--md-sys-color-primary); color: var(--md-sys-color-on-primary); font: 700 .92rem/1 "Outfit", sans-serif; cursor: pointer; box-shadow: var(--shadow-m3-elevation-2); transition: transform 180ms ease, filter 180ms ease; }
	button:hover { filter: brightness(1.12); }
	button:active { transform: scale(.985); }
	button:disabled { cursor: wait; opacity: .6; }
	.contact-card { display: grid; grid-template-columns: 48px minmax(0,1fr) auto; align-items: center; gap: 13px; min-height: 84px; border: 1px solid rgba(147,143,153,.22); border-radius: 20px; background: var(--md-sys-color-surface-container); padding: 16px; color: var(--md-sys-color-on-surface); text-decoration: none; transition: border-color 180ms ease, transform 180ms ease, background 180ms ease; }
	a.contact-card:hover { transform: translateY(-2px); border-color: rgba(208,188,255,.35); background: var(--md-sys-color-surface-container-high); }
	.contact-card .icon { display: grid; place-items: center; width: 48px; height: 48px; border-radius: 15px; background: rgba(208,188,255,.1); color: var(--md-sys-color-primary-text); }
	.contact-card small, .contact-card strong { display: block; }
	.contact-card small { margin-bottom: 5px; color: var(--md-sys-color-on-surface-variant); font-size: .68rem; text-transform: uppercase; letter-spacing: .1em; }
	.contact-card strong { font: 700 1rem/1.2 "Outfit", sans-serif; }
</style>
