<script>
	import { onMount } from 'svelte';
	
	let mounted = $state(false);
	
	onMount(() => {
		mounted = true;
	});
</script>

<main>
	<div class="hero">
		<h1>Welcome to Xheize's Personal Page</h1>
		<p class="subtitle">Built with SvelteKit SSR ⚡</p>
	</div>

	<section class="content">
		<div class="card">
			<h2>About This Site</h2>
			<p>
				This is a server-side rendered (SSR) personal page built with SvelteKit. 
				The page is rendered on the server first, then hydrated on the client for interactivity.
			</p>
			{#if mounted}
				<p class="status success">✓ Client-side hydration complete!</p>
			{:else}
				<p class="status">Loading client-side code...</p>
			{/if}
		</div>

		<div class="card">
			<h2>Features</h2>
			<ul>
				<li>⚡ Server-Side Rendering (SSR)</li>
				<li>🎨 Modern Svelte 5 with Runes</li>
				<li>🔄 Fast Page Transitions</li>
				<li>📱 Responsive Design</li>
				<li>🚀 Optimized Performance</li>
			</ul>
		</div>

		<div class="card">
			<h2>Navigation</h2>
			<nav>
				<a href="/about">About Me</a>
				<a href="/contact">Contact</a>
			</nav>
		</div>
	</section>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
	}

	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.hero {
		text-align: center;
		color: white;
		padding: 4rem 2rem;
		margin-bottom: 2rem;
	}

	h1 {
		font-size: 3rem;
		margin: 0 0 1rem 0;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	}

	.subtitle {
		font-size: 1.5rem;
		opacity: 0.9;
		margin: 0;
	}

	.content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.card {
		background: white;
		border-radius: 12px;
		padding: 2rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
		transition: transform 0.3s ease;
	}

	.card:hover {
		transform: translateY(-5px);
	}

	.card h2 {
		margin-top: 0;
		color: #667eea;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	ul li {
		padding: 0.5rem 0;
		border-bottom: 1px solid #eee;
	}

	ul li:last-child {
		border-bottom: none;
	}

	nav {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	nav a {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		text-decoration: none;
		border-radius: 8px;
		transition: transform 0.2s ease;
	}

	nav a:hover {
		transform: scale(1.05);
	}

	.status {
		margin-top: 1rem;
		padding: 0.75rem;
		background: #f0f0f0;
		border-radius: 6px;
		font-size: 0.9rem;
	}

	.status.success {
		background: #d4edda;
		color: #155724;
		border: 1px solid #c3e6cb;
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 2rem;
		}

		.subtitle {
			font-size: 1.2rem;
		}

		.content {
			grid-template-columns: 1fr;
		}
	}
</style>
