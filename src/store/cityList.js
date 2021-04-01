import cityApi from "@/api/city";

export const getterTypes = {
  allCities: "[cityList] all cities",
  isLoading: "[cityList] is loading",
  isEmpty: "[cityList] is empty"
};

export const mutationTypes = {
  getCityListStart: "[cityList] get city list start",
  getCityListSuccess: "[cityList] get city list success",
  getCityListFailure: "[cityList] get city list failure"
};

export const actionTypes = {
  getCityList: "[cityList] get city list"
};

const state = {
  data: null,
  isLoading: false
};

const getters = {
  [getterTypes.allCities]: state => state.data,
  [getterTypes.isEmpty]: state => state.data === null || state.data === []
};

const mutations = {
  [mutationTypes.getCityListStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCityListSuccess](state, cityList) {
    state.isLoading = false;
    state.data = cityList;
  },
  [mutationTypes.getCityListFailure](state) {
    state.isLoading = false;
  }
};

const actions = {
  async [actionTypes.getCityList]({ commit }) {
    try {
      commit(mutationTypes.getCityListStart);
      const response = await cityApi.getAll();
      commit(mutationTypes.getCityListSuccess, response.data);
    } catch (e) {
      commit(mutationTypes.getCityListFailure);
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
