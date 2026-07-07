<script setup>
import "@/styles/component/ui/textarea.scss";

const model = defineModel({ type: String, default: "" });

defineProps({
  label: { type: String, default: "" },
  hint: { type: String, default: "" },
  error: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  rows: { type: Number, default: 4 },
  disabled: { type: Boolean, default: false },
});
</script>

<template>
  <label class="ui-field">
    <span v-if="label" class="ui-field__label">{{ label }}</span>
    <div class="ui-form-group" :class="{ 'ui-form-group--error': error }">
      <textarea
        v-model="model"
        class="ui-textarea"
        :class="{ 'ui-input--error': error }"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
      />
    </div>
    <span v-if="error" class="ui-field__error">{{ error }}</span>
    <span v-else-if="hint" class="ui-field__hint">{{ hint }}</span>
  </label>
</template>
