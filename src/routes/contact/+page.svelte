<script>
	import { onMount } from 'svelte';
	
	let formSubmitted = $state(false);
	let mounted = $state(false);
	
	onMount(() => {
		mounted = true;
	});
	
	/**
	 * @param {SubmitEvent} event
	 */
	function handleSubmit(event) {
		event.preventDefault();
		formSubmitted = true;
		// 실제 애플리케이션에서는 이 데이터를 서버로 전송합니다
		setTimeout(() => {
			formSubmitted = false;
		}, 3000);
	}
</script>

<svelte:head>
	<title>Contact - Xheize's Personal Page</title>
	<meta name="description" content="Get in touch with Xheize" />
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
			<h1 class="mat-display-1">Get in Touch</h1>
			<p class="mat-headline">I'd love to hear from you</p>
		</div>

		<div class="content">
			<div class="mat-card elevation-4 form-card">
				<div class="mat-card-content">
					<h2 class="mat-title">
						<span class="material-icons">send</span>
						Send a Message
					</h2>
					{#if formSubmitted}
						<div class="mat-snackbar">
							<span class="material-icons">check_circle</span>
							Message sent successfully! (Demo only)
						</div>
					{/if}
					<form onsubmit={handleSubmit}>
						<div class="mat-form-field">
							<label for="name" class="mat-label">Name</label>
							<input type="text" id="name" name="name" class="mat-input" required />
						</div>
						
						<div class="mat-form-field">
							<label for="email" class="mat-label">Email</label>
							<input type="email" id="email" name="email" class="mat-input" required />
						</div>
						
						<div class="mat-form-field">
							<label for="message" class="mat-label">Message</label>
							<textarea id="message" name="message" rows="5" class="mat-input" required></textarea>
						</div>
						
						<button type="submit" class="mat-button mat-raised-button mat-primary" disabled={!mounted}>
							<span class="material-icons">send</span>
							{mounted ? 'Send Message' : 'Loading...'}
						</button>
					</form>
				</div>
			</div>

			<div class="mat-card elevation-4 info-card">
				<div class="mat-card-content">
					<h2 class="mat-title">
						<span class="material-icons">connect_without_contact</span>
						Other Ways to Connect
					</h2>
					<div class="contact-list">
						<div class="contact-item">
							<span class="material-icons item-icon">code</span>
							<div class="item-content">
								<div class="mat-label">GitHub</div>
								<a href="https://github.com/xheize" target="_blank" rel="noopener noreferrer" class="mat-link">
									@xheize
								</a>
							</div>
						</div>
						<div class="contact-item">
							<span class="material-icons item-icon">email</span>
							<div class="item-content">
								<div class="mat-label">Email</div>
								<span class="mat-body-2">contact@example.com</span>
							</div>
						</div>
						<div class="contact-item">
							<span class="material-icons item-icon">location_on</span>
							<div class="item-content">
								<div class="mat-label">Location</div>
								<span class="mat-body-2">Remote</span>
							</div>
						</div>
					</div>
					
					<div class="mat-info-box">
						<span class="material-icons">info</span>
						<p class="mat-body-2">
							<strong>Note:</strong> This is a demo contact page. Form submissions 
							are simulated and not actually sent. In a production environment, 
							you would integrate with a backend API or email service.
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
		grid-template-columns: 1fr 1fr;
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

	.mat-card-content {
		padding: 24px;
	}

	.mat-title {
		font-size: 1.25rem;
		font-weight: 500;
		line-height: 1.6;
		margin: 0 0 24px 0;
		color: rgba(0,0,0,0.87);
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.mat-title .material-icons {
		color: #1976d2;
	}

	.mat-snackbar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 16px;
		background: #323232;
		color: white;
		border-radius: 4px;
		margin-bottom: 24px;
		box-shadow: 0 2px 4px rgba(0,0,0,0.2);
	}

	.mat-snackbar .material-icons {
		color: #4caf50;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.mat-form-field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.mat-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: rgba(0,0,0,0.6);
	}

	.mat-input {
		width: 100%;
		padding: 12px;
		border: 1px solid rgba(0,0,0,0.12);
		border-radius: 4px;
		font-size: 1rem;
		font-family: 'Roboto', sans-serif;
		transition: border-color 0.3s;
		box-sizing: border-box;
	}

	.mat-input:focus {
		outline: none;
		border-color: #1976d2;
		border-width: 2px;
		padding: 11px;
	}

	textarea.mat-input {
		resize: vertical;
		min-height: 100px;
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
		transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		border: none;
		font-family: 'Roboto', sans-serif;
	}

	.mat-raised-button {
		box-shadow: 0 2px 4px rgba(0,0,0,0.14), 0 2px 4px rgba(0,0,0,0.12);
	}

	.mat-raised-button:hover:not(:disabled) {
		box-shadow: 0 4px 8px rgba(0,0,0,0.16), 0 4px 8px rgba(0,0,0,0.14);
	}

	.mat-primary {
		background: #1976d2;
		color: white;
	}

	.mat-primary:hover:not(:disabled) {
		background: #1565c0;
	}

	.mat-primary:disabled {
		background: rgba(0,0,0,0.12);
		color: rgba(0,0,0,0.26);
		cursor: not-allowed;
		box-shadow: none;
	}

	.contact-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 24px;
	}

	.contact-item {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		padding: 16px;
		background: #fafafa;
		border-radius: 4px;
	}

	.item-icon {
		color: #1976d2;
		font-size: 24px;
	}

	.item-content {
		flex: 1;
	}

	.mat-body-2 {
		font-size: 0.875rem;
		font-weight: 400;
		line-height: 1.5;
		color: rgba(0,0,0,0.6);
		margin: 0;
	}

	.mat-link {
		color: #1976d2;
		text-decoration: none;
		font-size: 0.875rem;
	}

	.mat-link:hover {
		text-decoration: underline;
	}

	.mat-info-box {
		display: flex;
		gap: 12px;
		padding: 16px;
		background: #fff3e0;
		border-radius: 4px;
		border-left: 4px solid #ff9800;
	}

	.mat-info-box .material-icons {
		color: #ff9800;
		font-size: 20px;
		flex-shrink: 0;
	}

	/* 태블릿 디바이스 (768px ~ 1024px) */
	@media (max-width: 1024px) and (min-width: 769px) {
		.content {
			grid-template-columns: 1fr;
			max-width: 800px;
			margin: 0 auto;
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
			padding: 12px 16px;
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

		.mat-button {
			height: 56px;
			font-size: 1rem;
		}

		.contact-item {
			padding: 12px;
		}

		.mat-info-box {
			padding: 12px;
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

		.mat-title {
			font-size: 1.1rem;
		}

		.mat-input {
			padding: 10px;
		}

		.contact-item {
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
		}
	}
</style>
