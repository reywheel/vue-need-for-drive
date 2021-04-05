import carApi from "@/api/car";

export const getterTypes = {
  allCars: "[carList] all cars",
  isLoading: "[carList] is loading",
  isEmpty: "[carList] is empty"
};

export const mutationTypes = {
  getCarListStart: "[carList] get car list start",
  getCarListSuccess: "[carList] get car list success",
  getCarListFailure: "[carList] get car list failure"
};

export const actionTypes = {
  getCarList: "[carList] get car list"
};

const state = {
  data: null,
  isLoading: false
};

const getters = {
  [getterTypes.allCars]: state => state.data,
  [getterTypes.isEmpty]: state =>
    state.data === null || state.data.length === 0,
  [getterTypes.isLoading]: state => state.isLoading
};

const mutations = {
  [mutationTypes.getCarListStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCarListSuccess](state, carList) {
    state.isLoading = false;
    state.data = carList;
  },
  [mutationTypes.getCarListFailure](state) {
    state.isLoading = false;
  }
};

const actions = {
  async [actionTypes.getCarList]({ commit }) {
    try {
      commit(mutationTypes.getCarListStart);
      const response = await carApi.getAll();
      commit(mutationTypes.getCarListSuccess, response.data);
    } catch (e) {
      commit(mutationTypes.getCarListFailure);
      throw e;
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
