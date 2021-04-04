import pointApi from "@/api/point";

export const getterTypes = {
  allPoints: "[pointList] all points",
  isLoading: "[pointList] is loading",
  isEmpty: "[pointList] is empty"
};

export const mutationTypes = {
  getPointListStart: "[pointList] get point list start",
  getPointListSuccess: "[pointList] get point list success",
  getPointListFailure: "[pointList] get point list failure"
};

export const actionTypes = {
  getPointListByCityId: "[pointList] get point list by city id"
};

const state = {
  data: null,
  isLoading: false
};

const getters = {
  [getterTypes.allPoints]: state => state.data,
  [getterTypes.isEmpty]: state => state.data === null || state.data === [],
  [getterTypes.isLoading]: state => state.isLoading
};

const mutations = {
  [mutationTypes.getPointListStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getPointListSuccess](state, pointList) {
    state.isLoading = false;
    state.data = pointList;
  },
  [mutationTypes.getPointListFailure](state) {
    state.isLoading = false;
  }
};

const actions = {
  async [actionTypes.getPointListByCityId]({ commit }, { cityId }) {
    try {
      commit(mutationTypes.getPointListStart);
      const response = await pointApi.getByCityId(cityId);
      commit(mutationTypes.getPointListSuccess, response.data);
    } catch (e) {
      commit(mutationTypes.getPointListFailure);
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
