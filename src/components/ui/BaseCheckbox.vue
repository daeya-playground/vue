<script setup>
import '@/styles/component/ui/checkbox.scss'

const model = defineModel({ type: Boolean, default: false })

defineProps({
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})
</script>

<template>
  <label class="ui-check">
    <input v-model="model" type="checkbox" :disabled="disabled" />
    <span class="ui-check__box" />
    <span v-if="label" class="ui-check__text">{{ label }}</span>
  </label>
</template>
