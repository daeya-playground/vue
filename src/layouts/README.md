# layouts

회사 프로젝트 `layouts/` 구조 참고용 파일입니다.

**라우터에는 `PageLayout`만 연결**되어 있고, 나머지는 나중에 필요할 때 복사·참고하세요.

| 파일 | 용도 (참고) |
|------|-------------|
| `PageLayout.vue` | 헤더 + 좌측 메뉴 + 본문(480px) + 푸터 (**현재 사용 중**) |
| `MainLayout.vue` | 헤더 + 좌측 메뉴 + 본문(전체 폭) + 푸터 (구조 참고용) |
| `EmptyLayout.vue` | 본문만 (로그인 등) |
| `HeaderLayout.vue` | 헤더 + 본문 |
| `FooterLayout.vue` | 본문 + 푸터 |
| `LeftMenuLayout.vue` | 좌측 메뉴 + 본문 |
| `PagePatternALayout.vue` | Layout A — 메뉴 없이 콘텐츠만 480px (참고용) |

연습 페이지 목록은 `src/js/common.js` → `PRACTICE_PAGES` 와 좌측 메뉴에서 관리합니다.
