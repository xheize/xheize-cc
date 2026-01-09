<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
	
	let clientTime = $state(null);
	
	// 이 코드는 하이드레이션 후 클라이언트에서만 실행됩니다
	$effect(() => {
		clientTime = new Date().toISOString();
	});
</script>

<svelte:head>
	<title>About - Xheize's Personal Page</title>
	<meta name="description" content="About Xheize - Web Developer passionate about modern web technologies" />
</svelte:head>

<main>
	<div class="container">
		<a href="/" class="back-link">← Back to Home</a>
		
		<div class="hero">
			<h1>About Me</h1>
			<p class="subtitle">Passionate about building great web experiences</p>
		</div>

		<div class="content">
			<div class="card profile">
				<h2>{data.profile.name}</h2>
				<p class="title">{data.profile.title}</p>
				<p>{data.profile.experience}</p>
			</div>

			<div class="card">
				<h2>Interests</h2>
				<ul>
					{#each data.profile.interests as interest}
						<li>{interest}</li>
					{/each}
				</ul>
			</div>

			<div class="card ssr-demo">
				<h2>SSR Demonstration</h2>
				<div class="time-info">
					<div>
						<strong>Server Render Time:</strong>
						<code>{data.serverTime}</code>
						<span class="badge">SSR</span>
					</div>
					{#if clientTime}
						<div>
							<strong>Client Hydration Time:</strong>
							<code>{clientTime}</code>
							<span class="badge client">Client</span>
						</div>
					{/if}
				</div>
				<p class="note">
					The server time is rendered during SSR, while the client time 
					appears after JavaScript loads. This shows the page is rendered 
					server-side first, then hydrated on the client.
				</p>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
		padding: 2rem;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.back-link {
		display: inline-block;
		color: white;
		text-decoration: none;
		padding: 0.5rem 1rem;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 6px;
		margin-bottom: 2rem;
		transition: background 0.2s;
	}

	.back-link:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.hero {
		text-align: center;
		color: white;
		padding: 3rem 2rem;
		margin-bottom: 2rem;
	}

	h1 {
		font-size: 3rem;
		margin: 0 0 1rem 0;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
	}

	.subtitle {
		font-size: 1.3rem;
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
	}

	.card h2 {
		margin-top: 0;
		color: #667eea;
	}

	.profile .title {
		color: #764ba2;
		font-size: 1.2rem;
		font-weight: 600;
		margin: 0.5rem 0;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	ul li {
		padding: 0.5rem 0;
		padding-left: 1.5rem;
		position: relative;
	}

	ul li::before {
		content: '▸';
		position: absolute;
		left: 0;
		color: #667eea;
	}

	.ssr-demo {
		grid-column: 1 / -1;
	}

	.time-info {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 1rem 0;
	}

	.time-info div {
		padding: 1rem;
		background: #f8f9fa;
		border-radius: 8px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	code {
		background: white;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-family: 'Courier New', monospace;
		font-size: 0.9rem;
		border: 1px solid #ddd;
	}

	.badge {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		background: #667eea;
		color: white;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
	}

	.badge.client {
		background: #764ba2;
	}

	.note {
		margin-top: 1rem;
		padding: 1rem;
		background: #e7f3ff;
		border-left: 4px solid #2196f3;
		border-radius: 4px;
		font-size: 0.9rem;
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 2rem;
		}

		.subtitle {
			font-size: 1.1rem;
		}

		.content {
			grid-template-columns: 1fr;
		}

		.ssr-demo {
			grid-column: 1;
		}
	}
</style>
