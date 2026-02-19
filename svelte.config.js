import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Node.js 어댑터 사용 - Docker 컨테이너 배포에 적합
		// adapter-node는 독립 실행형 Node.js 서버를 생성함
		// 더 많은 어댑터 정보: https://svelte.dev/docs/kit/adapters
		adapter: adapter()
	}
};

export default config;
