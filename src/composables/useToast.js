import { computed, inject, ref } from 'vue'

const TOAST_KEY = Symbol('toast')

const AUTO_CLOSE_MS = 2800
const MAX_TOASTS = 3

let toastId = 0
const timers = new Map()

/** @type {import('vue').Ref<Array<{ id: number, message: string, variant: string }>>} */
const items = ref([])

function remove(id) {
  const timer = timers.get(id)
  if (timer) {
    window.clearTimeout(timer)
    timers.delete(id)
  }
  items.value = items.value.filter((t) => t.id !== id)
}

function push(message, variant = 'info') {
  if (!message) return null

  const id = ++toastId
  items.value = [...items.value, { id, message, variant }].slice(-MAX_TOASTS)

  const timer = window.setTimeout(() => remove(id), AUTO_CLOSE_MS)
  timers.set(id, timer)
  return id
}

const toastApi = {
  items,
  remove,
  info: (message) => push(message, 'info'),
  success: (message) => push(message, 'success'),
  warning: (message) => push(message, 'warning'),
  error: (message) => push(message, 'error'),
}

/** @param {import('vue').App} [app] */
export function installToast(app) {
  if (app) {
    app.provide(TOAST_KEY, toastApi)
  }
}

export function useToast() {
  const injected = inject(TOAST_KEY, toastApi)
  return injected
}

/** BaseToastHost 전용 — template top-level unwrap */
export function useToastList() {
  return computed(() => items.value)
}
