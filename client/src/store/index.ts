import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchQuery: "",
  },
  mutations: {
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {},
  modules: {},
});
