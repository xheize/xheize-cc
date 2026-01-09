<script>
	import { signIn } from '@auth/sveltekit/client';
</script>

<svelte:head>
	<title>Sign In - Xheize's Personal Page</title>
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<main>
	<div class="container">
		<div class="signin-card">
			<div class="mat-card elevation-8">
				<div class="mat-card-header">
					<span class="material-icons logo-icon">lock</span>
					<h1 class="mat-display-1">Sign In</h1>
				</div>
				<div class="mat-card-content">
					<p class="mat-body-1">
						Some features on this site require authentication via Authentik SSO.
					</p>
					<button
						onclick={() => signIn('authentik')}
						class="mat-button mat-raised-button mat-primary"
					>
						<span class="material-icons">login</span>
						Sign in with Authentik
					</button>
					<div class="divider">
						<span>or</span>
					</div>
					<a href="/" class="mat-button mat-text-button">
						<span class="material-icons">arrow_back</span>
						Continue without signing in
					</a>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		min-height: 100vh;
		background: linear-gradient(180deg, #1976d2 0%, #1565c0 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
		font-family: 'Roboto', sans-serif;
	}

	.container {
		width: 100%;
		max-width: 480px;
	}

	.signin-card {
		width: 100%;
	}

	.mat-card {
		background: white;
		border-radius: 4px;
		overflow: hidden;
	}

	.elevation-8 {
		box-shadow: 0 5px 10px rgba(0,0,0,0.19), 0 8px 16px rgba(0,0,0,0.23);
	}

	.mat-card-header {
		background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
		color: white;
		padding: 48px 24px;
		text-align: center;
	}

	.logo-icon {
		font-size: 64px;
		width: 64px;
		height: 64px;
		margin: 0 auto 16px;
		display: block;
	}

	.mat-display-1 {
		font-size: 2rem;
		font-weight: 400;
		margin: 0;
	}

	.mat-card-content {
		padding: 32px 24px;
		text-align: center;
	}

	.mat-body-1 {
		font-size: 1rem;
		line-height: 1.5;
		color: rgba(0,0,0,0.6);
		margin: 0 0 24px 0;
	}

	.mat-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 0 24px;
		height: 48px;
		border-radius: 4px;
		font-size: 0.875rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.09em;
		text-decoration: none;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		border: none;
		font-family: 'Roboto', sans-serif;
		width: 100%;
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

	.mat-text-button {
		background: transparent;
		color: #1976d2;
	}

	.mat-text-button:hover {
		background: rgba(25, 118, 210, 0.04);
	}

	.divider {
		margin: 24px 0;
		display: flex;
		align-items: center;
		color: rgba(0,0,0,0.38);
	}

	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: rgba(0,0,0,0.12);
	}

	.divider span {
		padding: 0 16px;
		font-size: 0.875rem;
	}

	.material-icons {
		font-size: 18px;
	}

	@media (max-width: 600px) {
		.mat-display-1 {
			font-size: 1.5rem;
		}

		.mat-card-header {
			padding: 32px 24px;
		}

		.logo-icon {
			font-size: 48px;
			width: 48px;
			height: 48px;
		}
	}
</style>
