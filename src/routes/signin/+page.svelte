<script>
	import { signIn } from '@auth/sveltekit/client';
	import Paper, { Title, Content } from '@smui/paper';

	// No specific props needed
</script>

<svelte:head>
	<title>Sign In - Xheize's Personal Page</title>
</svelte:head>

<div class="signin-container">
	<div class="signin-paper">
		<Paper elevation={8} class="auth-paper">
			<div class="paper-header">
				<span class="material-icons logo-icon">lock</span>
				<Title>Sign In</Title>
			</div>
			<Content>
				<p class="auth-text">
					Some features on this site require authentication via Authentik SSO.
				</p>
				
				<div class="action-button">
					<button onclick={() => signIn('authentik')} class="mdc-button mdc-button--raised full-width-btn">
						<span class="mdc-button__ripple"></span>
						<i class="material-icons mdc-button__icon" aria-hidden="true">login</i>
						<span class="mdc-button__label">Sign in with Authentik</span>
					</button>
				</div>

				<div class="divider">
					<span>or</span>
				</div>
				
				<div class="action-button">
					<a href="/" class="mdc-button full-width-btn" style="color: rgba(0,0,0,0.6);">
						<span class="mdc-button__ripple"></span>
						<i class="material-icons mdc-button__icon" aria-hidden="true">arrow_back</i>
						<span class="mdc-button__label">Continue without signing in</span>
					</a>
				</div>
			</Content>
		</Paper>
	</div>
</div>

<style>
	.signin-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
	}

	.signin-paper {
		width: 100%;
		max-width: 400px;
	}

	/* Global Paper overrides if needed, but styling via class */
	:global(.auth-paper) {
		overflow: hidden;
		border-radius: 8px !important;
	}

	.paper-header {
		background: #2e7d32; /* Primary Green */
		color: white;
		padding: 32px 24px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
	}

	.logo-icon {
		font-size: 48px;
		color: white;
	}
	
	/* Override Title/Subtitle colors in header if needed */
	:global(.paper-header .mdc-typography--headline6) {
		color: white !important;
		font-size: 1.5rem !important;
	}

	.auth-text {
		color: rgba(0,0,0,0.6);
		text-align: center;
		margin-bottom: 24px;
		line-height: 1.5;
	}

	.action-button {
		margin-bottom: 16px;
		display: flex;
		justify-content: center;
	}
	
	:global(.full-width-btn) {
		width: 100%;
		height: 48px;
	}

	.divider {
		display: flex;
		align-items: center;
		margin: 24px 0;
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
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
</style>
