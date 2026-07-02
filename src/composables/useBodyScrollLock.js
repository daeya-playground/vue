import { onUnmounted, watch } from 'vue'

let lockCount = 0
let savedScrollY = 0

function lockBodyScroll() {
  lockCount += 1
  if (lockCount > 1) return

  savedScrollY = window.scrollY
  document.body.classList.add('is-scroll-locked')
  document.body.style.top = `-${savedScrollY}px`
}

function unlockBodyScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount > 0) return

  document.body.classList.remove('is-scroll-locked')
  document.body.style.top = ''
  window.scrollTo(0, savedScrollY)
}

/** 모달·바텀시트 열릴 때 배경 스크롤 잠금 */
export function useBodyScrollLock(isOpen) {
  watch(
    isOpen,
    (open) => {
      if (open) lockBodyScroll()
      else unlockBodyScroll()
    },
    { immediate: true },
  )

  onUnmounted(() => {
    if (isOpen.value) unlockBodyScroll()
  })
}
