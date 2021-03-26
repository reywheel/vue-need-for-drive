export const getterTypes = {
  city: "[order] city",
  pickUpPoint: "[order] pick-up point",
  pickUpPointsList: "[order] pick-up points list",
  isLocationFilled: "[order] is location filled",
  isModelFilled: "[order] is model filled"
};

export const mutationTypes = {
  setCity: "[order] set city",
  setPickUpPoint: "[order] set pick-up point"
};

export const actionTypes = {};

const state = {
  city: null,
  pickUpPoint: null,
  pickUpPointsList: [
    "Ульяновская",
    "Самарская",
    "Московская",
    "Краснодарская",
    "Сочинская",
    "Новгородская"
  ]
};

const getters = {
  [getterTypes.city]: state => state.city,
  [getterTypes.pickUpPoint]: state => state.pickUpPoint,
  [getterTypes.pickUpPointsList]: state => state.pickUpPointsList,
  [getterTypes.isLocationFilled]: state => state.city && state.pickUpPoint
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
