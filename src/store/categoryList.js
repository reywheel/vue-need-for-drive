import categoryApi from "@/api/category";

export const getterTypes = {
  allCategories: "[categoryList] all categorys",
  isLoading: "[categoryList] is loading",
  isEmpty: "[categoryList] is empty"
};

export const mutationTypes = {
  getCategoryListStart: "[categoryList] get category list start",
  getCategoryListSuccess: "[categoryList] get category list success",
  getCategoryListFailure: "[categoryList] get category list failure"
};

export const actionTypes = {
  getCategoryList: "[categoryList] get category list"
};

const state = {
  data: null,
  isLoading: false
};

const getters = {
  [getterTypes.allCategories]: state => state.data,
  [getterTypes.isEmpty]: state =>
    state.data === null || state.data.length === 0,
  [getterTypes.isLoading]: state => state.isLoading
};

const mutations = {
  [mutationTypes.getCategoryListStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCategoryListSuccess](state, categoryList) {
    state.isLoading = false;
    state.data = categoryList;
  },
  [mutationTypes.getCategoryListFailure](state) {
    state.isLoading = false;
  }
};

const actions = {
  async [actionTypes.getCategoryList]({ commit }) {
    try {
      commit(mutationTypes.getCategoryListStart);
      const response = await categoryApi.getAll();
      commit(mutationTypes.getCategoryListSuccess, response.data);
    } catch (e) {
      commit(mutationTypes.getCategoryListFailure);
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
