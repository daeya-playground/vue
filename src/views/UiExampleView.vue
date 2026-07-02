<script setup>
import { computed, ref } from 'vue'
import { useToast } from '@/composables/useToast'
import '@/styles/pages/ui-example.scss'
import {
  BaseBadge,
  BaseButton,
  BaseCheckbox,
  BaseInput,
  BaseModal,
  BaseRadioGroup,
  BaseSelect,
  BaseTabs,
  BaseTextarea,
} from '@/components/ui'

const toast = useToast()

const title = ref('')
const content = ref('')
const category = ref('work')
const agreed = ref(false)
const plan = ref('basic')
const activeTab = ref('all')
const modalOpen = ref(false)

const categoryOptions = [
  { value: 'work', label: '업무' },
  { value: 'personal', label: '개인' },
  { value: 'study', label: '학습' },
]

const planOptions = [
  { value: 'basic', label: '기본', desc: '개인 메모' },
  { value: 'pro', label: '프로', desc: '태그·필터 사용' },
]

const tabItems = [
  { value: 'all', label: '전체' },
  { value: 'recent', label: '최근' },
  { value: 'done', label: '완료' },
]

const sampleMemos = [
  { id: 1, title: '회의록 정리', badge: '진행중', variant: 'blue', status: 'recent' },
  { id: 2, title: '장보기 목록', badge: '완료', variant: 'green', status: 'done' },
  { id: 3, title: 'Vue 연습 노트', badge: '학습', variant: 'gray', status: 'recent' },
]

const filteredMemos = computed(() => {
  if (activeTab.value === 'recent') {
    return sampleMemos.filter((memo) => memo.status === 'recent')
  }
  if (activeTab.value === 'done') {
    return sampleMemos.filter((memo) => memo.status === 'done')
  }
  return sampleMemos
})

const toastSamples = [
  { variant: 'info', label: '안내', message: '변경 사항은 자동 저장돼요.' },
  { variant: 'success', label: '저장 완료', message: '메모가 저장되었어요.' },
  { variant: 'warning', label: '주의', message: '삭제하면 되돌릴 수 없어요.' },
  { variant: 'error', label: '오류', message: '서버와 연결할 수 없어요.' },
]

function handleSave() {
  if (!title.value.trim()) {
    toast.warning('제목을 입력해 주세요')
    return
  }
  toast.success('메모를 저장했어요')
}

function showToast(sample) {
  toast[sample.variant](sample.message)
}

function confirmDelete() {
  modalOpen.value = false
  toast.success('삭제했어요')
}
</script>

<template>
  <div class="ui-example">
    <header class="ui-example__hero">
      <h1 class="ui-example__title">UI 예시</h1>
    </header>
    <p class="ui-example__lead">
      Layout A + Daeya UI 예시예요. 저장·삭제 같은 피드백은 하단 토스트로 보여줍니다.
    </p>

    <section class="ui-example__section">
      <h2 class="ui-example__heading">메모 작성</h2>
      <div class="ui-example__stack">
        <BaseInput v-model="title" label="제목" placeholder="메모 제목" />
        <BaseTextarea v-model="content" label="내용" placeholder="내용을 입력하세요" :rows="3" />
        <BaseSelect v-model="category" label="카테고리" :options="categoryOptions" />
        <BaseRadioGroup v-model="plan" label="플랜" :options="planOptions" />
        <BaseCheckbox v-model="agreed" label="저장 시 알림을 받을게요" />
        <BaseButton block @click="handleSave">저장하기</BaseButton>
      </div>
    </section>

    <section class="ui-example__section">
      <h2 class="ui-example__heading">목록 · 탭</h2>
      <BaseTabs v-model="activeTab" :tabs="tabItems">
        <ul v-if="filteredMemos.length" class="ui-example-list">
          <li v-for="memo in filteredMemos" :key="memo.id" class="ui-example-list__item">
            <div>
              <p class="ui-example-list__title">{{ memo.title }}</p>
              <BaseBadge :variant="memo.variant">{{ memo.badge }}</BaseBadge>
            </div>
            <BaseButton variant="ghost" size="sm" @click="modalOpen = true">삭제</BaseButton>
          </li>
        </ul>
        <p v-else class="ui-example__empty">이 탭에 표시할 메모가 없어요.</p>
      </BaseTabs>
    </section>

    <section class="ui-example__section">
      <h2 class="ui-example__heading">Modal</h2>
      <p class="ui-example__hint">모바일은 하단, PC는 화면 가운데에서 열려요.</p>
      <BaseButton block @click="modalOpen = true">모달 열기</BaseButton>
    </section>

    <section class="ui-example__section">
      <h2 class="ui-example__heading">토스트</h2>
      <p class="ui-example__hint">예전 Alert 안내 4종을 토스트로 대체했어요.</p>
      <div class="ui-example__row">
        <BaseButton
          v-for="sample in toastSamples"
          :key="sample.variant"
          size="sm"
          :variant="sample.variant === 'error' ? 'danger' : sample.variant === 'warning' ? 'secondary' : 'ghost'"
          @click="showToast(sample)"
        >
          {{ sample.label }}
        </BaseButton>
      </div>
    </section>

    <BaseModal v-model="modalOpen" title="메모를 삭제할까요?">
      삭제한 메모는 복구할 수 없어요.
      <template #actions>
        <BaseButton variant="danger" grow size="md" @click="confirmDelete">삭제하기</BaseButton>
        <BaseButton variant="secondary" grow size="md" @click="modalOpen = false">닫기</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
