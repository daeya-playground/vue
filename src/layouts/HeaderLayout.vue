<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './parts/AppHeader.vue'
</script>

<template>
  <div class="layout-root layout-header-only">
    <AppHeader />
    <main class="layout-content">
      <RouterView />
    </main>
  </div>
</template>
