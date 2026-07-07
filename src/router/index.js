import { createRouter, createWebHistory } from "vue-router";

import PageLayout from "@/layouts/PageLayout.vue";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: PageLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "ui-example",
          name: "ui-example",
          component: () => import("@/views/UiExampleView.vue"),
        },
        {
          path: "memo-list",
          name: "memo-list",
          component: () => import("@/views/MemoListView.vue"),
        },
      ],
    },
  ],
});

export default router;
