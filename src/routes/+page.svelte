<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	
	let mounted = $state(false);
	let session = $derived($page.data.session);
	
	onMount(() => {
		mounted = true;
	});
</script>

<main>
	<div class="container">
		<div class="hero">
			<h1 class="mat-display-1">Welcome to Xheize's Personal Page</h1>
			<p class="mat-headline">Built with SvelteKit SSR</p>
		</div>

		<div class="content">
			<div class="mat-card">
				<div class="mat-card-content">
					<h2 class="mat-title">About This Site</h2>
					<p class="mat-body-1">
						This is a server-side rendered (SSR) personal page built with SvelteKit. 
						The page is rendered on the server first, then hydrated on the client for interactivity.
					</p>
					{#if mounted}
						<div class="mat-chip success">
							<span class="material-icons">check_circle</span>
							Client-side hydration complete!
						</div>
					{:else}
						<div class="mat-chip">
							<span class="material-icons">hourglass_empty</span>
							Loading client-side code...
						</div>
					{/if}
				</div>
			</div>

			<div class="mat-card">
				<div class="mat-card-content">
					<h2 class="mat-title">Features</h2>
					<ul class="mat-list">
						<li class="mat-list-item">
							<span class="material-icons">bolt</span>
							<span>Server-Side Rendering (SSR)</span>
						</li>
						<li class="mat-list-item">
							<span class="material-icons">palette</span>
							<span>Modern Svelte 5 with Runes</span>
						</li>
						<li class="mat-list-item">
							<span class="material-icons">swap_horiz</span>
							<span>Fast Page Transitions</span>
						</li>
						<li class="mat-list-item">
							<span class="material-icons">devices</span>
							<span>Responsive Design</span>
						</li>
						<li class="mat-list-item">
							<span class="material-icons">rocket_launch</span>
							<span>Optimized Performance</span>
						</li>
					</ul>
				</div>
			</div>

			<div class="mat-card">
				<div class="mat-card-content">
					<h2 class="mat-title">Navigation</h2>
					<div class="button-group">
						<a href="/about" class="mat-button mat-raised-button mat-primary">
							<span class="material-icons">person</span>
							About Me
						</a>
						<a href="/contact" class="mat-button mat-raised-button mat-accent">
							<span class="material-icons">email</span>
							Contact
						</a>
						{#if session?.user}
							<a href="/profile" class="mat-button mat-raised-button mat-primary">
								<span class="material-icons">account_circle</span>
								My Profile (SSO)
							</a>
						{:else}
							<a href="/auth/signin" class="mat-button mat-outlined-button">
								<span class="material-icons">login</span>
								Sign In (SSO)
							</a>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Roboto', sans-serif;
		background: #f5f5f5;
		min-height: 100vh;
	}

	main {
		min-height: 100vh;
		background: linear-gradient(180deg, #1976d2 0%, #1565c0 100%);
		padding: 24px;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.hero {
		text-align: center;
		color: white;
		padding: 48px 24px;
		margin-bottom: 32px;
	}

	.mat-display-1 {
		font-size: 3rem;
		font-weight: 400;
		line-height: 1.2;
		margin: 0 0 16px 0;
		letter-spacing: -0.02em;
	}

	.mat-headline {
		font-size: 1.5rem;
		font-weight: 400;
		line-height: 1.3;
		margin: 0;
		opacity: 0.9;
	}

	.content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 24px;
	}

	.mat-card {
		background: white;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1);
		transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		overflow: hidden;
	}

	.mat-card:hover {
		box-shadow: 0 4px 8px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.15);
	}

	.mat-card-content {
		padding: 24px;
	}

	.mat-title {
		font-size: 1.25rem;
		font-weight: 500;
		line-height: 1.6;
		margin: 0 0 16px 0;
		color: rgba(0,0,0,0.87);
	}

	.mat-body-1 {
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		color: rgba(0,0,0,0.6);
		margin: 0 0 16px 0;
	}

	.mat-chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		background: #e0e0e0;
		border-radius: 16px;
		font-size: 0.875rem;
		font-weight: 500;
		color: rgba(0,0,0,0.87);
	}

	.mat-chip.success {
		background: #c8e6c9;
		color: #2e7d32;
	}

	.mat-chip .material-icons {
		font-size: 18px;
	}

	.mat-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.mat-list-item {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 12px 0;
		color: rgba(0,0,0,0.87);
		border-bottom: 1px solid rgba(0,0,0,0.12);
	}

	.mat-list-item:last-child {
		border-bottom: none;
	}

	.mat-list-item .material-icons {
		color: #1976d2;
		font-size: 24px;
	}

	.button-group {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
	}

	.mat-button {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 0 16px;
		height: 36px;
		border-radius: 4px;
		font-size: 0.875rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.09em;
		text-decoration: none;
		cursor: pointer;
		transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		border: none;
	}

	.mat-raised-button {
		box-shadow: 0 2px 4px rgba(0,0,0,0.14), 0 2px 4px rgba(0,0,0,0.12);
	}

	.mat-raised-button:hover {
		box-shadow: 0 4px 8px rgba(0,0,0,0.16), 0 4px 8px rgba(0,0,0,0.14);
	}

	.mat-primary {
		background: #1976d2;
		color: white;
	}

	.mat-primary:hover {
		background: #1565c0;
	}

	.mat-accent {
		background: #ff4081;
		color: white;
	}

	.mat-accent:hover {
		background: #f50057;
	}

	.mat-outlined-button {
		background: transparent;
		color: #1976d2;
		border: 2px solid #1976d2;
	}

	.mat-outlined-button:hover {
		background: rgba(25, 118, 210, 0.04);
	}

	.mat-button .material-icons {
		font-size: 18px;
	}

	/* 태블릿 디바이스 (768px ~ 1024px) */
	@media (max-width: 1024px) and (min-width: 769px) {
		.container {
			padding: 0 32px;
		}

		.content {
			grid-template-columns: repeat(2, 1fr);
			gap: 20px;
		}

		.mat-display-1 {
			font-size: 2.5rem;
		}

		.mat-headline {
			font-size: 1.35rem;
		}
	}

	/* 모바일 디바이스 (< 768px) */
	@media (max-width: 768px) {
		main {
			padding: 16px;
		}

		.hero {
			padding: 32px 16px;
		}

		.mat-display-1 {
			font-size: 2rem;
		}

		.mat-headline {
			font-size: 1.25rem;
		}

		.content {
			grid-template-columns: 1fr;
			gap: 16px;
		}

		.mat-card {
			border-radius: 8px;
		}

		.mat-card-content {
			padding: 20px;
		}

		.button-group {
			flex-direction: column;
		}

		.mat-button {
			width: 100%;
			justify-content: center;
			height: 56px;
			font-size: 1rem;
		}

		.mat-list-item {
			padding: 10px 0;
		}
	}

	/* 작은 모바일 디바이스 (< 480px) */
	@media (max-width: 480px) {
		.mat-display-1 {
			font-size: 1.75rem;
		}

		.mat-headline {
			font-size: 1.1rem;
		}

		.hero {
			padding: 24px 12px;
		}

		.mat-card-content {
			padding: 16px;
		}

		.mat-title {
			font-size: 1.1rem;
		}

		.mat-body-1 {
			font-size: 0.95rem;
		}
	}
</style>
