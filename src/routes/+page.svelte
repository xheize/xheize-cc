<script>
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	// --- Svelte 5 Runes for State Management ---
	let y = $state(0);
	let innerHeight = $state(800);
	let innerWidth = $state(1200);

	// CPU, RAM, Network and Uptime Dummy Live Metrics
	let cpuUsage = $state(24);
	let ramUsage = $state(62);
	let uptimeDays = $state(128);
	let networkLoad = $state(15);
	let updateLogs = $state([
		"Latest Update: Tech Blog 페이지 추가",
		"In Progress: Tech Blog 디자인 개편",
		"Completed: Docker 컨테이너 오케스트레이션 적용",
	]);
	let activeLogIndex = $state(0);

	// Dynamic calculation based on scroll offset (Runes: $derived)
	let isScrolled = $derived(y > 20);

	// Crossfade animations for Section 1 and Section 2 inside the sticky track (0 ~ 200vh)
	let scrollRatio = $derived(Math.min(1, y / (innerHeight || 1)));

	// Section 1: Landing fade out as we scroll to 100vh
	let landingOpacity = $derived(Math.max(0, 1 - scrollRatio * 2)); // Fades out early (by 50% scroll)
	let sandcastleOpacity = $derived(Math.max(0.05, 1 - scrollRatio)); // Keeps a faint shadow of the castle
	let sandcastleScale = $derived(1 - scrollRatio * 0.15); // Shrinks slightly

	// Section 2: Narrative fade in (starts at 30% scroll, fully visible at 100% scroll / 100vh)
	let narrativeOpacity = $derived(
		scrollRatio < 0.3 ? 0 : Math.min(1, (scrollRatio - 0.3) / 0.7),
	);

	// Narrative translation to give a smooth rising entrance
	let narrativeTranslateY = $derived(
		scrollRatio < 0.3
			? 40
			: Math.max(0, 40 * (1 - (scrollRatio - 0.3) / 0.7)),
	);

	// Scroll handler to smoothly target sections
	/** @param {string} id */
	function scrollToSection(id) {
		const target = document.getElementById(id);
		if (target) {
			target.scrollIntoView({ behavior: "smooth" });
		}
	}

	/** @param {string} url */
	function redirectToPage(url) {
		goto(url);
	}

	// Dynamic tracking of total document scroll height on the client
	let documentHeight = $state(3000);
	$effect(() => {
		// Svelte 5 reactive trigger on scroll/resize
		y;
		innerHeight;
		if (typeof document !== "undefined") {
			documentHeight = document.documentElement.scrollHeight;
		}
	});

	// Derive indicator opacity: 1 normally, fades to 0 as user nears the bottom (within 150px)
	let indicatorOpacity = $derived(
		Math.max(0, Math.min(1, (documentHeight - (y + innerHeight)) / 150)),
	);

	// --- Lifecycle effect for system status animation ---
	$effect(() => {
		// Periodically update mock metrics to show "live status"
		const metricsInterval = setInterval(() => {
			cpuUsage = Math.max(
				5,
				Math.min(95, Math.round(cpuUsage + (Math.random() * 10 - 5))),
			);
			ramUsage = Math.max(
				40,
				Math.min(85, Math.round(ramUsage + (Math.random() * 4 - 2))),
			);
			networkLoad = Math.max(
				2,
				Math.min(60, Math.round(networkLoad + (Math.random() * 8 - 4))),
			);
		}, 3000);

		// Periodically cycle through update log alerts
		const logsInterval = setInterval(() => {
			activeLogIndex = (activeLogIndex + 1) % updateLogs.length;
		}, 5000);

		return () => {
			clearInterval(metricsInterval);
			clearInterval(logsInterval);
		};
	});
</script>

<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />

<svelte:head>
	<title>Xheize | Sandbox</title>
	<meta
		name="description"
		content="모래성(Sandbox) 메타포로 구축된 Svelte 5 기반 개인 인프라 및 기술 포털 서비스 웹사이트."
	/>
	<!-- Typography: Outfit & Roboto -->
	<link
		href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Roboto:wght@300;400;500;700&display=swap"
		rel="stylesheet"
	/>
	<!-- Material Symbols Rounded -->
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
		rel="stylesheet"
	/>
</svelte:head>

<!-- Sticky Header (M3 Top App Bar Style) -->
<header
	class="fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-6 py-4 flex items-center justify-between"
	class:scrolled-header={isScrolled}
>
	<!-- Left: Logo -->
	<button
		onclick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
		class="flex items-center gap-2 bg-transparent border-none cursor-pointer focus:outline-none group text-left p-0"
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
	</button>

	<!-- Right: Quick Navigation Actions -->
	<nav class="flex items-center gap-2">
		<button
			onclick={() => scrollToSection("card-status")}
			class="nav-btn active-nav-btn"
		>
			<span class="material-symbols-rounded text-sm md:hidden">dns</span>
			<span class="hidden md:inline">System Status</span>
		</button>
	</nav>
</header>

<!-- Main Scroll Container -->
<main class="w-full relative bg-background text-on-background">
	<!-- 
		Storytelling Sticky Track: 
		Takes up 200vh of scrolling. 
		Inside, we pin the viewport and overlay Section 1 (Landing) and Section 2 (Narrative) 
		to perform crossfade transitions based on scroll variables.
	-->
	<div class="relative w-full h-[200vh]">
		<div
			class="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center px-6"
		>
			<!-- Background Glowing Core (M3 Ambient Design) -->
			<div
				class="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-primary-text/5 blur-[80px] pointer-events-none -z-10 transition-transform duration-700"
				style="transform: scale({1 + scrollRatio * 0.2})"
			></div>

			<!-- --- SECTION 1: LANDING OVERLAY --- -->
			<div
				class="w-full flex flex-col items-center justify-center text-center transition-all duration-75 relative z-10"
				style="pointer-events: {landingOpacity > 0.01
					? 'auto'
					: 'none'};"
			>
				<!-- Dynamic Sandcastle SVG (Central metaphor) - Fixed opacity/scale -->
				<div
					class="relative mb-6 flex flex-col items-center justify-center pointer-events-none"
					style="opacity: 1;"
				>
					<svg
						class="w-48 h-48 md:w-64 md:h-64 text-primary filter drop-shadow-[0_0_15px_rgba(208,188,255,0.2)]"
						viewBox="0 0 100 100"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<defs>
							<!-- Soft Neon Glow to match the premium aesthetics -->
							<filter
								id="neon-glow"
								x="-20%"
								y="-20%"
								width="140%"
								height="140%"
							>
								<feGaussianBlur
									stdDeviation="3"
									result="blur"
								/>
								<feComposite
									in="SourceGraphic"
									in2="blur"
									operator="over"
								/>
							</filter>
						</defs>

						<!-- Left Tower -->
						<path
							d="M20 70 V45 H32 V70"
							stroke="currentColor"
							stroke-width="2"
							stroke-linejoin="round"
						/>
						<path
							d="M18 45 L26 35 L34 45 Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linejoin="round"
							fill="currentColor"
							fill-opacity="0.1"
						/>

						<!-- Right Tower -->
						<path
							d="M68 70 V45 H80 V70"
							stroke="currentColor"
							stroke-width="2"
							stroke-linejoin="round"
						/>
						<path
							d="M66 45 L74 35 L82 45 Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linejoin="round"
							fill="currentColor"
							fill-opacity="0.1"
						/>

						<!-- Center Main Keep -->
						<path
							d="M36 75 V35 H64 V75"
							stroke="currentColor"
							stroke-width="2"
							stroke-linejoin="round"
						/>
						<path
							d="M33 35 H67 V31 H33 Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linejoin="round"
						/>

						<!-- Battlements (톱니 모양 성벽 상단부) -->
						<path
							d="M38 31 V26 H43 V31 H48 V26 H53 V31 H58 V26 H62 V31"
							stroke="currentColor"
							stroke-width="2"
							stroke-linejoin="round"
						/>

						<!-- Flagpole & Waving Flag -->
						<line
							x1="50"
							y1="26"
							x2="50"
							y2="10"
							stroke="currentColor"
							stroke-width="2"
						/>
						<path
							d="M50 10 H62 L58 14 L62 18 H50 Z"
							stroke="currentColor"
							stroke-width="2"
							fill="currentColor"
							fill-opacity="0.3"
							class="animate-pulse"
						/>

						<!-- Main Gate (성문) -->
						<path
							d="M44 75 V62 C44 57.5 56 57.5 56 62 V75 Z"
							stroke="currentColor"
							stroke-width="2"
							fill="currentColor"
							fill-opacity="0.2"
						/>

						<!-- Ground Foundation / Sand Heap -->
						<path
							d="M10 75 Q50 82 90 75 Q95 82 85 85 Q50 90 15 85 Q5 82 10 75 Z"
							stroke="currentColor"
							stroke-width="2"
							fill="currentColor"
							fill-opacity="0.05"
						/>

						<!-- Floating particles (Sand grains metaphor) -->
						<circle
							cx="28"
							cy="78"
							r="1"
							fill="currentColor"
							class="animate-ping"
							style="animation-duration: 3s"
						/>
						<circle
							cx="72"
							cy="79"
							r="1.5"
							fill="currentColor"
							class="animate-ping"
							style="animation-duration: 4s"
						/>
						<circle
							cx="48"
							cy="48"
							r="1"
							fill="currentColor"
							opacity="0.7"
						/>
						<circle
							cx="53"
							cy="53"
							r="1.2"
							fill="currentColor"
							opacity="0.6"
						/>
					</svg>
				</div>

				<!-- Fadeable text elements container -->
				<div
					class="w-full flex flex-col items-center justify-center transition-opacity duration-75"
					style="opacity: {landingOpacity};"
				>
					<h1
						class="font-outfit font-extrabold text-4xl md:text-6xl tracking-tight max-w-2xl mb-4 text-on-background bg-clip-text"
					>
						모래성에 오신 것을 환영합니다.
					</h1>

					<!-- Whiteboard Alert Card (Latest update logs) -->
					<div
						class="m3-whiteboard relative mx-auto my-6 w-2xl text-left p-5 bg-surface-container-high border border-outline-variant/30 rounded-m3-lg shadow-m3-elevation-2 backdrop-blur-md transition-transform hover:scale-102"
					>
						<div
							class="flex items-center gap-2 text-primary-text font-outfit font-bold text-sm tracking-wider mb-2 uppercase"
						>
							<span class="material-symbols-rounded text-sm"
								>edit_note</span
							>
							<span>변경 사항</span>
						</div>
						<div class="h-12 overflow-hidden relative">
							{#each updateLogs as log, i}
								<p
									class="font-roboto text-sm text-on-surface leading-tight transition-all duration-500 absolute top-0 left-0 w-full"
									style="opacity: {i === activeLogIndex
										? 1
										: 0}; transform: translateY({(i -
										activeLogIndex) *
										20}px);"
								>
									{log}
								</p>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<!-- --- SECTION 2: NARRATIVE OVERLAY --- -->
			<div
				class="w-full flex flex-col items-center justify-center text-center transition-all duration-75 relative z-20 max-w-3xl"
				style="opacity: {narrativeOpacity}; transform: translateY({narrativeTranslateY}px); pointer-events: {narrativeOpacity >
				0.1
					? 'auto'
					: 'none'};"
			>
				<h2
					class="font-outfit font-bold text-3xl md:text-5xl mb-6 text-on-background"
				>
					왜 만들었는가?
				</h2>
				<p
					class="font-roboto text-base md:text-lg text-on-surface-variant leading-relaxed mb-8 max-w-2xl px-4"
				>
					개발을 통해 얻은 지식을 공유하고 유저로서 사용하기 위해
					만들었습니다. 즐겁게 사용해주시면 됩니다. 대부분의 기능은
					구분을 위해 로그인이 필요한점 양해 부탁드립니다.
				</p>
				<p
					class="font-roboto text-base md:text-lg text-on-surface-variant leading-relaxed mb-8 max-w-2xl px-4"
				>
					기술 관련은 아래 버튼을 눌러 확인 해주세요.
				</p>

				<!-- Spec Button -->
				<button
					onclick={() => redirectToPage("/usedtech")}
					class="flex items-center gap-2 bg-primary text-on-primary hover:bg-opacity-90 active:scale-98 transition-all px-8 py-3 rounded-m3-full font-outfit font-semibold shadow-m3-elevation-2"
				>
					<span class="material-symbols-rounded"
						>settings_suggest</span
					>
					<span>관련 기술 확인하기</span>
				</button>
			</div>
		</div>
	</div>

	<!-- --- SECTION 3: APP DASHBOARD --- -->
	<section
		id="dashboard"
		class="relative min-h-screen w-full bg-surface-container-lowest py-24 px-6 md:px-12 flex flex-col items-center justify-center border-t border-outline-variant/20 z-30"
	>
		<div class="max-w-6xl w-full flex flex-col items-center">
			<!-- Headline -->
			<div class="text-center mb-16 max-w-2xl">
				<!-- <div
					class="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-m3-full text-xs font-outfit font-semibold tracking-wider uppercase mb-4"
				>
					<span class="material-symbols-rounded text-sm"
						>dashboard</span
					>
					<span>Service Dashboard</span>
				</div> -->
				<h2
					class="font-outfit font-bold text-3xl md:text-5xl text-on-background mb-4"
				>
					제공 중인 서비스
				</h2>
				<p
					class="font-roboto text-sm md:text-base text-on-surface-variant"
				>
					가상 모래성 인프라에서 안정적으로 호스팅되고 있는 주요
					서비스와 상세 명세입니다.
				</p>
			</div>

			<!-- Grid Menu (M3 Cards) -->
			<div
				class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-stretch"
			>

				<!-- Card 2: Tech Blog -->
				<div
					id="card-blog"
					class="m3-card relative flex flex-col justify-between p-6 bg-surface-container rounded-m3-xl border border-outline-variant/30 transition-all duration-300 hover:shadow-m3-elevation-3 group"
				>
					<div>
						<!-- Card Header Info -->
						<div class="flex items-center justify-between mb-6">
							<div
								class="w-12 h-12 rounded-m3-md bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform"
							>
								<span class="material-symbols-rounded text-2xl"
									>article</span
								>
							</div>
							<span
								class="font-mono text-xs text-secondary/80 font-bold bg-secondary/5 px-2.5 py-1 rounded-m3-sm"
								>POSTS (12)</span
							>
						</div>

						<!-- Card Main content -->
						<h3
							class="font-outfit font-bold text-xl md:text-2xl text-on-surface mb-3 group-hover:text-secondary transition-colors"
						>
							Tech Blog
						</h3>
						<p
							class="font-roboto text-sm text-on-surface-variant leading-relaxed mb-6"
						>
							인프라 자동화 구축, 컨테이너 가상화, Svelte 개발
							철학에 관한 아티클들을 기록합니다. 지속적인 러닝
							커브와 노하우가 집약된 기록 보관소.
						</p>
					</div>

					<!-- Card Footer Action -->
					<div class="mt-4">
						<a
							href="/blog"
							class="w-full flex items-center justify-center gap-2 border-2 border-outline-variant text-secondary py-2.5 px-5 rounded-m3-full font-outfit font-semibold hover:bg-secondary/10 hover:border-secondary/30 active:scale-98 transition-all text-sm text-center decoration-none"
						>
							<span>블로그 읽기</span>
							<span class="material-icons-round text-base"
								>chrome_reader_mode</span
							>
						</a>
					</div>
				</div>

				<!-- Card 3: System Status -->
				<div
					id="card-status"
					class="m3-card relative flex flex-col justify-between p-6 bg-surface-container-high rounded-m3-xl border border-primary/20 shadow-m3-elevation-1 transition-all duration-300 hover:shadow-m3-elevation-3 group"
				>
					<div>
						<!-- Card Header Info -->
						<div class="flex items-center justify-between mb-6">
							<div
								class="w-12 h-12 rounded-m3-md bg-tertiary/10 flex items-center justify-center text-tertiary"
							>
								<span class="material-icons-round text-2xl"
									>dns</span
								>
							</div>
							<div
								class="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold px-2.5 py-1 rounded-m3-sm animate-pulse"
							>
								<span
									class="h-1.5 w-1.5 rounded-full bg-emerald-400"
								></span>
								<span>OPERATIONAL</span>
							</div>
						</div>

						<!-- Card Main content & Live Gauge UI -->
						<h3
							class="font-outfit font-bold text-xl md:text-2xl text-on-surface mb-3"
						>
							System Status
						</h3>

						<!-- M3 Interactive gauges -->
						<div class="space-y-4 mb-4">
							<!-- CPU Gauge -->
							<div>
								<div
									class="flex items-center justify-between text-xs font-mono text-on-surface-variant mb-1"
								>
									<span>CPU Usage</span>
									<span class="text-primary-text font-bold"
										>{cpuUsage}%</span
									>
								</div>
								<div
									class="w-full h-2 bg-surface-container rounded-m3-full overflow-hidden"
								>
									<div
										class="h-full bg-primary-text transition-all duration-1000 ease-out"
										style="width: {cpuUsage}%"
									></div>
								</div>
							</div>

							<!-- Memory Gauge -->
							<div>
								<div
									class="flex items-center justify-between text-xs font-mono text-on-surface-variant mb-1"
								>
									<span>RAM (Memory)</span>
									<span class="text-secondary font-bold"
										>{ramUsage}%</span
									>
								</div>
								<div
									class="w-full h-2 bg-surface-container rounded-m3-full overflow-hidden"
								>
									<div
										class="h-full bg-secondary transition-all duration-1000 ease-out"
										style="width: {ramUsage}%"
									></div>
								</div>
							</div>

							<!-- Network Load Gauge -->
							<div>
								<div
									class="flex items-center justify-between text-xs font-mono text-on-surface-variant mb-1"
								>
									<span>Network Traffic</span>
									<span class="text-tertiary font-bold"
										>{networkLoad} Mbps</span
									>
								</div>
								<div
									class="w-full h-2 bg-surface-container rounded-m3-full overflow-hidden"
								>
									<div
										class="h-full bg-tertiary transition-all duration-1000 ease-out"
										style="width: {networkLoad}%"
									></div>
								</div>
							</div>
						</div>
					</div>

					<!-- Uptime & Details -->
					<div
						class="mt-2 pt-4 border-t border-outline-variant/30 flex items-center justify-between"
					>
						<div class="text-left">
							<span
								class="text-[10px] font-outfit uppercase tracking-widest text-on-surface-variant block"
								>System Uptime</span
							>
							<span
								class="text-sm font-mono text-on-surface font-semibold"
								>{uptimeDays} Days, 14h</span
							>
						</div>
						<button
							onclick={() =>
								alert(
									`인프라 상세 사양:\n- CPU: AMD EPYC 8-Core\n- RAM: 32GB ECC DDR5\n- OS: Alpine Linux 3.19\n- Dockerized Microservices\n- Uptime: ${uptimeDays}일 가동 중`,
								)}
							class="text-xs text-primary-text font-outfit font-bold tracking-wider uppercase hover:underline cursor-pointer bg-transparent border-none p-0"
						>
							Info
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Fixed Scrolling Indicator (Down Arrow) -->
	<button
		onclick={() =>
			window.scrollBy({ top: innerHeight, behavior: "smooth" })}
		class="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary-text transition-all duration-300 bg-transparent border-none cursor-pointer"
		style="opacity: {indicatorOpacity}; pointer-events: {indicatorOpacity >
		0.05
			? 'auto'
			: 'none'};"
	>
		<span
			class="font-outfit text-[10px] uppercase tracking-widest opacity-80"
			>Scroll Down</span
		>
		<span class="material-symbols-rounded animate-bounce text-xl mt-1"
			>keyboard_double_arrow_down</span
		>
	</button>

	<!-- Footer -->
	<footer
		class="w-full bg-surface-container-lowest border-t border-outline-variant/20 py-8 px-6 text-center text-xs font-outfit text-on-surface-variant tracking-wider"
	>
		<p>
			© {new Date().getFullYear()} Xheize Sandbox. All rights reserved.
		</p>
		<p class="mt-1 opacity-70">
			Powered by Svelte 5 (Runes) & Tailwind CSS Dark Theme
		</p>
	</footer>
</main>

<style>
	/* --- Custom M3 Utility Components & Transitions --- */

	:global(html) {
		scroll-behavior: smooth;
	}

	.scrolled-header {
		background-color: rgba(
			20,
			18,
			24,
			0.8
		); /* M3 Surface container / 80% opacity */
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
		background-color: rgba(208, 188, 255, 0.08); /* primary-text 8% */
	}

	.active-nav-btn {
		color: var(--md-sys-color-primary-text);
		border: 1px solid rgba(208, 188, 255, 0.2);
	}

	.m3-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.375rem 0.75rem;
		background-color: var(--md-sys-color-surface-container);
		color: var(--md-sys-color-on-surface);
		border: 1px solid rgba(147, 143, 153, 0.2);
		border-radius: 8px; /* M3 small rounded */
		font-family: "Outfit", sans-serif;
		font-size: 0.8125rem;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.m3-chip:hover {
		background-color: rgba(208, 188, 255, 0.05);
		border-color: rgba(208, 188, 255, 0.4);
	}

	.m3-chip-indicator {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 9999px;
		background-color: var(--md-sys-color-primary-text);
	}

	/* Scale effect for interactive buttons */
	.active\:scale-98:active {
		transform: scale(0.98);
	}
</style>
