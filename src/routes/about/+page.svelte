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
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<main>
	<div class="container">
		<div class="app-bar">
			<a href="/" class="mat-button back-button">
				<span class="material-icons">arrow_back</span>
				Back to Home
			</a>
		</div>
		
		<div class="hero">
			<h1 class="mat-display-1">About Me</h1>
			<p class="mat-headline">Passionate about building great web experiences</p>
		</div>

		<div class="content">
			<div class="mat-card elevation-4">
				<div class="mat-card-header">
					<div class="avatar">
						<span class="material-icons">person</span>
					</div>
					<div class="header-text">
						<h2 class="mat-title">{data.profile.name}</h2>
						<p class="mat-subheading">{data.profile.title}</p>
					</div>
				</div>
				<div class="mat-card-content">
					<p class="mat-body-1">{data.profile.experience}</p>
				</div>
			</div>

			<div class="mat-card elevation-4">
				<div class="mat-card-content">
					<h2 class="mat-title">
						<span class="material-icons title-icon">interests</span>
						Interests
					</h2>
					<div class="chips-container">
						{#each data.profile.interests as interest}
							<div class="mat-chip mat-primary">
								{interest}
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="mat-card elevation-4 ssr-demo">
				<div class="mat-card-content">
					<h2 class="mat-title">
						<span class="material-icons title-icon">schedule</span>
						SSR Demonstration
					</h2>
					<div class="time-info">
						<div class="info-row">
							<div class="info-label">
								<span class="material-icons">dns</span>
								<strong>Server Render Time:</strong>
							</div>
							<code class="mat-code">{data.serverTime}</code>
							<div class="mat-chip server-chip">SSR</div>
						</div>
						{#if clientTime}
							<div class="info-row">
								<div class="info-label">
									<span class="material-icons">computer</span>
									<strong>Client Hydration Time:</strong>
								</div>
								<code class="mat-code">{clientTime}</code>
								<div class="mat-chip client-chip">Client</div>
							</div>
						{/if}
					</div>
					<div class="mat-info-box">
						<span class="material-icons">info</span>
						<p class="mat-body-2">
							The server time is rendered during SSR, while the client time 
							appears after JavaScript loads. This shows the page is rendered 
							server-side first, then hydrated on the client.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		background: #f5f5f5;
		min-height: 100vh;
		padding: 0;
		font-family: 'Roboto', sans-serif;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.app-bar {
		background: #1976d2;
		padding: 16px 24px;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1);
	}

	.back-button {
		color: white;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		border-radius: 4px;
		transition: background-color 0.3s;
		font-weight: 500;
		text-transform: uppercase;
		font-size: 0.875rem;
		letter-spacing: 0.09em;
	}

	.back-button:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.hero {
		background: linear-gradient(180deg, #1976d2 0%, #1565c0 100%);
		text-align: center;
		color: white;
		padding: 64px 24px;
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
		padding: 0 24px 32px;
	}

	.mat-card {
		background: white;
		border-radius: 4px;
		overflow: hidden;
		transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.elevation-4 {
		box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1);
	}

	.elevation-4:hover {
		box-shadow: 0 4px 8px rgba(0,0,0,0.15), 0 8px 16px rgba(0,0,0,0.15);
	}

	.mat-card-header {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 24px;
		background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
		color: white;
	}

	.avatar {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.avatar .material-icons {
		font-size: 32px;
		color: white;
	}

	.header-text {
		flex: 1;
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
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.mat-subheading {
		font-size: 1rem;
		font-weight: 500;
		opacity: 0.9;
		margin: 0;
	}

	.mat-body-1 {
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		color: rgba(0,0,0,0.6);
		margin: 0;
	}

	.mat-body-2 {
		font-size: 0.875rem;
		font-weight: 400;
		line-height: 1.5;
		color: rgba(0,0,0,0.6);
		margin: 0;
	}

	.title-icon {
		color: #1976d2;
	}

	.chips-container {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	.mat-chip {
		display: inline-flex;
		align-items: center;
		padding: 8px 16px;
		border-radius: 16px;
		font-size: 0.875rem;
		font-weight: 500;
		background: #e0e0e0;
		color: rgba(0,0,0,0.87);
	}

	.mat-chip.mat-primary {
		background: #e3f2fd;
		color: #1976d2;
	}

	.ssr-demo {
		grid-column: 1 / -1;
	}

	.time-info {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 24px;
	}

	.info-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px;
		padding: 16px;
		background: #fafafa;
		border-radius: 4px;
		border-left: 4px solid #1976d2;
	}

	.info-label {
		display: flex;
		align-items: center;
		gap: 8px;
		color: rgba(0,0,0,0.87);
		font-size: 0.875rem;
	}

	.info-label .material-icons {
		font-size: 20px;
		color: #1976d2;
	}

	.mat-code {
		background: white;
		padding: 4px 8px;
		border-radius: 4px;
		font-family: 'Roboto Mono', monospace;
		font-size: 0.875rem;
		border: 1px solid #e0e0e0;
		color: #d32f2f;
	}

	.server-chip {
		background: #1976d2;
		color: white;
		padding: 4px 12px;
		font-size: 0.75rem;
	}

	.client-chip {
		background: #ff4081;
		color: white;
		padding: 4px 12px;
		font-size: 0.75rem;
	}

	.mat-info-box {
		display: flex;
		gap: 12px;
		padding: 16px;
		background: #e3f2fd;
		border-radius: 4px;
		border-left: 4px solid #2196f3;
	}

	.mat-info-box .material-icons {
		color: #2196f3;
		font-size: 20px;
		flex-shrink: 0;
	}

	@media (max-width: 768px) {
		.mat-display-1 {
			font-size: 2rem;
		}

		.mat-headline {
			font-size: 1.25rem;
		}

		.content {
			grid-template-columns: 1fr;
		}

		.ssr-demo {
			grid-column: 1;
		}

		.info-row {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
