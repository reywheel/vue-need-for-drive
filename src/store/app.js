export const getterTypes = {
  lang: "[app] lang",
  location: "[app] location",
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
  location: { name: "Краснодар" },
  menuIsOpen: false
};

const getters = {
  [getterTypes.lang]: state => state.lang,
  [getterTypes.location]: state => state.location,
  [getterTypes.menuIsOpen]: state => state.menuIsOpen,
  [getterTypes.pickPointsList]: state => state.pickPointsList
};

const mutations = {
  [mutationTypes.setLang](state, lang) {
    state.lang = lang;
  },
  [mutationTypes.setLocation](state, city) {
    state.location = city;
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
