import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  modules,
  strict: false,
  actions: {},
});
