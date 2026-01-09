<svelte:head>
	<title>Authentication Error - Xheize's Personal Page</title>
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</svelte:head>

<main>
	<div class="container">
		<div class="error-card">
			<div class="mat-card elevation-8">
				<div class="mat-card-header error-header">
					<span class="material-icons error-icon">error_outline</span>
					<h1 class="mat-display-1">Authentication Error</h1>
				</div>
				<div class="mat-card-content">
					<p class="mat-body-1">
						There was a problem signing you in. This could be due to:
					</p>
					<ul class="error-list">
						<li>Invalid Authentik credentials</li>
						<li>Incorrect configuration</li>
						<li>Network connectivity issues</li>
					</ul>
					<div class="button-group">
						<a href="/auth/signin" class="mat-button mat-raised-button mat-primary">
							<span class="material-icons">refresh</span>
							Try Again
						</a>
						<a href="/" class="mat-button mat-text-button">
							<span class="material-icons">home</span>
							Go Home
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		min-height: 100vh;
		background: linear-gradient(180deg, #d32f2f 0%, #c62828 100%);
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

	.error-card {
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
		color: white;
		padding: 48px 24px;
		text-align: center;
	}

	.error-header {
		background: linear-gradient(135deg, #d32f2f 0%, #c62828 100%);
	}

	.error-icon {
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
	}

	.mat-body-1 {
		font-size: 1rem;
		line-height: 1.5;
		color: rgba(0,0,0,0.6);
		margin: 0 0 16px 0;
	}

	.error-list {
		list-style: none;
		padding: 0;
		margin: 0 0 32px 0;
	}

	.error-list li {
		padding: 12px;
		margin-bottom: 8px;
		background: #ffebee;
		border-left: 4px solid #d32f2f;
		border-radius: 4px;
		color: rgba(0,0,0,0.87);
	}

	.button-group {
		display: flex;
		flex-direction: column;
		gap: 12px;
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

		.error-icon {
			font-size: 48px;
			width: 48px;
			height: 48px;
		}
	}
</style>
