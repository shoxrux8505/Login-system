import axios from "axios";

const state = {
  appeals: [], // Список заявок
};

const getters = {
  allAppeals: (state) => state.appeals,
};

const actions = {
  async fetchAppeals({ commit }) {
    try {
      const response = await axios.get("/appeals/v1.0/appeals/");
      commit("SET_APPEALS", response.data.results); // Сохраняем список заявок
    } catch (error) {
      console.error("Ошибка загрузки заявок:", error.response.data);
      throw error.response.data;
    }
  },
  async createAppeal({ dispatch }, appealData) {
    try {
      await axios.post("/appeals/v1.0/appeals/", appealData);
      dispatch("fetchAppeals"); // Обновляем список заявок после создания
    } catch (error) {
      console.error("Ошибка создания заявки:", error.response.data);
      throw error.response.data;
    }
  },
  async updateAppeal({ dispatch }, { id, appealData }) {
    try {
      await axios.patch(`/appeals/v1.0/appeals/${id}/`, appealData);
      dispatch("fetchAppeals"); // Обновляем список заявок после редактирования
    } catch (error) {
      console.error("Ошибка обновления заявки:", error.response.data);
      throw error.response.data;
    }
  },
};

const mutations = {
  SET_APPEALS(state, appeals) {
    state.appeals = appeals;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
