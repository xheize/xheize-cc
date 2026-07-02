<script>
	import { fade, slide } from "svelte/transition";
	import { onMount } from "svelte";

	// Svelte 5 Runes for state management
	let { data } = $props();
	let y = $state(0);
	let isScrolled = $derived(y > 20);

	let inputValue = $state("");
	let isTyping = $state(false);
	let chatContainer = $state(null);

	let messages = $state([
		{
			id: "welcome",
			sender: "ai",
			text: "안녕하세요! Xheize Sandbox AI 챗봇 도우미입니다. 이 포털의 주요 기술 스택이나 제공되는 서비스 인프라에 대해 질문해 보세요! 무엇을 도와드릴까요?",
			time: new Date().toLocaleTimeString("ko-KR", {
				hour: "2-digit",
				minute: "2-digit",
			}),
		},
	]);

	const suggestions = [
		"이 사이트에 쓰인 기술 스택이 뭐야?",
		"블로그에는 어떤 글이 올라와 있어?",
		"개발자 GitHub 주소가 어떻게 돼?",
		"시스템 상태 정보에 대해 알려줘",
	];

	/**
	 * Auto-scroll to the bottom of the chat container
	 */
	function scrollToBottom() {
		setTimeout(() => {
			if (chatContainer) {
				chatContainer.scrollTop = chatContainer.scrollHeight;
			}
		}, 50);
	}

	onMount(() => {
		scrollToBottom();
	});

	/**
	 * Handle sending message
	 * @param {Event} [e]
	 */
	function handleSend(e) {
		if (e) e.preventDefault();
		if (!inputValue.trim() || isTyping) return;

		const userText = inputValue;
		inputValue = "";

		// 1. Add User Message
		messages = [
			...messages,
			{
				id: "msg-user-" + Date.now(),
				sender: "user",
				text: userText,
				time: new Date().toLocaleTimeString("ko-KR", {
					hour: "2-digit",
					minute: "2-digit",
				}),
			},
		];
		scrollToBottom();

		// 2. Trigger Typing State
		isTyping = true;
		scrollToBottom();

		sendChatStream(userText);
	}

	/**
	 * vllm request chat
	 * @param {string} [userText]
	 * @param {string} [systemPrompt]
	 * @param {string} [userPrompt]
	 */
	async function sendChatStream(userText, systemPrompt, userPrompt) {
		let chatLog = "";
		const response = await fetch(
			"http://vllm.xheize.cc/v1/chat/completions",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: "xheize-rlhf",
					messages: [{ role: "user", content: userText }],
					stream: true,
				}),
			},
		);

		if (!response.body) return;

		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let isDone = false;

		while (!isDone) {
			const { value, done } = await reader.read();
			isDone = done;

			const chunk = decoder.decode(value, { stream: !done });
			// vLLM(OpenAI 규격)의 chunk는 'data: {...}' 형태로 들어옵니다.
			const lines = chunk
				.split("\n")
				.filter((line) => line.trim() !== "");

			for (const line of lines) {
				if (line.includes("[DONE]")) return; // 스트림 종료 조건
				if (line.startsWith("data: ")) {
					try {
						const json = JSON.parse(line.replace("data: ", ""));
						const content = json.choices[0]?.delta?.content || "";
						chatLog += content; // Svelte의 반응성 덕분에 실시간으로 화면 갱신
					} catch (e) {
						// 파싱 에러 방어 코드 (chunk가 잘려서 들어오는 경우 대비)
					}
				}
			}
		}
	}
</script>

<svelte:window bind:scrollY={y} />

<svelte:head>
	<title>AI Chat - Xheize Sandbox</title>
	<meta
		name="description"
		content="Xheize Sandbox의 AI 어시스턴트와 실시간 대화하여 가상 인프라 포털 및 기술 명세서를 탐색하세요."
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
	class="w-full min-h-screen bg-background text-on-background relative overflow-hidden font-roboto selection:bg-primary-text/30 selection:text-white flex flex-col justify-between"
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
			<a href="/usedtech" class="nav-btn decoration-none">
				<span class="material-symbols-rounded text-sm md:hidden"
					>settings_suggest</span
				>
				<span class="hidden md:inline">Tech Stack</span>
			</a>
			<a href="/aichat" class="nav-btn active-nav-btn decoration-none">
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

	<!-- Content Container -->
	<div
		class="max-w-6xl w-full mx-auto px-4 md:px-8 pt-28 pb-6 flex-1 flex flex-col gap-6 items-stretch overflow-hidden"
	>
		<!-- Welcome Title -->
		<section class="text-center py-2 max-w-xl mx-auto">
			<h1
				class="font-outfit font-extrabold text-3xl md:text-4xl tracking-tight text-on-background mb-2 bg-clip-text"
			>
				Large Language Model
			</h1>
			<p class="text-on-surface-variant text-xs md:text-sm">
				heretic 기법을 사용해 무검열 모델을 제공합니다
			</p>
		</section>

		<!-- Chat Layout Grid -->
		<div
			class="flex-1 flex flex-col lg:flex-row gap-6 items-stretch min-h-[450px] overflow-hidden"
		>
			<!-- Left Panel: Profile & Suggestions Sidebar (Desktop only) -->
			<aside class="hidden lg:flex lg:w-1/3 flex-col gap-5">
				<!-- Quick Bot Profile Card -->
				<div
					class="bg-surface-container border border-outline-variant/30 rounded-m3-xl p-5 shadow-m3-elevation-1 backdrop-blur-md relative overflow-hidden group"
				>
					<div
						class="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/20 blur-2xl group-hover:bg-primary/30 transition-all duration-700"
					></div>
					<div
						class="flex flex-col items-center text-center relative z-10"
					>
						<div
							class="relative w-20 h-20 mb-3 p-1 rounded-full bg-gradient-to-tr from-primary to-secondary/40 shadow-md"
						>
							<!-- AI Profile Custom Avatar graphic -->
							<div
								class="w-full h-full rounded-full bg-surface-container-high flex items-center justify-center text-primary-text"
							>
								<span
									class="material-symbols-rounded text-4xl animate-pulse"
									>smart_toy</span
								>
							</div>
						</div>
						<h2
							class="font-outfit font-bold text-lg text-on-surface"
						>
							xheize
						</h2>
						<span
							class="text-[10px] text-primary-text font-mono tracking-wider font-semibold uppercase bg-primary-container/20 px-2.5 py-0.5 rounded-m3-full border border-primary/20 mt-1"
						>
							Sandbox Assistant
						</span>
						<p
							class="text-on-surface-variant text-xs mt-3 leading-relaxed"
						></p>
						<div
							class="flex items-center gap-2 mt-4 px-3 py-1 bg-surface-container-high border border-outline-variant/30 rounded-m3-full text-[10px] font-mono text-on-surface-variant"
						>
							<span
								class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"
							></span>
							<span>Agent Operational</span>
						</div>
					</div>
				</div>

				<!-- Suggested Questions Container -->
				<div
					class="bg-surface-container-high/30 border border-outline-variant/20 rounded-m3-xl p-5 shadow-sm backdrop-blur-sm flex-1 flex flex-col gap-3"
				>
					<h3
						class="font-outfit font-bold text-xs tracking-wider text-primary-text uppercase flex items-center gap-1.5"
					>
						<span class="material-symbols-rounded text-sm"
							>settings_ethernet</span
						>
						프롬프트 설정
					</h3>
					<div class="flex flex-col gap-2.5">
						<div
							class="font-outfit font-bold text-sm text-on-surface gap-2"
						>
							시스템 프롬프트
							<textarea
								class="w-full h-32 rounded-lg px-3 py-2 text-on-surface bg-surface-container-high border border-outline-variant/30 shadow-sm backdrop-blur-sm resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
								placeholder="여기에 시스템 프롬프트를 입력하세요..."
							></textarea>
						</div>
						<div
							class="font-outfit font-bold text-sm text-on-surface gap-2"
						>
							사용자 프롬프트
							<textarea
								class="w-full h-32 rounded-lg px-3 py-2 text-on-surface bg-surface-container-high border border-outline-variant/30 shadow-sm backdrop-blur-sm resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
								placeholder="여기에 시스템 프롬프트를 입력하세요..."
							></textarea>
						</div>
					</div>
				</div>
			</aside>

			<!-- Right Panel: Chat Terminal interface -->
			<div
				class="flex-1 flex flex-col bg-surface-container border border-outline-variant/30 rounded-m3-xl shadow-m3-elevation-2 backdrop-blur-md overflow-hidden relative"
			>
				<!-- Message list area (scrollable) -->
				<div
					bind:this={chatContainer}
					class="flex-1 overflow-y-auto px-5 py-6 space-y-4 chat-scroll bg-surface-container-lowest/20"
				>
					{#each messages as msg (msg.id)}
						<div
							class="flex flex-col {msg.sender === 'user'
								? 'items-end'
								: 'items-start'} gap-1.5"
							transition:fade={{ duration: 120 }}
						>
							<!-- Sender label & time stamp -->
							<div
								class="flex items-center gap-1.5 text-[9px] text-on-surface-variant/80 font-mono px-1"
							>
								{#if msg.sender === "ai"}
									<span
										class="font-outfit font-bold text-primary-text"
										>ASSISTANT</span
									>
								{:else}
									<span class="font-outfit font-bold"
										>YOU</span
									>
								{/if}
								<span>•</span>
								<span>{msg.time}</span>
							</div>

							<!-- Bubble content -->
							<div
								class="max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-m3-xl text-sm leading-relaxed shadow-sm break-all
								{msg.sender === 'user'
									? 'bg-primary text-on-primary rounded-tr-none font-medium'
									: 'bg-surface-container-high border border-outline-variant/15 text-on-surface rounded-tl-none font-light'}"
							>
								<p
									class="whitespace-pre-line m-0 text-xs sm:text-sm leading-relaxed"
								>
									{msg.text}
								</p>
							</div>
						</div>
					{/each}

					<!-- Typing status indicator -->
					{#if isTyping}
						<div
							class="flex flex-col items-start gap-1.5"
							transition:fade={{ duration: 100 }}
						>
							<div
								class="flex items-center gap-1.5 text-[9px] text-on-surface-variant/80 font-mono px-1"
							>
								<span
									class="font-outfit font-bold text-primary-text"
									>ASSISTANT</span
								>
								<span>•</span>
								<span>Typing...</span>
							</div>
							<div
								class="bg-surface-container-high border border-outline-variant/15 rounded-m3-xl rounded-tl-none px-4 py-3.5 flex items-center gap-1.5 shadow-sm"
							>
								<span
									class="w-1.5 h-1.5 rounded-full bg-primary-text animate-bounce"
									style="animation-delay: 0ms"
								></span>
								<span
									class="w-1.5 h-1.5 rounded-full bg-primary-text animate-bounce"
									style="animation-delay: 150ms"
								></span>
								<span
									class="w-1.5 h-1.5 rounded-full bg-primary-text animate-bounce"
									style="animation-delay: 300ms"
								></span>
							</div>
						</div>
					{/if}
				</div>

				<!-- Mobile Inline Suggestions Panel -->
				<div
					class="lg:hidden px-4 py-2 border-t border-outline-variant/10 bg-surface-container-low/50"
				>
					<div
						class="flex items-center gap-2 overflow-x-auto py-1 scroll-smooth"
						style="scrollbar-width: none; -ms-overflow-style: none;"
					>
						{#each suggestions as sug}
							<button
								onclick={() => sendSuggestedQuestion(sug)}
								disabled={isTyping}
								class="flex-shrink-0 text-[10px] bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/20 text-on-surface px-2.5 py-1.5 rounded-m3-full transition-all duration-150 disabled:opacity-50"
							>
								{sug}
							</button>
						{/each}
					</div>
				</div>

				<!-- Chat input form -->
				<form
					onsubmit={handleSend}
					class="p-4 border-t border-outline-variant/20 bg-surface-container-high/30 flex items-center gap-3 relative"
				>
					<input
						type="text"
						bind:value={inputValue}
						placeholder={isTyping
							? "답변을 기다리는 중입니다..."
							: "메시지를 입력해 주세요..."}
						disabled={isTyping}
						class="flex-1 bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-m3-full py-3.5 pl-5 pr-14 focus:outline-none focus:border-primary/50 text-sm placeholder-on-surface-variant/50 transition-colors w-full disabled:opacity-60"
					/>

					<!-- Send Button inside input right -->
					<button
						type="submit"
						disabled={!inputValue.trim() || isTyping}
						class="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary text-on-primary hover:bg-opacity-95 active:scale-95 transition-all flex items-center justify-center disabled:opacity-40 border-none cursor-pointer"
					>
						<span class="material-symbols-rounded text-lg"
							>send</span
						>
					</button>
				</form>
			</div>
		</div>

		<!-- Footer Meta -->
		<footer
			class="border-t border-outline-variant/20 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] font-outfit tracking-wider text-on-surface-variant/80"
		>
			<p>
				© {new Date().getFullYear()} Xheize Sandbox. Designed with M3 Dark
				Theme.
			</p>
			<p class="opacity-75">
				Svelte 5 Runes • Tailwind CSS • Glassmorphic Terminal
			</p>
		</footer>
	</div>
</main>

<style>
	/* Header and navigation styling ported from main page */
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

	/* Scrollbar custom style */
	.chat-scroll::-webkit-scrollbar {
		width: 6px;
	}
	.chat-scroll::-webkit-scrollbar-track {
		background: transparent;
	}
	.chat-scroll::-webkit-scrollbar-thumb {
		background: rgba(208, 188, 255, 0.15);
		border-radius: 9999px;
	}
	.chat-scroll::-webkit-scrollbar-thumb:hover {
		background: rgba(208, 188, 255, 0.3);
	}

	:global(body) {
		background-color: var(--md-sys-color-background);
		margin: 0;
		color: var(--md-sys-color-on-background);
	}
</style>
