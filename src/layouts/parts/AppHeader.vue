<script setup>
import { RouterLink } from 'vue-router'
import { APP_TITLE } from '@/js/common'
import logoUrl from '@/assets/logo.png'
</script>

<template>
  <header class="layout-header">
    <RouterLink to="/" class="layout-header__logo">
      <img class="layout-header__logo-img" :src="logoUrl" :alt="APP_TITLE" width="28" height="28" />
      <span>{{ APP_TITLE }}</span>
    </RouterLink>
  </header>
</template>
