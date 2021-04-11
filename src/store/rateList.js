import rateApi from "@/api/rate";

export const getterTypes = {
  allRates: "[rateList] all rates",
  isLoading: "[rateList] is loading",
  isEmpty: "[rateList] is empty"
};

export const mutationTypes = {
  getRateListStart: "[rateList] get rate list start",
  getRateListSuccess: "[rateList] get rate list success",
  getRateListFailure: "[rateList] get rate list failure"
};

export const actionTypes = {
  getRateList: "[rateList] get rate list"
};

const state = {
  data: null,
  isLoading: false
};

const getters = {
  [getterTypes.allRates]: state => state.data,
  [getterTypes.isEmpty]: state => state.data === null || state.data === [],
  [getterTypes.isLoading]: state => state.isLoading
};

const mutations = {
  [mutationTypes.getRateListStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getRateListSuccess](state, rateList) {
    state.isLoading = false;
    state.data = rateList;
  },
  [mutationTypes.getRateListFailure](state) {
    state.isLoading = false;
  }
};

const actions = {
  async [actionTypes.getRateList]({ commit }) {
    try {
      commit(mutationTypes.getRateListStart);
      const response = await rateApi.getAll();
      commit(mutationTypes.getRateListSuccess, response.data);
    } catch (e) {
      commit(mutationTypes.getRateListFailure);
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
