<script setup>
import { RouterLink } from "vue-router";
import { PRACTICE_PAGES } from "@/js/common";
</script>

<template>
  <aside class="layout-left-menu">
    <p class="layout-left-menu__title">연습</p>
    <nav class="layout-left-menu__list">
      <RouterLink v-for="page in PRACTICE_PAGES" :key="page.name" :to="page.path">
        {{ page.label }}
      </RouterLink>
    </nav>
  </aside>
</template>
