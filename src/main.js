import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

// Подключение базовых стилей
// import "./assets/styles/main.scss";

// Настройка Axios для работы с API
axios.defaults.baseURL = "https://dev.moydomonline.ru/api";
axios.interceptors.request.use((config) => {
  const token = store.state.auth.token;
  if (token) {
    config.headers.Authorization = `Token ${token}`; // Добавляем токен в заголовок
  }
  return config;
});

// Делаем Axios доступным глобально
Vue.prototype.$axios = axios;

// Отключаем вывод о работе в режиме разработки
Vue.config.productionTip = false;

new Vue({
  router, // Подключаем маршрутизацию
  store,  // Подключаем хранилище Vuex
  render: (h) => h(App), // Рендерим корневой компонент
}).$mount("#app"); // Монтируем приложение в элемент с id="app"
