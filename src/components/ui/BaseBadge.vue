<script setup>
import '@/styles/component/ui/badge.scss'

defineProps({
  variant: {
    type: String,
    default: 'blue',
    validator: (v) => ['blue', 'green', 'red', 'gray'].includes(v),
  },
})
</script>

<template>
  <span class="ui-badge" :class="`ui-badge--${variant}`">
    <slot />
  </span>
</template>
