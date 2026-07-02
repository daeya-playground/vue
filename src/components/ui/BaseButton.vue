<script setup>
import '@/styles/component/ui/button.scss'

defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'ghost', 'danger', 'outline'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  block: { type: Boolean, default: false },
  grow: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
})
</script>

<template>
  <button
    :type="type"
    class="ui-btn"
    :class="[
      `ui-btn--${variant}`,
      size !== 'md' && `ui-btn--${size}`,
      block && 'ui-btn--block',
      grow && 'ui-btn--grow',
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
