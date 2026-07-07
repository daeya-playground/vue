<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="layout-pattern-a">
    <header class="layout-pattern-a__header">
      <RouterLink to="/" class="layout-pattern-a__back">← 목록으로</RouterLink>
    </header>
    <main class="layout-pattern-a__content">
      <RouterView />
    </main>
  </div>
</template>
