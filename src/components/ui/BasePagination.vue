<script setup>
import { computed } from "vue";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import "@/styles/component/ui/pagination.scss";

const props = defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  total: { type: Number, default: 0 },
  maxVisible: { type: Number, default: 5 },
});

const emit = defineEmits(["update:page"]);

const visiblePages = computed(() => {
  const { totalPages, page, maxVisible } = props;
  if (totalPages <= 0) return [];
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const showPagination = computed(() => props.totalPages > 1);

function goToPage(nextPage) {
  if (nextPage < 1 || nextPage > props.totalPages || nextPage === props.page) return;
  emit("update:page", nextPage);
}
</script>

<template>
  <div v-if="total > 0" class="ui-pagination">
    <nav v-if="showPagination" class="ui-pagination__nav" aria-label="페이지 이동">
      <button
        type="button"
        class="ui-pagination__btn ui-pagination__btn--icon"
        :disabled="page <= 1"
        aria-label="이전 페이지"
        @click="goToPage(page - 1)"
      >
        <ChevronLeft :size="18" :stroke-width="2" aria-hidden="true" />
      </button>
      <button
        v-for="pageNumber in visiblePages"
        :key="pageNumber"
        type="button"
        class="ui-pagination__btn"
        :class="{ 'ui-pagination__btn--active': pageNumber === page }"
        :aria-current="pageNumber === page ? 'page' : undefined"
        @click="goToPage(pageNumber)"
      >
        {{ pageNumber }}
      </button>
      <button
        type="button"
        class="ui-pagination__btn ui-pagination__btn--icon"
        :disabled="page >= totalPages"
        aria-label="다음 페이지"
        @click="goToPage(page + 1)"
      >
        <ChevronRight :size="18" :stroke-width="2" aria-hidden="true" />
      </button>
    </nav>
  </div>
</template>
