export const getterTypes = {
  lang: "[app] lang",
  location: "[app] location",
  windowWidth: "[app] window width",
  locationList: "[app] location list",
  menuIsOpen: "[app] menu is open",
  pickPointsList: "[app] pick points list"
};

export const mutationTypes = {
  setLang: "[app] set lang",
  setLocation: "[app] set location",
  setWindowWidth: "[app] set window width",
  toggleMenuVisibility: "[app] toggle menu visibility"
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
  windowWidth: null,
  menuIsOpen: false
};

const getters = {
  [getterTypes.lang]: state => state.lang,
  [getterTypes.location]: state => state.location,
  [getterTypes.windowWidth]: state => state.windowWidth,
  [getterTypes.locationList]: state => state.locationList,
  [getterTypes.menuIsOpen]: state => state.menuIsOpen,
  [getterTypes.pickPointsList]: state => state.pickPointsList
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
  },
  [mutationTypes.toggleMenuVisibility](state) {
    state.menuIsOpen = !state.menuIsOpen;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
