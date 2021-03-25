export const getterTypes = {
  city: "[order] city",
  pickUpPoint: "[order] pick-up point"
};

export const mutationTypes = {
  setCity: "[order] set city",
  setPickUpPoint: "[order] set pick-up point"
};

export const actionTypes = {};

const state = {
  city: null,
  pickUpPoint: null
};

const getters = {
  [getterTypes.city]: state => state.city,
  [getterTypes.pickUpPoint]: state => state.pickUpPoint
};

const mutations = {
  [mutationTypes.setCity](state, newCity) {
    state.city = newCity;
  },
  [mutationTypes.setPickUpPoint](state, newPickUpPoint) {
    state.pickUpPoint = newPickUpPoint;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
