import axios from "axios";

const state = {
  token: localStorage.getItem("token") || null,
  user: null,
};

const getters = {
  isAuthenticated: (state) => !!state.token,
};

const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await axios.post("/auth/login/", credentials);
      const token = response.data.key;
      localStorage.setItem("token", token); // Сохраняем токен в localStorage
      commit("SET_TOKEN", token);
      return true; // Успешная авторизация
    } catch (error) {
      console.error("Ошибка авторизации:", error.response.data);
      throw error.response.data;
    }
  },
  logout({ commit }) {
    localStorage.removeItem("token");
    commit("SET_TOKEN", null);
    commit("SET_USER", null);
  },
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
