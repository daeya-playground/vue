<script setup>
import '@/styles/component/ui/radio-group.scss'

const model = defineModel({ type: [String, Number], default: '' })

defineProps({
  label: { type: String, default: '' },
  hint: { type: String, default: '' },
  options: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="ui-field">
    <span v-if="label" class="ui-field__label">{{ label }}</span>
    <div class="ui-option-card">
      <label
        v-for="(opt, index) in options"
        :key="opt.value"
        class="ui-option-card__row"
        :class="{ 'ui-option-card__row--last': index === options.length - 1 }"
      >
        <span class="ui-option-card__label">{{ opt.label }}</span>
        <span v-if="opt.desc" class="ui-option-card__desc">{{ opt.desc }}</span>
        <input
          v-model="model"
          class="ui-option-card__input"
          type="radio"
          :value="opt.value"
        />
        <span class="ui-radio__box" />
      </label>
    </div>
    <span v-if="hint" class="ui-field__hint">{{ hint }}</span>
  </div>
</template>
