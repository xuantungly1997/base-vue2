import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/stores/index";

Vue.use(VueRouter);

// vue-router lazy load
const Login = () => import("@/views/Login");
const Dashboard = () => import("@/views/Dashboard");
const Index = () => import("@/views/Index");
const User = () => import("@/views/User");
const PageNotFound = () => import("@/views/PageNotFound");

/**
 * meta config
 *
 * requiredAuth: authentication status
 * layout: page layout
 * pageTitle: static page title
 */
const routes = [
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound,
    meta: {
      requiredAuth: false,
      layout: "empty",
      pageTitle: "Not Found",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiredAuth: false,
      layout: "empty",
      pageTitle: "Login",
    },
  },
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: {
      requiredAuth: false,
      layout: "user",
      pageTitle: "Index",
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiredAuth: false,
      layout: "admin",
      pageTitle: "Dashboard",
    },
  },
  {
    path: "/user",
    name: "User",
    component: User,
    meta: {
      requiredAuth: true,
      layout: "user",
      pageTitle: "User",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes,
});

// Auth middleware
const middleware = async (to, from, next) => {
  const isLogin = store.getters["auth/isLogin"];
  if (
    ((to.name !== "Login" && to.meta.requiredAuth) || to.name === null) &&
    !isLogin
  ) {
    next({ name: "Login" });
  } else {
    if (to.name === null) {
      next({ name: "Index" });
    } else {
      next();
    }
  }
};
router.beforeEach(middleware);

export default router;
