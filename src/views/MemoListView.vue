<script setup>
import { computed, ref } from 'vue'
import { formatMemoLabel } from '@/js/common'
import { useToast } from '@/composables/useToast'
import '@/styles/pages/memo-list.scss'
import {
  BaseBadge,
  BaseButton,
  BaseInput,
  BaseModal,
  BaseTabs,
  BaseTextarea,
} from '@/components/ui'

const toast = useToast()

const activeTab = ref('read')
const deleteModalOpen = ref(false)
const deleteTargetId = ref(null)

const title = ref('')
const content = ref('')
const selectedId = ref(1)

const crudTabs = [
  { value: 'create', label: 'Create' },
  { value: 'read', label: 'Read' },
  { value: 'update', label: 'Update' },
  { value: 'delete', label: 'Delete' },
]

/** UI 확인용 — TODO(다음 커밋): GET /api/memos */
const mockMemos = ref([
  { id: 1, title: '회의록 정리', content: '월요일 스프린트 회의 내용', status: '진행중' },
  { id: 2, title: '장보기 목록', content: '우유, 계란, 빵', status: '완료' },
  { id: 3, title: 'Vue 연습 노트', content: 'CRUD 탭 UI 먼저, API는 다음에', status: '학습' },
])

const selectedMemo = computed(() => mockMemos.value.find((m) => m.id === selectedId.value))
const deleteTarget = computed(() => mockMemos.value.find((m) => m.id === deleteTargetId.value))

const statusVariant = {
  진행중: 'blue',
  완료: 'green',
  학습: 'gray',
}

function resetForm() {
  title.value = ''
  content.value = ''
}

function loadSelectedToForm() {
  const memo = selectedMemo.value
  if (!memo) return
  title.value = memo.title
  content.value = memo.content
}

// TODO(다음 커밋): POST /api/memos
function handleCreate() {
  if (!title.value.trim()) {
    toast.warning('제목을 입력해 주세요')
    return
  }
  toast.success('저장했어요')
}

// TODO(다음 커밋): PUT /api/memos/:id
function handleUpdate() {
  if (!title.value.trim()) {
    toast.warning('제목을 입력해 주세요')
    return
  }
  toast.success('수정했어요')
}

function openDeleteModal(id) {
  deleteTargetId.value = id
  deleteModalOpen.value = true
}

// TODO(다음 커밋): DELETE /api/memos/:id
function handleDelete() {
  deleteModalOpen.value = false
  toast.success('삭제했어요')
  deleteTargetId.value = null
}

function selectMemoForUpdate(id) {
  selectedId.value = id
  loadSelectedToForm()
}
</script>

<template>
  <div class="memo-list">
    <header class="memo-list__hero">
      <h1 class="memo-list__title">메모 CRUD</h1>
    </header>
    <p class="memo-list__lead">탭별 UI만 준비된 상태. API 연동해보기</p>

    <BaseTabs v-model="activeTab" :tabs="crudTabs">
      <div v-if="activeTab === 'create'" class="memo-list__panel">
        <BaseInput v-model="title" label="제목" placeholder="메모 제목" />
        <BaseTextarea v-model="content" label="내용" placeholder="내용을 입력하세요" :rows="4" />
        <BaseButton block @click="handleCreate">저장하기</BaseButton>
        <BaseButton variant="ghost" block @click="resetForm">입력 초기화</BaseButton>
      </div>

      <div v-else-if="activeTab === 'read'" class="memo-list__panel">
        <ul v-if="mockMemos.length" class="memo-list-items">
          <li v-for="memo in mockMemos" :key="memo.id" class="memo-list-items__item">
            <div class="memo-list-items__main">
              <p class="memo-list-items__title">{{ memo.title }}</p>
              <p class="memo-list-items__meta">{{ formatMemoLabel(memo.id, memo.content) }}</p>
            </div>
            <BaseBadge :variant="statusVariant[memo.status] ?? 'gray'">{{ memo.status }}</BaseBadge>
          </li>
        </ul>
        <p v-else class="memo-list__empty">표시할 메모가 없어요.</p>
      </div>

      <div v-else-if="activeTab === 'update'" class="memo-list__panel">
        <ul class="memo-list-items">
          <li
            v-for="memo in mockMemos"
            :key="memo.id"
            class="memo-list-items__item memo-list-items__item--selectable"
            :class="{ 'memo-list-items__item--active': selectedId === memo.id }"
            @click="selectMemoForUpdate(memo.id)"
          >
            <div class="memo-list-items__main">
              <p class="memo-list-items__title">{{ memo.title }}</p>
              <p class="memo-list-items__meta">{{ formatMemoLabel(memo.id, memo.content) }}</p>
            </div>
          </li>
        </ul>
        <BaseInput v-model="title" label="제목" placeholder="메모 제목" />
        <BaseTextarea v-model="content" label="내용" placeholder="내용을 입력하세요" :rows="4" />
        <BaseButton block @click="handleUpdate">수정 저장</BaseButton>
      </div>

      <div v-else-if="activeTab === 'delete'" class="memo-list__panel">
        <ul v-if="mockMemos.length" class="memo-list-items">
          <li v-for="memo in mockMemos" :key="memo.id" class="memo-list-items__item">
            <div class="memo-list-items__main">
              <p class="memo-list-items__title">{{ memo.title }}</p>
              <p class="memo-list-items__meta">{{ formatMemoLabel(memo.id, memo.content) }}</p>
            </div>
            <BaseButton variant="danger" size="sm" @click="openDeleteModal(memo.id)">삭제</BaseButton>
          </li>
        </ul>
        <p v-else class="memo-list__empty">삭제할 메모가 없어요.</p>
      </div>
    </BaseTabs>

    <BaseModal v-model="deleteModalOpen" title="메모를 삭제할까요?">
      <template v-if="deleteTarget">
        「{{ deleteTarget.title }}」을 삭제합니다. 복구할 수 없어요.
      </template>
      <template #actions>
        <BaseButton variant="danger" grow size="md" @click="handleDelete">삭제하기</BaseButton>
        <BaseButton variant="secondary" grow size="md" @click="deleteModalOpen = false">닫기</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
