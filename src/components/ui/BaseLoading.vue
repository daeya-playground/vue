<script setup>
import "@/styles/component/ui/async-state.scss";

defineProps({
  message: { type: String, default: "" },
  inline: { type: Boolean, default: false },
});
</script>

<template>
  <div
    class="ui-async-state__loading"
    :class="{ 'ui-async-state__loading--inline': inline }"
    role="status"
    aria-live="polite"
  >
    <span class="ui-async-state__spinner" aria-hidden="true" />
    <p v-if="message" class="ui-async-state__message">{{ message }}</p>
  </div>
</template>
