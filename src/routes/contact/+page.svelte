<script>
 import SiteHeader from '$lib/components/SiteHeader.svelte';
 import PageHeading from '$lib/components/PageHeading.svelte';
 function showPreparationNotice() { window.alert('준비중입니다.'); }
</script>

<svelte:head>
 <title>연락 - Xheize Sandbox</title>
 <meta name="description" content="Xheize 문의 채널은 준비 중입니다." />
</svelte:head>

<SiteHeader active="contact" />
<main class="responsive-shell page-layout">
 <PageHeading title="연락" description="인프라, 웹 서비스, 작은 실험까지. 문의 채널을 준비하고 있습니다." />
 <div class="contact-grid">
  <section class="site-card">
   <h2>문의 채널 준비 중</h2>
   <p>문의 기능은 준비 중이며 현재 메시지를 받지 않습니다.</p>
   <button class="site-button" type="button" onclick={showPreparationNotice}>문의하기</button>
  </section>
  <aside class="site-card">
   <h2>GitHub</h2>
   <p>공개 프로젝트와 개발 기록은 GitHub에서 볼 수 있습니다.</p>
   <a class="site-text-link" href="https://github.com/xheize" target="_blank" rel="noopener noreferrer">@xheize <span aria-hidden="true">↗</span></a>
  </aside>
 </div>
</main>

<style>
 .contact-grid { display: grid; grid-template-columns: minmax(0,1.15fr) minmax(0,.85fr); gap: 24px; align-items: start; }
 h2 { margin: 0; font-size: 1.375rem; font-weight: 700; line-height: 1.4; }
 p { margin: 12px 0 24px; color: var(--md-sys-color-on-surface-variant); line-height: 1.8; }
 @media (max-width: 900px) { .contact-grid { grid-template-columns: minmax(0,1fr); } }
</style>
