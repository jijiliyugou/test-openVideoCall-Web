import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("@/views/Home.vue");
const Login = () => import("@/views/Login.vue");
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/",
    redirect: "/login"
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.name !== "login") {
    const isLogin = sessionStorage.getItem("isLogin");
    if (!isLogin) {
      next({ path: "/login" });
    }
    next();
  }
  next();
});

export default router;
