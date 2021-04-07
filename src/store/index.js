import Vue from "vue";
import Vuex from "vuex";
import app from "@/store/app";
import order from "@/store/order";
import errors from "@/store/errors";
import carList from "@/store/carList";
import cityList from "@/store/cityList";
import pointList from "@/store/pointList";
import categoryList from "@/store/categoryList";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    order,
    errors,
    carList,
    cityList,
    pointList,
    categoryList
  }
});
