<script setup>
import { RouterView } from 'vue-router'
import AppFooter from './parts/AppFooter.vue'
</script>

<template>
  <div class="layout-root layout-footer-only">
    <main class="layout-content">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>
