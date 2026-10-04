<script>
	/** @type {{ title: string, description: string }} */
	let { title, description } = $props();
</script>

<header class="page-heading">
	<h1>{title}</h1>
	<p>{description}</p>
</header>

<style>
	.page-heading { max-width: 52rem; margin-bottom: var(--site-section-gap); }
	h1 { margin: 0; font-size: clamp(2rem, 4.2vw, 3.5rem); font-weight: 700; line-height: 1.18; letter-spacing: -.035em; word-break: keep-all; overflow-wrap: anywhere; text-wrap: balance; }
	p { max-width: 44rem; margin: 20px 0 0; color: var(--md-sys-color-on-surface-variant); font-size: clamp(.95rem, 1.2vw, 1.0625rem); line-height: 1.8; word-break: keep-all; overflow-wrap: anywhere; }
</style>
