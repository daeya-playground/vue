/**
 * 회사 js/common.js 자리 — 공통 상수·유틸
 */

export const APP_TITLE = 'playground'

/**
 * 좌측 메뉴 — playground 연습 페이지
 * 페이지 추가 시: 여기 항목 추가 + router/index.js children 등록
 */
export const PRACTICE_PAGES = [
  { name: 'home', label: '홈', path: '/' },
  { name: 'ui-example', label: 'UI 예시', path: '/ui-example' },
  { name: 'memo-list', label: '메모 목록', path: '/memo-list' },
]

export function formatMemoLabel(id, content) {
  return `${id} — ${content}`
}
