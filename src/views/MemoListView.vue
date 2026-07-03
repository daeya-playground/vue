<script setup>
import { computed, onMounted, ref } from 'vue'
import { useToast } from '@/composables/useToast'
import '@/styles/pages/memo-list.scss'
import {
  BaseBadge,
  BaseButton,
  BaseInput,
  BaseModal,
  BaseTabs,
  BaseTextarea,
  BaseSelect,
} from '@/components/ui'
import { MEMO_STATUS, MEMO_STATUS_OPTIONS } from '@/js/common'

const toast = useToast()

const activeTab = ref('read')
const deleteModalOpen = ref(false)
const deleteTargetId = ref(null)

const memos = ref([])
const loading = ref(true)
const error = ref(null)

const title = ref('')
const content = ref('')
const selectedId = ref(1)

const status = ref('READY')

const crudTabs = [
  { value: 'create', label: 'Create' },
  { value: 'read', label: 'Read' },
  { value: 'update', label: 'Update' },
  { value: 'delete', label: 'Delete' },
]

/* 페이지 로드 시 실행 */
onMounted(async () => {
  getMemos();
})

const selectedMemo = computed(() => memos.value.find((m) => m.id === selectedId.value))
const deleteTarget = computed(() => memos.value.find((m) => m.id === deleteTargetId.value))

function resetForm() {
  title.value = ''
  content.value = ''
  status.value = 'READY'
}

// GET /api/memos
async function getMemos() {
  try {
    const res = await fetch('/api/memos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) throw new Error(res.status)
    memos.value = await res.json()
  } catch (e) {
    console.error(e)
    error.value = e.message
  }
  finally {
    loading.value = false
  }
}

function loadSelectedToForm() {
  const memo = selectedMemo.value
  if (!memo) return
  title.value = memo.title
  content.value = memo.content
  status.value = memo.status
}

// POST /api/memos
async function handleCreate() {
  if (!title.value.trim()) {
    toast.warning('제목을 입력해 주세요')
    return
  }
  if (!content.value.trim()) {
    toast.warning('내용을 입력해 주세요')
    return
  }
  try {
    const res = await fetch('/api/memos', {
      method: 'POST',
      body: JSON.stringify({ title: title.value, content: content.value, status: status.value }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) throw new Error(res.status)
    await getMemos();
    resetForm();
    toast.success('저장했어요')
  } catch (e) {
    console.error(e)
    error.value = e.message
  } finally {
    loading.value = false
  }
}

// PUT /api/memos/:id
async function handleUpdate() {
  if (!title.value.trim()) {
    toast.warning('제목을 입력해 주세요')
    return
  }
  if (!content.value.trim()) {
    toast.warning('내용을 입력해 주세요')
    return
  }
  try{
    const res = await fetch(`/api/memos/${selectedId.value}`, {
      method: 'PUT',
      body: JSON.stringify({ title: title.value, content: content.value, status: status.value }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) throw new Error(res.status)
    await getMemos();
    resetForm();
    toast.success('수정했어요')
  } catch (e) {
    console.error(e)
    error.value = e.message
  } finally {
    loading.value = false
  }
}

function openDeleteModal(id) {
  deleteTargetId.value = id
  deleteModalOpen.value = true
}

// DELETE /api/memos/:id
async function handleDelete() {
  try{
    const res = await fetch(`/api/memos/${deleteTargetId.value}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error(res.status)
    await getMemos();
    toast.success('삭제했어요')
  } catch (e) {
    console.error(e)
    error.value = e.message
  } finally {
    loading.value = false
    deleteModalOpen.value = false
    deleteTargetId.value = null
  }
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
        <BaseSelect v-model="status" label="상태" :options="MEMO_STATUS_OPTIONS" />
        <BaseButton block @click="handleCreate">저장하기</BaseButton>
        <BaseButton variant="ghost" block @click="resetForm">입력 초기화</BaseButton>
      </div>

      <div v-else-if="activeTab === 'read'" class="memo-list__panel">
        <ul v-if="memos.length" class="memo-list-items">
          <li v-for="memo in memos" :key="memo.id" class="memo-list-items__item">
            <div class="memo-list-items__main">
              <p class="memo-list-items__title">{{ memo.title }}</p>
              <p class="memo-list-items__meta">{{ memo.content }}</p>
            </div>
            <BaseBadge :variant="MEMO_STATUS[memo.status]?.variant ?? 'gray'">
              {{ MEMO_STATUS[memo.status]?.label ?? memo.status }}
            </BaseBadge>
          </li>
        </ul>
        <p v-else class="memo-list__empty">표시할 메모가 없어요.</p>
      </div>

      <div v-else-if="activeTab === 'update'" class="memo-list__panel">
        <ul class="memo-list-items">
          <li
            v-for="memo in memos"
            :key="memo.id"
            class="memo-list-items__item memo-list-items__item--selectable"
            :class="{ 'memo-list-items__item--active': selectedId === memo.id }"
            @click="selectMemoForUpdate(memo.id)"
          >
            <div class="memo-list-items__main">
              <p class="memo-list-items__title">{{ memo.title }}</p>
              <p class="memo-list-items__meta">{{ memo.content }}</p>
            </div>
            <BaseBadge :variant="MEMO_STATUS[memo.status]?.variant ?? 'gray'">
              {{ MEMO_STATUS[memo.status]?.label ?? memo.status }}
            </BaseBadge>
          </li>
        </ul>
        <BaseInput v-model="title" label="제목" placeholder="메모 제목" />
        <BaseTextarea v-model="content" label="내용" placeholder="내용을 입력하세요" :rows="4" />
        <BaseSelect v-model="status" label="상태" :options="MEMO_STATUS_OPTIONS" />
        <BaseButton block @click="handleUpdate">수정 저장</BaseButton>
      </div>

      <div v-else-if="activeTab === 'delete'" class="memo-list__panel">
        <ul v-if="memos.length" class="memo-list-items">
          <li v-for="memo in memos" :key="memo.id" class="memo-list-items__item">
            <div class="memo-list-items__main">
              <p class="memo-list-items__title">{{ memo.title }}</p>
              <p class="memo-list-items__meta">{{ memo.content }}</p>
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
