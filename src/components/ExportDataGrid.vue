<script setup>
import { computed } from "vue";
import { BaseCheckbox } from "@/components/ui";
import "@/styles/component/export-data-grid.scss";

const props = defineProps({
  title: { type: String, required: true },
  columns: {
    type: Array,
    required: true,
  },
  rows: { type: Array, default: () => [] },
  rowKey: { type: String, default: "id" },
  includeInExport: { type: Boolean, default: false },
  selectedKeys: { type: Array, default: () => [] },
});

const emit = defineEmits(["update:includeInExport", "update:selectedKeys"]);

const allKeys = computed(() => props.rows.map((row) => row[props.rowKey]));

const allSelected = computed({
  get() {
    return allKeys.value.length > 0 && props.selectedKeys.length === allKeys.value.length;
  },
  set(checked) {
    emit("update:selectedKeys", checked ? [...allKeys.value] : []);
  },
});

const someSelected = computed(
  () => props.selectedKeys.length > 0 && props.selectedKeys.length < allKeys.value.length,
);

const includeChecked = computed({
  get() {
    return props.includeInExport;
  },
  set(value) {
    emit("update:includeInExport", value);
  },
});

function isSelected(key) {
  return props.selectedKeys.includes(key);
}

function toggleRow(key, checked) {
  if (checked) {
    if (!props.selectedKeys.includes(key)) {
      emit("update:selectedKeys", [...props.selectedKeys, key]);
    }
    return;
  }
  emit(
    "update:selectedKeys",
    props.selectedKeys.filter((item) => item !== key),
  );
}

function cellValue(row, column) {
  const value = row[column.key];
  return value == null ? "" : String(value);
}
</script>

<template>
  <section class="export-grid">
    <header class="export-grid__header">
      <div class="export-grid__title-wrap">
        <BaseCheckbox v-model="includeChecked" :label="title" />
        <span class="export-grid__count">
          {{ selectedKeys.length }} / {{ rows.length }}행 선택
        </span>
      </div>
    </header>

    <div class="export-grid__table-wrap">
      <table class="export-grid__table">
        <thead>
          <tr>
            <th class="export-grid__check-col">
              <input
                v-model="allSelected"
                type="checkbox"
                :indeterminate="someSelected"
                aria-label="전체 선택"
              />
            </th>
            <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="rows.length === 0">
            <td :colspan="columns.length + 1" class="export-grid__empty">데이터 없음</td>
          </tr>
          <tr
            v-for="row in rows"
            :key="row[rowKey]"
            :class="{ 'is-selected': isSelected(row[rowKey]) }"
          >
            <td class="export-grid__check-col">
              <input
                type="checkbox"
                :checked="isSelected(row[rowKey])"
                @change="toggleRow(row[rowKey], $event.target.checked)"
              />
            </td>
            <td v-for="column in columns" :key="column.key">{{ cellValue(row, column) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
