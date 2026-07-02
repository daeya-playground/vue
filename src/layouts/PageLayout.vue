<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './parts/AppHeader.vue'
import AppFooter from './parts/AppFooter.vue'
import AppLeftMenu from './parts/AppLeftMenu.vue'
</script>

<template>
  <div class="layout-root layout-page">
    <AppHeader />
    <div class="layout-body">
      <AppLeftMenu />
      <main class="layout-content">
        <div class="page-container">
          <RouterView />
        </div>
      </main>
    </div>
    <AppFooter />
  </div>
</template>
