import { createRouter, createWebHistory } from "vue-router";
import index from "@/views/index.vue";
import setting from "@/views/setting.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
  },
  {
    path: "/setting",
    name: "setting",
    component: setting,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
