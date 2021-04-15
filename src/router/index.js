import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "default" },
    component: () => import("../views/LoginAlumnos.vue"),
  },
  {
    path: "/escuelas",
    name: "Escuelas",
    meta: { layout: "app" },
    component: () => import("../views/Escuelas.vue"),
  },
  {
    path: "/examenes",
    name: "Examenes",
    meta: { layout: "app" },
    component: () => import("../views/Examenes.vue"),
  },
  {
    path: "/examenes/create",
    name: "nuevo",
    meta: { layout: "app" },
    component: () => import("../views/ExamenesNuevo.vue"),
  },
  {
    path: "/alumnos",
    name: "Alumnos",
    meta: { layout: "app" },
    component: () => import("../views/Alumnos.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginAlumnos.vue"),
  },
  {
    path: "/loginAdmin",
    name: "loginAdmin",
    component: () => import("../views/LoginAdmin.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let { layout = "default" } = to.meta;
  const layouts = store.state.layouts;

  if (!layouts.includes(layout)) layout = "default";

  store.commit("SET_LAYOUT", layout);

  next();
});

export default router;
