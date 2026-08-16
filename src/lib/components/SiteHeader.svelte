<script>
	import { page } from "$app/state";

	/** @type {{ active?: 'none' | 'home' | 'blog' | 'tech' | 'chat' }} */
	let { active = "home" } = $props();

	let y = $state(0);
	let isScrolled = $derived(y > 16);
	let user = $derived(page.data.user ?? null);
	let authConfigured = $derived(Boolean(page.data.authConfigured));
	let returnTo = $derived(`${page.url.pathname}${page.url.search}`);

	const navItems = [
		{ id: "home", label: "Home", href: "/", icon: "home" },
		{ id: "blog", label: "Blog", href: "/blog", icon: "article" },
		{ id: "tech", label: "Tech", href: "/usedtech", icon: "settings_suggest" },
		{ id: "chat", label: "AI Chat", href: "/aichat", icon: "chat" },
	];
</script>

<svelte:window bind:scrollY={y} />

<header class:scrolled={isScrolled} class="site-header">
	<div class="header-inner">
		<a href="/" class="brand" aria-label="Xheize 홈">
			<span class="brand-mark material-symbols-rounded">fort</span>
			<span class="brand-copy">
				<strong>Xheize</strong>
				<small>personal sandbox</small>
			</span>
		</a>

		<nav class="desktop-nav" aria-label="주요 메뉴">
			{#each navItems as item}
				<a
					href={item.href}
					class:active={active === item.id}
					aria-current={active === item.id ? "page" : undefined}
				>
					<span class="material-symbols-rounded">{item.icon}</span>
					<span>{item.label}</span>
				</a>
			{/each}
		</nav>

		{#if user}
			<a class="account-pill" href="/auth/logout?returnTo=/" aria-label={`${user.name ?? user.email ?? "사용자"} 로그아웃`}>
				{#if user.picture}
					<img src={user.picture} alt="" referrerpolicy="no-referrer" />
				{:else}
					<span class="material-symbols-rounded">account_circle</span>
				{/if}
				<span class="account-name">{user.name ?? user.email ?? "Account"}</span>
				<span class="material-symbols-rounded logout-icon">logout</span>
			</a>
		{:else if authConfigured}
			<a class="account-pill sign-in" href={`/auth/login?returnTo=${encodeURIComponent(returnTo)}`}>
				<span class="material-symbols-rounded">login</span>
				<span class="account-name">Sign in</span>
			</a>
		{:else}
			<div class="status-pill" aria-label="시스템 온라인"><span></span>Online</div>
		{/if}
	</div>
</header>

<nav class="mobile-dock" aria-label="모바일 주요 메뉴">
	{#each navItems as item}
		<a
			href={item.href}
			class:active={active === item.id}
			aria-current={active === item.id ? "page" : undefined}
		>
			<span class="icon-wrap">
				<span class="material-symbols-rounded">{item.icon}</span>
			</span>
			<small>{item.label}</small>
		</a>
	{/each}
</nav>

<style>
	.site-header {
		position: fixed;
		inset: 0 0 auto;
		z-index: 80;
		padding: calc(12px + env(safe-area-inset-top)) clamp(16px, 3vw, 48px) 12px;
		transition: background-color 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
		border-bottom: 1px solid transparent;
	}

	.site-header.scrolled {
		background: rgba(15, 13, 19, 0.82);
		border-color: rgba(147, 143, 153, 0.16);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.22);
		backdrop-filter: blur(20px) saturate(145%);
	}

	.header-inner {
		width: min(100%, 1440px);
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		color: var(--md-sys-color-primary-text);
		text-decoration: none;
		min-width: max-content;
	}

	.brand-mark {
		display: grid;
		place-items: center;
		width: 38px;
		height: 38px;
		border: 1px solid rgba(208, 188, 255, 0.2);
		border-radius: 13px;
		background: linear-gradient(145deg, rgba(208, 188, 255, 0.16), rgba(85, 26, 139, 0.18));
		box-shadow: inset 0 1px rgba(255, 255, 255, 0.08);
		font-size: 21px;
	}

	.brand-copy {
		display: flex;
		flex-direction: column;
		line-height: 1;
	}

	.brand-copy strong {
		font-family: "Outfit", sans-serif;
		font-size: 1.1rem;
		letter-spacing: 0.02em;
	}

	.brand-copy small {
		margin-top: 5px;
		color: var(--md-sys-color-on-surface-variant);
		font: 500 0.62rem/1 "Roboto", sans-serif;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.desktop-nav {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 5px;
		border: 1px solid rgba(147, 143, 153, 0.14);
		border-radius: 999px;
		background: rgba(33, 31, 38, 0.58);
	}

	.desktop-nav a {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		min-height: 40px;
		padding: 0 16px;
		border-radius: 999px;
		color: var(--md-sys-color-on-surface-variant);
		text-decoration: none;
		font: 600 0.8rem/1 "Outfit", sans-serif;
		transition: color 180ms ease, background-color 180ms ease, transform 180ms ease;
	}

	.desktop-nav a:hover {
		color: var(--md-sys-color-primary-text);
		background: rgba(208, 188, 255, 0.08);
	}

	.desktop-nav a:active { transform: scale(0.97); }
	.desktop-nav a.active { color: var(--md-sys-color-on-primary); background: var(--md-sys-color-primary); }
	.desktop-nav .material-symbols-rounded { font-size: 18px; }

	.status-pill {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		min-width: max-content;
		padding: 8px 11px;
		border: 1px solid rgba(52, 211, 153, 0.18);
		border-radius: 999px;
		background: rgba(16, 185, 129, 0.07);
		color: #a7f3d0;
		font: 600 0.68rem/1 "Roboto", sans-serif;
		letter-spacing: 0.04em;
	}

	.status-pill span {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #34d399;
		box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.1), 0 0 12px rgba(52, 211, 153, 0.55);
	}

	.account-pill {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		max-width: 190px;
		min-height: 40px;
		padding: 5px 8px;
		border: 1px solid rgba(208, 188, 255, 0.2);
		border-radius: 999px;
		background: rgba(208, 188, 255, 0.08);
		color: var(--md-sys-color-primary-text);
		text-decoration: none;
		font: 600 0.72rem/1 "Roboto", sans-serif;
	}

	.account-pill img {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		object-fit: cover;
	}

	.account-pill > .material-symbols-rounded { font-size: 20px; }
	.account-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.logout-icon { opacity: 0.65; }
	.sign-in { padding-inline: 13px; }

	.mobile-dock { display: none; }

	@media (max-width: 900px) {
		.desktop-nav a { padding-inline: 12px; }
		.desktop-nav a span:last-child { display: none; }
		.status-pill { display: none; }
		.account-pill { margin-left: auto; }
	}

	@media (max-width: 640px) {
		.site-header { padding: calc(10px + env(safe-area-inset-top)) 16px 10px; }
		.site-header:not(.scrolled) { background: linear-gradient(to bottom, rgba(15, 13, 19, 0.8), transparent); }
		.header-inner { justify-content: flex-start; }
		.desktop-nav { display: none; }
		.brand-mark { width: 36px; height: 36px; }
		.brand-copy small { display: none; }
		.account-pill { max-width: 132px; min-height: 38px; }
		.logout-icon { display: none; }

		.mobile-dock {
			position: fixed;
			z-index: 90;
			left: 12px;
			right: 12px;
			bottom: max(10px, env(safe-area-inset-bottom));
			display: grid;
			grid-template-columns: repeat(4, minmax(0, 1fr));
			padding: 7px;
			border: 1px solid rgba(147, 143, 153, 0.2);
			border-radius: 24px;
			background: rgba(28, 27, 31, 0.9);
			box-shadow: 0 14px 44px rgba(0, 0, 0, 0.45);
			backdrop-filter: blur(22px) saturate(150%);
		}

		.mobile-dock a {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 3px;
			min-width: 0;
			min-height: 54px;
			border-radius: 18px;
			color: var(--md-sys-color-on-surface-variant);
			text-decoration: none;
			-webkit-tap-highlight-color: transparent;
		}

		.icon-wrap {
			display: grid;
			place-items: center;
			width: 46px;
			height: 27px;
			border-radius: 999px;
			transition: background-color 180ms ease, color 180ms ease;
		}

		.mobile-dock a.active { color: var(--md-sys-color-primary-text); }
		.mobile-dock a.active .icon-wrap { background: rgba(208, 188, 255, 0.16); }
		.mobile-dock .material-symbols-rounded { font-size: 20px; }
		.mobile-dock small { overflow: hidden; max-width: 100%; text-overflow: ellipsis; font: 600 0.61rem/1 "Roboto", sans-serif; }
	}

	@media (max-width: 380px) {
		.account-pill { width: 38px; justify-content: center; padding: 4px; }
		.account-name { display: none; }
	}

	@media (prefers-reduced-motion: reduce) {
		.site-header, .desktop-nav a, .icon-wrap { transition: none; }
	}
</style>
