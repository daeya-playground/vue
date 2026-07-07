<script setup>
import { useBodyScrollLock } from "@/composables/useBodyScrollLock";
import BaseButton from "./BaseButton.vue";
import "@/styles/component/ui/modal.scss";

const open = defineModel({ type: Boolean, default: false });

defineProps({
  title: { type: String, default: "" },
});

useBodyScrollLock(open);

function close() {
  open.value = false;
}
</script>

<template>
  <Teleport to="body">
    <Transition name="ui-sheet">
      <div v-if="open" class="ui-modal-backdrop" @click.self="close">
        <div class="ui-modal" role="dialog" aria-modal="true">
          <h2 v-if="title" class="ui-modal__title">{{ title }}</h2>
          <div class="ui-modal__body">
            <slot />
          </div>
          <div class="ui-modal__actions">
            <slot name="actions">
              <BaseButton block @click="close">확인</BaseButton>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
