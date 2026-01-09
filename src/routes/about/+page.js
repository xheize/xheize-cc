// 이 파일은 SvelteKit의 서버 사이드 데이터 로딩을 시연합니다
// load 함수는 먼저 서버에서 실행되고, 이후 클라이언트 내비게이션 시 클라이언트에서도 실행됩니다

/** @type {import('./$types').PageLoad} */
export function load() {
	// 이 데이터는 SSR 중에 서버에서 로드됩니다
	const serverTime = new Date().toISOString();
	
	return {
		serverTime,
		profile: {
			name: 'Xheize',
			title: 'Web Developer',
			interests: ['SvelteKit', 'SSR', 'Web Performance', 'Modern JavaScript'],
			experience: 'Building fast and modern web applications',
		}
	};
}
