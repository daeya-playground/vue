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

export const MEMO_STATUS = {
  READY: { label: '진행전', variant: 'gray' },
  ING:   { label: '진행중', variant: 'blue' },
  DONE:  { label: '완료',   variant: 'green' },
  HOLD:  { label: '보류',   variant: 'gray' }, 
}