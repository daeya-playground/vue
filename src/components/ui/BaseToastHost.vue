<script setup>
import { AlertCircle, Check, CircleAlert, Info, X } from "@lucide/vue";
import { useToastList } from "@/composables/useToast";
import "@/styles/component/ui/toast-host.scss";

const toastList = useToastList();

const iconByVariant = {
  success: Check,
  warning: AlertCircle,
  error: X,
  info: Info,
};

function iconComponent(variant) {
  return iconByVariant[variant] ?? CircleAlert;
}
</script>

<template>
  <Teleport to="body">
    <div v-if="toastList.length" class="ui-toast-host" aria-live="polite" aria-atomic="true">
      <TransitionGroup name="ui-toast" tag="div" class="ui-toast-host__stack">
        <div v-for="item in toastList" :key="item.id" class="ui-toast" role="status">
          <span
            class="ui-toast__icon"
            :class="`ui-toast__icon--${item.variant}`"
            aria-hidden="true"
          >
            <component :is="iconComponent(item.variant)" :size="14" :stroke-width="2.5" />
          </span>
          <p class="ui-toast__message">{{ item.message }}</p>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
