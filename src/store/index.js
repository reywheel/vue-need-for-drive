import Vue from "vue";
import Vuex from "vuex";
import app from "@/store/app";
import order from "@/store/order";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    order
  }
});
