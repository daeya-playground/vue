<script setup>
import { onMounted, reactive, ref } from "vue";
import ExportDataGrid from "@/components/ExportDataGrid.vue";
import { BaseAsyncState, BaseButton } from "@/components/ui";
import { useToast } from "@/composables/useToast";
import { exportExcel } from "@/api/excel";
import { getMemos } from "@/api/memos";
import { MEMO_STATUS } from "@/js/common";
import "@/styles/pages/excel-export.scss";

const toast = useToast();
const loading = ref(true);
const exporting = ref(false);
const error = ref("");

const memoGrid = reactive({
  title: "메모 목록",
  sheetName: "메모",
  includeInExport: true,
  selectedKeys: [],
  columns: [
    { key: "id", label: "ID" },
    { key: "title", label: "제목" },
    { key: "content", label: "내용" },
    { key: "statusLabel", label: "상태" },
    { key: "createdAt", label: "등록일" },
  ],
  rows: [],
});

const deptGrid = reactive({
  title: "부서 현황",
  sheetName: "부서",
  includeInExport: true,
  selectedKeys: [],
  columns: [
    { key: "deptCode", label: "부서코드" },
    { key: "deptName", label: "부서명" },
    { key: "manager", label: "담당자" },
    { key: "headCount", label: "인원" },
  ],
  rows: [
    { id: "D01", deptCode: "D01", deptName: "개발팀", manager: "김개발", headCount: 12 },
    { id: "D02", deptCode: "D02", deptName: "기획팀", manager: "이기획", headCount: 5 },
    { id: "D03", deptCode: "D03", deptName: "운영팀", manager: "박운영", headCount: 8 },
  ],
});

const salesGrid = reactive({
  title: "매출 요약",
  sheetName: "매출",
  includeInExport: false,
  selectedKeys: [],
  columns: [
    { key: "month", label: "월" },
    { key: "product", label: "상품" },
    { key: "amount", label: "매출액" },
    { key: "region", label: "지역" },
  ],
  rows: [
    { id: "S01", month: "2026-01", product: "라이선스", amount: "12000000", region: "서울" },
    { id: "S02", month: "2026-02", product: "유지보수", amount: "4500000", region: "부산" },
    { id: "S03", month: "2026-03", product: "컨설팅", amount: "8700000", region: "대구" },
  ],
});

const grids = [memoGrid, deptGrid, salesGrid];

onMounted(async () => {
  loading.value = true;
  error.value = "";
  try {
    const data = await getMemos({ page: 1, size: 100 });
    memoGrid.rows = data.items.map((memo) => ({
      id: memo.id,
      title: memo.title,
      content: memo.content,
      statusLabel: MEMO_STATUS[memo.status]?.label ?? memo.status,
      createdAt: memo.createdAt,
    }));
    memoGrid.selectedKeys = memoGrid.rows.map((row) => row.id);
    deptGrid.selectedKeys = deptGrid.rows.map((row) => row.id);
    salesGrid.selectedKeys = salesGrid.rows.map((row) => row.id);
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});

function selectAllRows() {
  for (const grid of grids) {
    grid.selectedKeys = grid.rows.map((row) => row.id ?? row.deptCode ?? row.month);
  }
}

function clearAllRows() {
  for (const grid of grids) {
    grid.selectedKeys = [];
  }
}

function buildSheets() {
  const sheets = [];

  for (const grid of grids) {
    if (!grid.includeInExport) continue;

    const selected = new Set(grid.selectedKeys);
    const rows = grid.rows
      .filter((row) => selected.has(row.id))
      .map((row) => grid.columns.map((column) => String(row[column.key] ?? "")));

    if (rows.length === 0) continue;

    sheets.push({
      name: grid.sheetName,
      headers: grid.columns.map((column) => column.label),
      rows,
    });
  }

  return sheets;
}

async function handleExport() {
  const sheets = buildSheets();
  if (sheets.length === 0) {
    toast.warning("엑셀에 넣을 시트/행을 선택해 주세요");
    return;
  }

  exporting.value = true;
  try {
    await exportExcel(sheets);
    toast.success(`${sheets.length}개 시트 엑셀 다운로드`);
  } catch (e) {
    toast.error(e.message);
  } finally {
    exporting.value = false;
  }
}
</script>

<template>
  <div class="excel-export">
    <h1 class="page-title">엑셀보내기</h1>
    <p class="excel-export__lead">
      그리드별로 체크한 뒤 선택한 행만 POI로 시트를 만들어 다운로드합니다.
    </p>

    <div class="excel-export__actions">
      <BaseButton variant="primary" :disabled="exporting" @click="handleExport">
        {{ exporting ? "다운로드 중..." : "엑셀 다운로드" }}
      </BaseButton>
      <BaseButton variant="secondary" @click="selectAllRows">전체 행 선택</BaseButton>
      <BaseButton variant="ghost" @click="clearAllRows">행 선택 해제</BaseButton>
    </div>

    <BaseAsyncState :loading="loading" :error="error">
      <div class="excel-export__grids">
        <ExportDataGrid
          :include-in-export="memoGrid.includeInExport"
          :selected-keys="memoGrid.selectedKeys"
          :title="memoGrid.title"
          :columns="memoGrid.columns"
          :rows="memoGrid.rows"
          row-key="id"
          @update:include-in-export="memoGrid.includeInExport = $event"
          @update:selected-keys="memoGrid.selectedKeys = $event"
        />
        <ExportDataGrid
          :include-in-export="deptGrid.includeInExport"
          :selected-keys="deptGrid.selectedKeys"
          :title="deptGrid.title"
          :columns="deptGrid.columns"
          :rows="deptGrid.rows"
          row-key="id"
          @update:include-in-export="deptGrid.includeInExport = $event"
          @update:selected-keys="deptGrid.selectedKeys = $event"
        />
        <ExportDataGrid
          :include-in-export="salesGrid.includeInExport"
          :selected-keys="salesGrid.selectedKeys"
          :title="salesGrid.title"
          :columns="salesGrid.columns"
          :rows="salesGrid.rows"
          row-key="id"
          @update:include-in-export="salesGrid.includeInExport = $event"
          @update:selected-keys="salesGrid.selectedKeys = $event"
        />
      </div>
    </BaseAsyncState>

    <p class="excel-export__hint">
      시트 포함 체크 + 행 체크로 보낼 데이터를 고릅니다. 시트마다 헤더 스타일이 적용됩니다.
    </p>
  </div>
</template>
