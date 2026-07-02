<script>
	import { fade, slide } from "svelte/transition";

	// Svelte 5 Runes for state management
	let activeFilter = $state("all");
	let selectedTechId = $state(null);
	let y = $state(0);
	let isScrolled = $derived(y > 20);

	const profile = {
		name: "Xheize",
		github: "https://github.com/xheize",
		avatar: "/avatar.png",
	};

	const frameworks = [
		{
			id: "sveltekit",
			name: "SvelteKit / Svelte 5",
			category: "framework",
			icon: "web",
			tag: "App Framework",
			desc: "Svelte 5 Runes의 최신 컴파일 방식을 채택하여 최적의 성능과 즉각적인 클라이언트 반응성을 지닌 웹 앱을 구축합니다.",
			why: "가상 DOM의 오버헤드 없이 컴파일 단계에서 반응형 코드 구조를 삽입해 최소한의 번들링 크기와 극대화된 렌더링 성능을 획득합니다.",
			level: "Core Stack",
		},
		{
			id: "tailwindcss",
			name: "Tailwind CSS",
			category: "framework",
			icon: "palette",
			tag: "Design System",
			desc: "Material Design 3 디자인 가이드라인을 바인딩한 커스텀 토큰과 반응형 유틸리티 클래스로 현대적 인터페이스를 설계합니다.",
			why: "인라인 스타일 지정의 직관성과 고도의 테마 확장성 덕분에 일관된 다크/라이트 테마 및 미려한 화면 배치를 보장합니다.",
			level: "Core Stack",
		},
	];

	const infra = [
		{
			id: "container-orchestration-k3s",
			name: "k3s",
			category: "infra",
			icon: "code",
			tag: "Lightweight Kubernetes",
			desc: "가볍고 효율적인 쿠버네티스 배포로, 소규모 환경에서도 안정적인 컨테이너 오케스트레이션을 제공합니다.",
			why: "k3s는 경량화된 쿠버네티스로서 메모리 사용량이 극히 적어, 홈 서버 환경에서도 엔터프라이즈급 컨테이너 오케스트레이션을 하드웨어 무리 없이 안정적으로 실행할 수 있기 때문에 채택했습니다.",
			level: "Core Stack",
		},
		{
			id: "hypervisor-proxmox",
			name: "proxmox",
			category: "infra",
			icon: "vm_array",
			tag: "Baremetal hypervisor",
			desc: "베어메탈 하이퍼바이저로, KVM과 LXC를 통합 관리하여 효율적인 가상화 환경을 제공합니다.",
			why: "Proxmox VE는 오픈소스 기반의 서버 가상화 관리 플랫폼으로, KVM과 LXC 컨테이너 기술을 통합하여 단일 인터페이스로 물리적 서버와 가상 머신을 효율적으로 관리할 수 있습니다.",
			level: "Core Stack",
		},
		{
			id: "os-ubuntu-server",
			name: "ubuntu-server",
			category: "os",
			icon: "os",
			tag: "Linux Distribution",
			desc: "서버 운영을 위한 리눅스 배포판으로, 안정적인 패키지 관리 시스템과 뛰어난 호환성으로 서버 환경을 효율적으로 관리할 수 있습니다.",
			why: "Ubuntu Server는 오픈소스 기반의 서버 운영체제로, 안정적인 패키지 관리 시스템과 뛰어난 호환성으로 서버 운영 환경을 효율적으로 관리할 수 있습니다.",
			level: "Core Stack",
		},
	];

	const software = [
		{
			id: "l4-lb",
			name: "metallb",
			category: "software",
			icon: "setting",
			tag: "LoadBalancer",
			desc: "쿠버네티스 클러스터 내부 서비스들에 로컬 네트워크 대역의 외부 IP를 동적으로 할당해주는 레이어 2/BGP 로드밸런서입니다.",
			why: "퍼블릭 클라우드가 아닌 베어메탈 온프레미스 인프라 환경에서 External IP를 정상적으로 획득하여 외부 트래픽을 인입하기 위해 필수적으로 사용합니다.",
			level: "Core Stack",
		},
		{
			id: "woodpecker",
			name: "Woodpecker CI",
			category: "software",
			icon: "settings_ethernet",
			tag: "CI/CD Pipeline",
			desc: "코드 커밋 시 린트, 테스트 빌드, Docker 이미지 빌드 및 서버 배포 파이프라인을 완전 자동화하는 통합 배포 툴입니다.",
			why: "가볍고 효율적인 파이프라인 관리를 통해 Git 커밋 이후 수동 작업 없는 지속적인 통합 배포 환경을 제공합니다.",
			level: "Automation",
		},
		{
			id: "argo-cd",
			name: "ArgoCD",
			category: "software",
			icon: "sync",
			tag: "GitOps",
			desc: "쿠버네티스를 위한 선언적 GitOps 지속적 배포(CD) 도구로, Git 저장소의 Manifest 상태와 실제 클러스터 리소스 상태를 실시간으로 모니터링하고 동기화합니다.",
			why: "모든 애플리케이션의 배포 상태를 Git 커밋 히스토리로 명확히 관리하고, 휴먼 에러를 방지하며 롤백 편의성을 극대화하기 위해 채택했습니다.",
			level: "Automation",
		},
		{
			id: "l7-lb",
			name: "Traefik",
			category: "software",
			icon: "switch_access",
			tag: "LoadBalancer",
			desc: "컨테이너 환경에 고도로 최적화된 리버스 프록시이자 Ingress Controller로, 유입되는 트래픽의 호스트 헤더 기반 정밀 라우팅 및 SSL/TLS 인증서 자동 갱신을 지원합니다.",
			why: "마이크로서비스들의 다양한 서브도메인을 선언적으로 매핑하고, Let's Encrypt를 통한 와일드카드 HTTPS 보안 인증서를 완전 자동으로 관리하기 위해 도입했습니다.",
			level: "Automation",
		},
	];

	const programingLanguage = [
		{
			id: "typescript",
			name: "TypeScript",
			category: "language",
			icon: "code",
			tag: "Primary Language",
			desc: "타입 안정성 확보 및 대규모 애플리케이션의 유지보수성을 극대화하기 위해 핵심 개발 언어로 사용합니다.",
			why: "컴파일 단계에서 정적 타입을 체크하여 런타임 오류를 차단하며, 리팩토링 시 강력한 IDE 지원으로 생산성을 향상시킵니다.",
			level: "Core Stack",
		},
		{
			id: "javascript",
			name: "JavaScript (ES6+)",
			category: "language",
			icon: "terminal",
			tag: "Dynamic UI Engine",
			desc: "웹 생태계의 기본이자 핵심이 되는 언어로, 비동기 데이터 처리 및 클라이언트 이벤트 제어에 기여합니다.",
			why: "이벤트 루프 기반 비동기 처리에 대한 깊은 이해를 바탕으로 실시간 클라이언트 동기화와 고성능 DOM 바인딩을 설계합니다.",
			level: "Experienced",
		},
		{
			id: "python",
			name: "Python",
			category: "language",
			icon: "integration_instructions",
			tag: "Scripting & Utilities",
			desc: "백엔드 보조 API 서비스, 데이터 분석, 그리고 각종 자동화 스크립트 작성에 활용합니다.",
			why: "강력하고 직관적인 생태계 라이브러리들을 활용해 원격 API 데이터 수집, 자동 텔레그램 봇 등 백그라운드 태스크를 능률적으로 처리합니다.",
			level: "Capable",
		},
		{
			id: "golang",
			name: "Go",
			category: "language",
			icon: "developer_board",
			tag: "System Language",
			desc: "가벼운 메모리 사용량과 초고속 동시성 처리 성능을 요구하는 마이크로서비스 백엔드 엔지니어링 및 고성능 유틸리티 스크립트 작성에 활용합니다.",
			why: "단일 바이너리로 컴파일되어 도커 컨테이너 경량화에 매우 유리하며, 고유의 고루틴(Goroutine) 메커니즘으로 대규모 네트워크 소켓 통신 및 데이터 파이프라인을 효율적으로 다룰 수 있어 채택했습니다.",
			level: "Capable",
		},
	];

	// Derived state using Svelte 5 Rune
	let filteredTechnologies = $derived(
		activeFilter === "all"
			? [...programingLanguage, ...frameworks, ...infra, ...software]
			: activeFilter === "language"
				? programingLanguage
				: activeFilter === "framework"
					? frameworks
					: activeFilter === "infra"
						? infra
						: activeFilter === "software"
							? software
							: []
	);

	/**
	 * Toggles the detailed view of a tech card
	 * @param {string} id
	 */
	function toggleDetails(id) {
		if (selectedTechId === id) {
			selectedTechId = null;
		} else {
			selectedTechId = id;
		}
	}

	/**
	 * Fallback avatar image in case the file loading fails
	 * @param {Event} e
	 */
	function handleAvatarError(e) {
		const target = e.currentTarget;
		target.src =
			"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23d0bcff'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.89-6.07-2.44C7.45 16.27 9.53 15.5 12 15s4.55.77 6.07 2.56C16.43 19.11 14.03 20 12 20z'/%3E%3C/svg%3E";
	}
</script>

<svelte:window bind:scrollY={y} />

<svelte:head>
	<title>Tech - Xheize Sandbox</title>
	<meta name="description" content="현재 사용중인 기술들" />
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
			<a href="/#card-blog" class="nav-btn decoration-none">
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
			<a href="/usedtech" class="nav-btn active-nav-btn decoration-none">
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
		class="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-primary-text/5 blur-[90px] pointer-events-none -top-12 -left-12 -z-10 animate-pulse"
		style="animation-duration: 8s"
	></div>
	<div
		class="absolute w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-full bg-secondary-container/10 blur-[80px] pointer-events-none bottom-1/4 -right-12 -z-10 animate-pulse"
		style="animation-duration: 6s"
	></div>

	<div class="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-8 flex flex-col gap-8">
		<!-- Hero Section -->
		<section class="text-center py-6 md:py-10 max-w-3xl mx-auto">
			<h1
				class="font-outfit font-extrabold text-4xl md:text-5xl tracking-tight text-on-background mb-4 bg-clip-text"
			>
				Used Technology Stack
			</h1>
			<p
				class="text-on-surface-variant text-sm md:text-base leading-relaxed"
			>
				Xheize 인프라 및 핵심 웹 서비스 포털을 구성하는 핵심 기술 스택
				목록입니다. 각 아이템을 클릭하면 채택 상세 배경을 확인할 수
				있습니다.
			</p>
		</section>

		<!-- Main Grid Layout -->
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
			<!-- Left Column: Profile Card (4 cols) -->
			<aside class="lg:col-span-4 flex flex-col gap-6">
				<!-- Profile Card -->
				<div
					class="bg-surface-container border border-outline-variant/30 rounded-m3-xl p-6 shadow-m3-elevation-2 backdrop-blur-md relative overflow-hidden group"
				>
					<!-- Ambient light accent -->
					<div
						class="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all duration-700"
					></div>

					<div
						class="flex flex-col items-center text-center relative z-10"
					>
						<!-- Profile Avatar with animated border glow -->
						<div
							class="relative w-28 h-28 mb-4 p-1.5 rounded-full bg-gradient-to-tr from-primary to-secondary/40 shadow-lg shadow-black/40 group-hover:scale-102 transition-transform duration-500"
						>
							<img
								src={profile.avatar}
								alt={profile.name}
								class="w-full h-full rounded-full object-cover bg-surface"
								onerror={handleAvatarError}
							/>
						</div>

						<h2
							class="font-outfit font-extrabold text-2xl text-on-surface tracking-wide"
						>
							{profile.name}
						</h2>
						<span
							class="text-xs text-primary-text font-mono tracking-wider font-semibold uppercase bg-primary-container/30 px-3 py-1 rounded-m3-full border border-primary/20 mt-1"
						>
							{profile.title}
						</span>

						<p
							class="text-on-surface-variant text-sm mt-4 leading-relaxed px-2"
						>
							{profile.bio}
						</p>

						<!-- Status Chip -->
						<div
							class="flex items-center gap-2 mt-4 px-3 py-1 bg-surface-container-high border border-outline-variant/30 rounded-m3-full text-xs font-mono text-on-surface-variant"
						>
							<span
								class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"
							></span>
							<span>{profile.status}</span>
						</div>

						<!-- Social Buttons / GitHub Link -->
						<div
							class="w-full mt-6 pt-6 border-t border-outline-variant/20 flex flex-col gap-2"
						>
							<a
								href={profile.github}
								target="_blank"
								rel="noopener noreferrer"
								class="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-3 rounded-m3-full font-outfit font-bold hover:bg-opacity-95 active:scale-98 shadow-md hover:shadow-primary/20 hover:shadow-lg transition-all text-sm decoration-none"
							>
								<!-- GitHub logo mock SVG -->
								<svg
									class="w-5 h-5 fill-current"
									viewBox="0 0 24 24"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
									/>
								</svg>
								<span>GitHub Profile</span>
							</a>
						</div>
					</div>
				</div>

				<!-- Visual Spec Summary Box -->
				<div
					class="bg-surface-container-high/40 border border-outline-variant/20 rounded-m3-xl p-5 shadow-sm backdrop-blur-sm"
				>
					<h3
						class="font-outfit font-bold text-sm tracking-wider text-primary-text mb-3 uppercase flex items-center gap-1.5"
					>
						<span class="material-symbols-rounded text-sm"
							>construction</span
						>
						스택 정보 개요
					</h3>
					<ul
						class="space-y-2.5 text-xs text-on-surface-variant font-roboto"
					>
						<li class="flex items-center justify-between">
							<span>구동 환경</span>
							<strong
								class="text-on-surface font-mono font-medium"
								>Docker 컨테이너</strong
							>
						</li>
						<li class="flex items-center justify-between">
							<span>웹 프론트엔드</span>
							<strong
								class="text-on-surface font-mono font-medium"
								>Svelte 5 (Runes)</strong
							>
						</li>
						<li class="flex items-center justify-between">
							<span>인프라 라우터</span>
							<strong
								class="text-on-surface font-mono font-medium"
								>Nginx Reverse Proxy</strong
							>
						</li>
						<li class="flex items-center justify-between">
							<span>CI/CD 자동화</span>
							<strong
								class="text-on-surface font-mono font-medium"
								>Woodpecker CI</strong
							>
						</li>
					</ul>
				</div>
			</aside>

			<!-- Right Column: Technology Card Board (8 cols) -->
			<section class="lg:col-span-8 flex flex-col gap-6">
				<!-- Custom Segmented Buttons for Filtering (Tabs) -->
				<div
					class="flex flex-wrap items-center gap-2 bg-surface-container p-1.5 rounded-m3-full border border-outline-variant/30 backdrop-blur-md"
				>
					<button
						onclick={() => (activeFilter = "all")}
						class="flex-1 min-w-[70px] py-2.5 px-4 rounded-m3-full font-outfit text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap {activeFilter ===
						'all'
							? 'bg-primary text-on-primary'
							: 'text-on-surface-variant hover:bg-primary/10'}"
					>
						<span class="material-symbols-rounded text-sm"
							>grid_view</span
						>
						<span>ALL</span>
					</button>
					<button
						onclick={() => (activeFilter = "language")}
						class="flex-1 min-w-[70px] py-2.5 px-4 rounded-m3-full font-outfit text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap {activeFilter ===
						'language'
							? 'bg-primary text-on-primary'
							: 'text-on-surface-variant hover:bg-primary/10'}"
					>
						<span class="material-symbols-rounded text-sm"
							>code</span
						>
						<span>LANGUAGES</span>
					</button>
					<button
						onclick={() => (activeFilter = "framework")}
						class="flex-1 min-w-[70px] py-2.5 px-4 rounded-m3-full font-outfit text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap {activeFilter ===
						'framework'
							? 'bg-primary text-on-primary'
							: 'text-on-surface-variant hover:bg-primary/10'}"
					>
						<span class="material-symbols-rounded text-sm">web</span
						>
						<span>FRAMEWORKS</span>
					</button>
					<button
						onclick={() => (activeFilter = "infra")}
						class="flex-1 min-w-[70px] py-2.5 px-4 rounded-m3-full font-outfit text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap {activeFilter ===
						'infra'
							? 'bg-primary text-on-primary'
							: 'text-on-surface-variant hover:bg-primary/10'}"
					>
						<span class="material-symbols-rounded text-sm">dns</span
						>
						<span>INFRASTRUCTURE</span>
					</button>
					<button
						onclick={() => (activeFilter = "software")}
						class="flex-1 min-w-[70px] py-2.5 px-4 rounded-m3-full font-outfit text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 whitespace-nowrap {activeFilter ===
						'software'
							? 'bg-primary text-on-primary'
							: 'text-on-surface-variant hover:bg-primary/10'}"
					>
						<span class="material-symbols-rounded text-sm">construction</span>
						<span>SOFTWARE</span>
					</button>
				</div>

				<!-- Technology Cards Board -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					{#each filteredTechnologies as tech (tech.id + '-' + tech.category + '-' + tech.name)}
						<button
							onclick={() => toggleDetails(tech.id)}
							class="w-full text-left bg-surface-container hover:bg-surface-container-high border rounded-m3-xl p-5 shadow-sm transition-all duration-300 group focus:outline-none flex flex-col justify-between {selectedTechId ===
							tech.id
								? 'border-primary/40 shadow-m3-elevation-2 scale-[1.01]'
								: 'border-outline-variant/30'}"
							style="min-height: 200px;"
							transition:fade={{ duration: 150 }}
						>
							<div class="w-full">
								<!-- Card Upper Section (Category + Level badge) -->
								<div
									class="flex items-center justify-between mb-4 w-full"
								>
									<span
										class="text-[10px] font-mono tracking-widest text-primary-text bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-m3-xs font-bold uppercase"
									>
										{tech.category}
									</span>
									<span
										class="text-[10px] font-outfit font-semibold tracking-wider text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded-m3-xs uppercase"
									>
										{tech.level}
									</span>
								</div>

								<!-- Card Title & Icon -->
								<div class="flex items-center gap-3 mb-3">
									<div
										class="w-10 h-10 rounded-m3-md bg-secondary-container/20 border border-secondary-container/30 flex items-center justify-center text-secondary group-hover:scale-105 transition-transform duration-300"
									>
										<span
											class="material-symbols-rounded text-xl"
											>{tech.icon}</span
										>
									</div>
									<div>
										<h3
											class="font-outfit font-extrabold text-lg text-on-surface leading-tight group-hover:text-primary-text transition-colors"
										>
											{tech.name}
										</h3>
										<span
											class="text-xs text-on-surface-variant/70 font-medium font-outfit"
										>
											{tech.tag}
										</span>
									</div>
								</div>

								<!-- Brief Description -->
								<p
									class="text-on-surface-variant text-xs md:text-sm leading-relaxed mb-2 font-light"
								>
									{tech.desc}
								</p>
							</div>

							<!-- Click to reveal / Accordion content -->
							<div
								class="mt-4 pt-3 border-t border-outline-variant/10 w-full"
							>
								{#if selectedTechId === tech.id}
									<div
										transition:slide={{ duration: 200 }}
										class="text-xs text-on-surface leading-relaxed py-2"
									>
										<div
											class="font-outfit font-bold text-primary-text mb-1 uppercase tracking-wider"
										>
											채택 및 활용 배경
										</div>
										<p class="text-on-surface-variant/90">
											{tech.why}
										</p>
									</div>
								{/if}

								<div
									class="flex items-center justify-between text-[10px] font-outfit font-bold tracking-wider uppercase text-primary-text/80 group-hover:text-primary-text mt-1"
								>
									<span
										>{selectedTechId === tech.id
											? "Close details"
											: "Click for detail context"}</span
									>
									<span
										class="material-symbols-rounded text-xs transition-transform duration-300 {selectedTechId ===
										tech.id
											? 'rotate-180'
											: ''}"
									>
										expand_more
									</span>
								</div>
							</div>
						</button>
					{/each}
				</div>

				{#if filteredTechnologies.length === 0}
					<div
						class="text-center py-16 bg-surface-container rounded-m3-xl border border-outline-variant/30 flex flex-col items-center justify-center"
					>
						<span
							class="material-symbols-rounded text-4xl text-on-surface-variant mb-2 animate-bounce"
							>search_off</span
						>
						<p
							class="font-outfit font-bold text-on-surface text-lg"
						>
							No technologies found
						</p>
						<p class="text-xs text-on-surface-variant mt-1">
							이 카테고리에 할당된 기술이 없습니다.
						</p>
					</div>
				{/if}
			</section>
		</div>

		<!-- Bottom Decorative Stack Meta Banner -->
		<footer
			class="mt-8 border-t border-outline-variant/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-outfit tracking-wider text-on-surface-variant/80"
		>
			<p>
				© {new Date().getFullYear()} Xheize Sandbox. Designed with M3 Dark
				Theme.
			</p>
			<p class="opacity-75">
				Svelte 5 (Runes) • Tailwind CSS • Glassmorphism UI
			</p>
		</footer>
	</div>
</main>

<style>
	/* Header styles from main page */
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

	:global(body) {
		background-color: var(--md-sys-color-background);
		margin: 0;
		color: var(--md-sys-color-on-background);
	}
</style>
