<script>
	import { onMount } from 'svelte';
	
	let formSubmitted = $state(false);
	let mounted = $state(false);
	
	onMount(() => {
		mounted = true;
	});
	
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
</svelte:head>

<main>
	<div class="container">
		<a href="/" class="back-link">← Back to Home</a>
		
		<div class="hero">
			<h1>Get in Touch</h1>
			<p class="subtitle">I'd love to hear from you</p>
		</div>

		<div class="content">
			<div class="card form-card">
				<h2>Send a Message</h2>
				{#if formSubmitted}
					<div class="success-message">
						✓ Message sent successfully! (Demo only)
					</div>
				{/if}
				<form onsubmit={handleSubmit}>
					<div class="form-group">
						<label for="name">Name</label>
						<input type="text" id="name" name="name" required />
					</div>
					
					<div class="form-group">
						<label for="email">Email</label>
						<input type="email" id="email" name="email" required />
					</div>
					
					<div class="form-group">
						<label for="message">Message</label>
						<textarea id="message" name="message" rows="5" required></textarea>
					</div>
					
					<button type="submit" disabled={!mounted}>
						{mounted ? 'Send Message' : 'Loading...'}
					</button>
				</form>
			</div>

			<div class="card info-card">
				<h2>Other Ways to Connect</h2>
				<div class="contact-info">
					<div class="contact-item">
						<strong>GitHub</strong>
						<a href="https://github.com/xheize" target="_blank" rel="noopener noreferrer">
							@xheize
						</a>
					</div>
					<div class="contact-item">
						<strong>Email</strong>
						<span>contact@example.com</span>
					</div>
					<div class="contact-item">
						<strong>Location</strong>
						<span>Remote</span>
					</div>
				</div>
				
				<div class="note">
					<strong>Note:</strong> This is a demo contact page. Form submissions 
					are simulated and not actually sent. In a production environment, 
					you would integrate with a backend API or email service.
				</div>
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
		grid-template-columns: 1fr 1fr;
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

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: #333;
	}

	input,
	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 2px solid #e0e0e0;
		border-radius: 6px;
		font-size: 1rem;
		font-family: inherit;
		transition: border-color 0.2s;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: #667eea;
	}

	textarea {
		resize: vertical;
	}

	button {
		width: 100%;
		padding: 1rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.2s;
	}

	button:hover:not(:disabled) {
		transform: translateY(-2px);
	}

	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.success-message {
		padding: 1rem;
		background: #d4edda;
		color: #155724;
		border: 1px solid #c3e6cb;
		border-radius: 6px;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.contact-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
		background: #f8f9fa;
		border-radius: 8px;
	}

	.contact-item strong {
		color: #667eea;
	}

	.contact-item a {
		color: #764ba2;
		text-decoration: none;
	}

	.contact-item a:hover {
		text-decoration: underline;
	}

	.note {
		padding: 1rem;
		background: #fff3cd;
		border-left: 4px solid #ffc107;
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
	}
</style>
