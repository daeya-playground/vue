<script setup>
import { RouterView } from 'vue-router'
import AppLeftMenu from './parts/AppLeftMenu.vue'
</script>

<template>
  <div class="layout-root layout-left-menu-only">
    <div class="layout-body">
      <AppLeftMenu />
      <main class="layout-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>
