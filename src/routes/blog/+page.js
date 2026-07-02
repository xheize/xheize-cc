/** @type {import('./$types').PageLoad} */
export async function load() {
	return {
		posts: [
			{
				id: 1,
				title: "Svelte 5 Runes 깊게 파헤치기",
				date: "2026-06-25",
				category: "Frontend",
				tag: "Svelte 5",
				summary: "Svelte 5의 새로운 반응성 엔진인 Runes($state, $derived, $effect)의 동작 원리와 기존 Svelte 4와의 차이점 분석.",
				readTime: "7 min read",
				content: `Svelte 5는 기존의 컴파일 시점 반응성 메커니즘을 획기적으로 개선한 **Runes**를 도입했습니다.
				
				### 1. 왜 Runes인가?
				Svelte 4까지는 \`let\` 선언과 \`$\` 레이블을 통해 컴포넌트 단위 반응성을 제공했습니다. 하지만 중첩된 객체나 컴포넌트 외부에 상태를 공유할 때 한계가 있었습니다. Runes는 함수 스코프와 신호(Signals) 기반 반응성을 제공하여 이러한 한계를 극복합니다.

				### 2. 주요 룬(Runes) 소개
				- **$state**: 상태를 정의합니다. 객체나 배열 내부까지 깊은(deep) 반응성이 자동으로 주입됩니다.
				- **$derived**: 다른 상태로부터 파생된 상태를 정의합니다. 의존하는 상태가 변경될 때만 재계산됩니다.
				- **$effect**: 상태 변경에 따라 부수 효과(Side effect)를 실행합니다. DOM 렌더링 이후 안전하게 동작합니다.

				\`\`\`svelte
				<script>
					let count = $state(0);
					let double = $derived(count * 2);
					
					$effect(() => {
						console.log('Count changed to:', count);
					});
				</script>
				
				<button onclick={() => count++}>
					{count} x 2 = {double}
				</button>
				\`\`\`

				### 3. 컴파일 방식의 변화
				가상 DOM이 없는 Svelte 고유의 철학을 계승하면서도, 더 미세한(granular) DOM 업데이트 코드를 생성하여 런타임 성능을 극대화합니다.`
			},
			{
				id: 2,
				title: "Proxmox 기반 가상화 홈랩 구축기",
				date: "2026-06-12",
				category: "Infrastructure",
				tag: "Virtualization",
				summary: "Proxmox VE를 물리 서버에 직접 설치하고 KVM과 LXC 컨테이너를 복합 운용하여 퍼블릭 클라우드 부럽지 않은 홈 서버 인프라 구축.",
				readTime: "12 min read",
				content: `서버 리소스를 효율적으로 나누어 사용하고 여러 가상 환경을 실험하기 위해 물리 서버에 Proxmox VE 베어메탈 하이퍼바이저를 도입했습니다.

				### 1. Proxmox VE 채택 배경
				- **오픈소스**: 구독료 없이 완전한 엔터프라이즈급 가상화 관리 기능을 제공합니다.
				- **KVM & LXC 지원**: 무거운 OS 가상화(KVM VM)와 가벼운 프로세스 격리 가상화(LXC 컨테이너)를 적재적소에 혼합하여 배치할 수 있습니다.
				- **웹 대시보드**: 브라우저 기반 GUI를 통해 터미널 접속 없이 손쉽게 시스템 자원을 모니터링하고 가상 머신을 관리합니다.

				### 2. 홈랩 스펙 및 스토리지 구성
				- **CPU**: AMD EPYC 8-Core 16-Threads
				- **Memory**: 32GB ECC DDR5
				- **Storage**: 1TB NVMe (System & VM storage) + 4TB HDD (Backup & Media storage)
				- Storage 풀은 안정성을 위해 **ZFS (RAID 1)** 구성을 적용했습니다.

				### 3. LXC 컨테이너 기반 마이크로서비스 배포
				네트워크 게이트웨이, 로컬 DNS 서버(Pi-hole), 데이터베이스 등 가벼운 데몬 서비스들은 가벼운 Alpine Linux 기반 LXC 컨테이너로 올려 메모리 오버헤드를 최소화(컨테이너당 RAM 512MB 이하)시켰습니다.`
			},
			{
				id: 3,
				title: "Woodpecker CI와 ArgoCD를 활용한 GitOps 파이프라인",
				date: "2026-05-30",
				category: "DevOps",
				tag: "GitOps",
				summary: "Gitea 소스 코드 저장소 커밋으로부터 Docker 이미지 자동 빌드 및 ArgoCD를 통한 k3s 클러스터 선언적 배포 자동화 구현.",
				readTime: "9 min read",
				content: `개발 후 수동 배포 과정을 없애기 위해 경량 자동화 도구인 Woodpecker CI와 ArgoCD를 연동하여 완전한 GitOps 배포 루프를 완성했습니다.

				### 1. 파이프라인 아키텍처 Flow
				1. 개발자가 Git 저장소(Gitea)에 코드를 푸시합니다.
				2. Gitea 웹훅이 **Woodpecker CI** 러너를 트리거합니다.
				3. Woodpecker가 코드를 빌드하고 린트한 뒤, **Docker 이미지**로 패키징하여 레지스트리에 푸시합니다.
				4. 배포용 Kubernetes manifest 저장소의 이미지 태그가 신규 빌드 버전으로 업데이트됩니다.
				5. **ArgoCD**가 manifest 저장소의 상태 변경을 감지하고 **k3s 클러스터**와 동기화(Sync)합니다.

				### 2. Woodpecker CI 설정의 심플함
				드론(Drone) CI에서 포크된 Woodpecker는 컨테이너 기반으로 동작하며 문법이 매우 간단합니다.
				\`\`\`yaml
				when:
				  - event: push
				    branch: main
				steps:
				  - name: build-image
				    image: plugins/kaniko
				    settings:
				      registry: registry.xheize.cc
				      repo: apps/xheize-cc
				      tags: latest
				\`\`\`

				### 3. GitOps 도입이 가져온 변화
				배포용 Manifest의 버전 기록이 완전히 Git 히스토리에 남게 되므로, 에러 발생 시 \`git revert\` 명령 하나만으로 10초 이내에 안정적인 이전 배포 상태로 롤백할 수 있는 안정성을 얻었습니다.`
			},
			{
				id: 4,
				title: "Traefik과 MetalLB를 통한 Kubernetes 로드 밸런싱",
				date: "2026-05-18",
				category: "Infrastructure",
				tag: "Kubernetes",
				summary: "퍼블릭 클라우드의 LoadBalancer 서비스를 온프레미스 k3s 환경에서 구현하기 위해 L4 로드밸런서인 MetalLB와 Ingress Controller인 Traefik을 설계.",
				readTime: "10 min read",
				content: `베어메탈(온프레미스) 쿠버네티스 구축 시 가장 큰 장벽은 클라우드 공급자 없이 External IP를 할당하는 것입니다. 이를 해결하기 위해 MetalLB와 Traefik을 조합했습니다.

				### 1. MetalLB (Layer 2 Mode)
				- 로컬 네트워크 대역(예: \`192.168.1.200 - 192.168.1.220\`)을 풀로 지정하여, 쿠버네티스 서비스가 \`type: LoadBalancer\`로 생성될 때 외부에서 접속 가능한 물리 IP를 동적으로 할당해 줍니다.
				- 클라우드 공급자가 없는 홈랩 환경에서 핵심 브릿지 역할을 수행합니다.

				### 2. Traefik (L7 Ingress Controller)
				- MetalLB가 할당해준 외부 IP를 Traefik이 점유하고, 유입되는 트래픽의 호스트 헤더(예: \`aichat.xheize.cc\`, \`blog.xheize.cc\`)를 기반으로 내부의 적절한 파드(Pods) 서비스로 포워딩합니다.
				- **Let's Encrypt** 와 연동하여 HTTP 라우트 생성 시 SSL/TLS 인증서 발급 및 갱신을 완전 자동화해 줍니다.

				### 3. 시너지 효과
				이 2개 소프트웨어의 조화 덕분에 도메인 추가 시 쿠버네티스 Ingress 리소스 선언만으로 인증서 발급과 로드밸런서 설정이 1분 안에 완료됩니다.`
			}
		]
	};
}
