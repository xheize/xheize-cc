<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children, data } = $props();
	
	// 세션 데이터를 전역적으로 사용 가능하도록 설정
	// data.session에는 사용자 로그인 정보가 포함됨
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
