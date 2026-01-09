// 루트 레이아웃 로드 함수 - 모든 페이지에서 세션 데이터 사용 가능하도록 설정
/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
	// Auth.js에서 제공하는 세션 정보 가져오기
	const session = await event.locals.getSession?.();
	
	return {
		session
	};
}
