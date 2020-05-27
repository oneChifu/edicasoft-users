import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'users',
    component: () => import("@/views/Users.vue")
  },
  {
    path: "*",
    name: "error404",
    component: () => import("@/views/Error404.vue")
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router
