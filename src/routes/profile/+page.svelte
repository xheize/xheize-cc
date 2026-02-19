<script>
	import { signOut } from '@auth/sveltekit/client';
	
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
	
	// $derived를 사용하여 반응형으로 user 값 추적
	const user = $derived(data.session?.user);
</script>

<svelte:head>
	<title>Profile - Xheize's Personal Page</title>
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
			<button onclick={() => signOut()} class="mat-button logout-button">
				<span class="material-icons">logout</span>
				Sign Out
			</button>
		</div>
		
		<div class="hero">
			<h1 class="mat-display-1">My Profile</h1>
			<p class="mat-headline">Protected by Authentik SSO</p>
		</div>

		<div class="content">
			<div class="mat-card elevation-4">
				<div class="mat-card-header">
					<div class="avatar-large">
						{#if user?.image}
							<img src={user.image} alt={user.name || 'User'} />
						{:else}
							<span class="material-icons">account_circle</span>
						{/if}
					</div>
				</div>
				<div class="mat-card-content">
					<h2 class="mat-title">User Information</h2>
					<div class="info-list">
						<div class="info-item">
							<span class="material-icons">person</span>
							<div class="info-content">
								<div class="info-label">Name</div>
								<div class="info-value">{user?.name || 'Not provided'}</div>
							</div>
						</div>
						<div class="info-item">
							<span class="material-icons">email</span>
							<div class="info-content">
								<div class="info-label">Email</div>
								<div class="info-value">{user?.email || 'Not provided'}</div>
							</div>
						</div>
						<div class="info-item">
							<span class="material-icons">vpn_key</span>
							<div class="info-content">
								<div class="info-label">User ID</div>
								<div class="info-value">{user?.id || 'Not provided'}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="mat-card elevation-4">
				<div class="mat-card-content">
					<h2 class="mat-title">
						<span class="material-icons title-icon">verified_user</span>
						Authentication Status
					</h2>
					<div class="status-chip authenticated">
						<span class="material-icons">check_circle</span>
						Authenticated via Authentik SSO
					</div>
					<p class="mat-body-2 status-info">
						You are currently signed in through Authentik. This allows you to access 
						protected features and personalized content.
					</p>
				</div>
			</div>

			<div class="mat-card elevation-4">
				<div class="mat-card-content">
					<h2 class="mat-title">
						<span class="material-icons title-icon">info</span>
						About This Page
					</h2>
					<p class="mat-body-2">
						This is a protected page that requires authentication. Access is managed 
						through Authentik, an open-source identity provider that supports 
						Single Sign-On (SSO) and OAuth2/OIDC protocols.
					</p>
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
	}

	.back-button,
	.logout-button {
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
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: 'Roboto', sans-serif;
	}

	.back-button:hover,
	.logout-button:hover {
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
		background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
		padding: 48px 24px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.avatar-large {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.avatar-large img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-large .material-icons {
		font-size: 80px;
		color: white;
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

	.title-icon {
		color: #1976d2;
	}

	.info-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.info-item {
		display: flex;
		gap: 16px;
		padding: 16px;
		background: #fafafa;
		border-radius: 4px;
		align-items: flex-start;
	}

	.info-item .material-icons {
		color: #1976d2;
		font-size: 24px;
		flex-shrink: 0;
	}

	.info-content {
		flex: 1;
	}

	.info-label {
		font-size: 0.875rem;
		color: rgba(0,0,0,0.6);
		margin-bottom: 4px;
	}

	.info-value {
		font-size: 1rem;
		color: rgba(0,0,0,0.87);
		font-weight: 500;
	}

	.status-chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 16px;
		border-radius: 16px;
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 16px;
	}

	.status-chip.authenticated {
		background: #c8e6c9;
		color: #2e7d32;
	}

	.status-chip .material-icons {
		font-size: 20px;
	}

	.mat-body-2 {
		font-size: 0.875rem;
		line-height: 1.5;
		color: rgba(0,0,0,0.6);
		margin: 0;
	}

	.status-info {
		margin-top: 8px;
	}

	/* 태블릿 디바이스 (768px ~ 1024px) */
	@media (max-width: 1024px) and (min-width: 769px) {
		.content {
			grid-template-columns: repeat(2, 1fr);
			padding: 0 32px 32px;
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
		.app-bar {
			flex-direction: column;
			align-items: stretch;
			padding: 12px 16px;
			gap: 8px;
		}

		.back-button,
		.logout-button {
			justify-content: center;
			width: 100%;
		}

		.hero {
			padding: 48px 16px;
		}

		.mat-display-1 {
			font-size: 2rem;
		}

		.mat-headline {
			font-size: 1.25rem;
		}

		.content {
			grid-template-columns: 1fr;
			padding: 0 16px 24px;
			gap: 16px;
		}

		.mat-card-content {
			padding: 20px;
		}

		.mat-card-header {
			padding: 40px 20px;
		}

		.avatar-large {
			width: 100px;
			height: 100px;
		}

		.avatar-large .material-icons {
			font-size: 64px;
		}

		.info-item {
			padding: 12px;
		}

		.status-chip {
			padding: 10px 14px;
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
			padding: 32px 16px;
		}

		.mat-card-content {
			padding: 16px;
		}

		.mat-card-header {
			padding: 32px 16px;
		}

		.avatar-large {
			width: 80px;
			height: 80px;
		}

		.avatar-large .material-icons {
			font-size: 48px;
		}

		.mat-title {
			font-size: 1.1rem;
		}

		.info-label,
		.info-value {
			font-size: 0.85rem;
		}
	}
</style>
