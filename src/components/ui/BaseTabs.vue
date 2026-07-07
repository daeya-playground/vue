<script setup>
import { computed } from "vue";
import "@/styles/component/ui/tabs.scss";

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
});

const active = defineModel({ type: String, default: "" });

const current = computed({
  get: () => active.value || props.tabs[0]?.value || "",
  set: (v) => {
    active.value = v;
  },
});

const activeTab = computed(() => props.tabs.find((t) => t.value === current.value));
</script>

<template>
  <div class="ui-tabs">
    <div class="ui-tabs__list" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        role="tab"
        class="ui-tabs__tab"
        :class="{ 'ui-tabs__tab--active': current === tab.value }"
        :aria-selected="current === tab.value"
        @click="current = tab.value"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="ui-tabs__panel" role="tabpanel">
      <slot :active="current">
        {{ activeTab?.content }}
      </slot>
    </div>
  </div>
</template>
