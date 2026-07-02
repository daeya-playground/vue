<script setup>
import '@/styles/component/ui/input.scss'

const model = defineModel({ type: [String, Number], default: '' })

defineProps({
  label: { type: String, default: '' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  disabled: { type: Boolean, default: false },
})
</script>

<template>
  <label class="ui-field">
    <span v-if="label" class="ui-field__label">{{ label }}</span>
    <div class="ui-form-group" :class="{ 'ui-form-group--error': error }">
      <input
        v-model="model"
        class="ui-input"
        :class="{ 'ui-input--error': error }"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </div>
    <span v-if="error" class="ui-field__error">{{ error }}</span>
    <span v-else-if="hint" class="ui-field__hint">{{ hint }}</span>
  </label>
</template>
