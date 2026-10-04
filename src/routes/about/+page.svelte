<script>
 import SiteHeader from '$lib/components/SiteHeader.svelte';
 import PageHeading from '$lib/components/PageHeading.svelte';
 /** @type {{ data: import('./$types').PageData }} */
 let { data } = $props();
</script>

<svelte:head>
 <title>소개 - Xheize Sandbox</title>
 <meta name="description" content="Xheize의 개발 관심사와 개인 샌드박스를 소개합니다." />
</svelte:head>

<SiteHeader active="about" />
<main class="responsive-shell page-layout">
 <PageHeading title="만들고, 운영하고, 계속 개선합니다." description={data.profile.experience + '. 직접 만든 서비스와 인프라를 실험하고 기록하는 개인 샌드박스입니다.'} />
 <div class="about-grid">
  <section class="site-card">
   <h2>작업 원칙</h2>
   <p>작게 실험하고, 실제 환경에서 관찰한 뒤, 반복 가능한 구조로 정리합니다. 화면의 디테일과 운영 안정성을 같은 제품 경험으로 봅니다.</p>
   <div class="interests">
    {#each data.profile.interests as interest}<span>{interest}</span>{/each}
   </div>
  </section>
  <aside class="site-card">
   <div class="profile-heading">
    <span aria-hidden="true" class="profile-icon material-symbols-rounded">person</span>
    <div><h2>{data.profile.name}</h2><p>{data.profile.title}</p></div>
   </div>
   <a class="site-text-link" href="https://github.com/xheize" target="_blank" rel="noopener noreferrer">GitHub 프로필 <span aria-hidden="true">↗</span></a>
  </aside>
  <section class="site-card records">
   <h2>프로젝트와 기록</h2>
   <p>직접 구축한 인프라와 웹 개발 경험을 블로그에 기록합니다. 사용 중인 기술과 채택 배경도 함께 소개합니다.</p>
   <div class="actions">
    <a class="site-button" href="/blog">개발 기록 읽기</a>
    <a class="site-button site-button-secondary" href="/usedtech">기술 스택 보기</a>
   </div>
  </section>
 </div>
</main>

<style>
 .about-grid { display: grid; gap: 24px; grid-template-columns: minmax(0,1.15fr) minmax(0,.85fr); }
 h2 { margin: 0; font-size: 1.375rem; font-weight: 700; line-height: 1.4; }
 p { margin: 12px 0 0; color: var(--md-sys-color-on-surface-variant); line-height: 1.8; }
 .profile-heading { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
 .profile-heading > div { min-width: 0; overflow-wrap: anywhere; }
 .profile-icon { display: grid; place-items: center; flex-shrink: 0; width: 48px; height: 48px; border-radius: 12px; background: var(--md-sys-color-surface-container-high); color: var(--md-sys-color-primary-text); }
 .interests { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
 .interests span { border: 1px solid var(--site-border); border-radius: 8px; padding: 6px 10px; font-size: .8rem; color: var(--md-sys-color-on-surface-variant); }
 .records { grid-column: 1 / -1; }
 .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }
 @media (max-width: 900px) { .about-grid { grid-template-columns: minmax(0,1fr); } }
</style>
