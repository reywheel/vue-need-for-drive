export const getterTypes = {
  lang: "[app] lang",
  location: "[app] location",
  menuIsOpen: "[app] menu is open"
};

export const mutationTypes = {
  setLang: "[app] set lang",
  setLocation: "[app] set location",
  toggleMenuVisibility: "[app] toggle menu visibility"
};

const state = {
  lang: "Рус",
  location: {
    createdAt: 1579589928849,
    id: "5e26a128099b810b946c5d87",
    name: "Ульяновск",
    updatedAt: 1611743727561
  },
  menuIsOpen: false
};

const getters = {
  [getterTypes.lang]: state => state.lang,
  [getterTypes.location]: state => state.location,
  [getterTypes.menuIsOpen]: state => state.menuIsOpen
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
