export const getterTypes = {
  lang: "[app] lang",
  location: "[app] location",
  windowWidth: "[app] window width",
  locationList: "[app] location list"
};

export const mutationTypes = {
  setLang: "[app] set lang",
  setLocation: "[app] set location",
  setWindowWidth: "[app] set window width"
};

const state = {
  lang: "Рус",
  location: "Сочи",
  locationList: [
    "Ульяновск",
    "Самара",
    "Москва",
    "Краснодар",
    "Сочи",
    "Новгород"
  ],
  windowWidth: null
};

const getters = {
  [getterTypes.lang]: state => state.lang,
  [getterTypes.location]: state => state.location,
  [getterTypes.windowWidth]: state => state.windowWidth,
  [getterTypes.locationList]: state => state.locationList
};

const mutations = {
  [mutationTypes.setLang](state, lang) {
    state.lang = lang;
  },
  [mutationTypes.setLocation](state, location) {
    state.location = location;
  },
  [mutationTypes.setWindowWidth](state, windowWidth) {
    state.windowWidth = windowWidth;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
