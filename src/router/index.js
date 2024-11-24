import Vue from "vue";
import Router from "vue-router";
import LoginView from "../views/LoginView.vue";
import AppealsView from "../views/AppealsView.vue";

Vue.use(Router);

const router = new Router({
  mode: "history", // Используем history mode, чтобы избежать хэшей (#) в URL
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/",
      name: "Appeals",
      component: AppealsView,
      meta: { requiresAuth: true },
    },
  ],
});

// Глобальный навигационный guard для проверки авторизации
router.beforeEach((to, _from, next) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Проверяем наличие токена
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next("/login"); // Если не авторизован, перенаправляем на /login
  } else {
    next(); // Иначе пропускаем
  }
});

export default router;