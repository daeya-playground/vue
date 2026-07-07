<script setup>
import { computed, ref } from "vue";
import { useBodyScrollLock } from "@/composables/useBodyScrollLock";
import "@/styles/component/ui/select.scss";

const model = defineModel({ type: [String, Number], default: "" });

const props = defineProps({
  label: { type: String, default: "" },
  hint: { type: String, default: "" },
  error: { type: String, default: "" },
  placeholder: { type: String, default: "선택해 주세요" },
  disabled: { type: Boolean, default: false },
  options: {
    type: Array,
    default: () => [],
  },
});

const open = ref(false);

useBodyScrollLock(open);

const selectedLabel = computed(() => {
  const found = props.options.find((opt) => opt.value === model.value);
  return found?.label ?? props.placeholder;
});

const hasValue = computed(() => props.options.some((opt) => opt.value === model.value));

function openSheet() {
  if (!props.disabled) open.value = true;
}

function closeSheet() {
  open.value = false;
}

function select(value) {
  model.value = value;
  closeSheet();
}
</script>

<template>
  <div class="ui-field">
    <span v-if="label" class="ui-field__label">{{ label }}</span>
    <div class="ui-form-group" :class="{ 'ui-form-group--error': error }">
      <button type="button" class="ui-select-trigger" :disabled="disabled" @click="openSheet">
        <span
          class="ui-select-trigger__value"
          :class="{ 'ui-select-trigger__value--placeholder': !hasValue }"
        >
          {{ selectedLabel }}
        </span>
        <svg
          class="ui-select-trigger__chevron"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 8l3 3 3-3"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <span v-if="error" class="ui-field__error">{{ error }}</span>
    <span v-else-if="hint" class="ui-field__hint">{{ hint }}</span>

    <Teleport to="body">
      <Transition name="ui-sheet">
        <div v-if="open" class="ui-bottom-sheet-backdrop" @click.self="closeSheet">
          <div class="ui-bottom-sheet" role="dialog" aria-modal="true">
            <div class="ui-bottom-sheet__handle" aria-hidden="true" />
            <h3 v-if="label" class="ui-bottom-sheet__title">{{ label }}</h3>
            <ul class="ui-option-list">
              <li v-for="opt in options" :key="opt.value">
                <button
                  type="button"
                  class="ui-option-list__item"
                  :class="{ 'ui-option-list__item--active': model === opt.value }"
                  @click="select(opt.value)"
                >
                  <span>{{ opt.label }}</span>
                  <svg
                    v-if="model === opt.value"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 10l3 3 7-7"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
