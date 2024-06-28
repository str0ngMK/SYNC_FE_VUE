import { createRouter, createWebHistory } from "vue-router";
import index from "@/views/index.vue";
import setting from "@/views/setting.vue";
import test from "@/components/img/imageSetting.vue";

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
  {
    path: "/test",
    name: "test",
    component: test,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
