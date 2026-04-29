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
		</div>

		<div class="hero">
			<h1 class="mat-display-1">My Profile</h1>
			<p class="mat-headline">Public Profile Page</p>
		</div>

		<div class="content">
			<div class="mat-card elevation-4">
				<div class="mat-card-header">
					<div class="avatar-large">
						<span class="material-icons">account_circle</span>
					</div>
				</div>
				<div class="mat-card-content">
					<h2 class="mat-title">User Information</h2>
					<div class="info-list">
						<div class="info-item">
							<span class="material-icons">person</span>
							<div class="info-content">
								<div class="info-label">Name</div>
								<div class="info-value">Guest User</div>
							</div>
						</div>
						<div class="info-item">
							<span class="material-icons">email</span>
							<div class="info-content">
								<div class="info-label">Email</div>
								<div class="info-value">Not provided</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="mat-card elevation-4">
				<div class="mat-card-content">
					<h2 class="mat-title">
						<span class="material-icons title-icon">public</span>
						Access Status
					</h2>
					<div class="status-chip">
						<span class="material-icons">info</span>
						No authentication required
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
	}

	.mat-headline {
		font-size: 1.5rem;
		font-weight: 400;
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
	}

	.elevation-4 {
		box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1);
	}

	.mat-card-header {
		background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
		padding: 48px 24px;
		display: flex;
		justify-content: center;
	}

	.avatar-large {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
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
		margin: 0 0 16px 0;
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
		gap: 12px;
	}

	.info-item {
		display: flex;
		gap: 12px;
		align-items: center;
		padding: 12px;
		background: #f8f9fa;
		border-radius: 4px;
	}

	.status-chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		border-radius: 16px;
		background: #e3f2fd;
		color: #1565c0;
		font-size: 0.875rem;
		font-weight: 500;
	}
</style>
