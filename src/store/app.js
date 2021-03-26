export const getterTypes = {
  lang: "[app] lang",
  location: "[app] location",
  locationList: "[app] location list",
  menuIsOpen: "[app] menu is open",
  pickPointsList: "[app] pick points list"
};

export const mutationTypes = {
  setLang: "[app] set lang",
  setLocation: "[app] set location",
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
  menuIsOpen: false
};

const getters = {
  [getterTypes.lang]: state => state.lang,
  [getterTypes.location]: state => state.location,
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
