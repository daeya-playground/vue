<script setup>
import '@/styles/component/ui/async-state.scss'
import BaseButton from './BaseButton.vue'

defineProps({
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
  loadingMessage: { type: String, default: '불러오는 중이에요' },
})

defineEmits(['retry'])
</script>

<template>
  <div class="ui-async-state">
    <div v-if="loading" class="ui-async-state__loading" role="status" aria-live="polite">
      <span class="ui-async-state__spinner" aria-hidden="true" />
      <p class="ui-async-state__message">{{ loadingMessage }}</p>
    </div>

    <div v-else-if="error" class="ui-async-state__error" role="alert">
      <span class="ui-async-state__error-icon" aria-hidden="true">!</span>
      <p class="ui-async-state__error-text">{{ error }}</p>
      <BaseButton variant="ghost" size="sm" @click="$emit('retry')">다시 시도</BaseButton>
    </div>

    <slot v-else />
  </div>
</template>
