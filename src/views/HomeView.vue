<script setup>
import { RouterLink } from 'vue-router'
import { APP_TITLE, PRACTICE_PAGES } from '@/js/common'
import logoUrl from '@/assets/logo.png'
import '@/styles/pages/home.scss'

const links = PRACTICE_PAGES.filter((page) => page.path !== '/')
</script>

<template>
  <div class="home">
    <img class="home__logo" :src="logoUrl" :alt="APP_TITLE" width="94" height="50" />
    <h1 class="page-title">{{ APP_TITLE }}</h1>
    <p class="home__lead">Vue 연습용 playground</p>
    <nav class="home__nav" aria-label="연습 페이지">
      <RouterLink v-for="page in links" :key="page.name" :to="page.path" class="home__link">
        {{ page.label }}
      </RouterLink>
    </nav>
  </div>
</template>
