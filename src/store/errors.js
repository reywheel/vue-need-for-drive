export const getterTypes = {
  errors: "[errors] errors",
  isEmpty: "[errors] is empty"
};

export const mutationTypes = {
  addError: "[errors] add error",
  deleteFirstError: "[errors] delete first error"
};

export const actionTypes = {
  addError: "[errors] add error"
};

const state = {
  errors: []
};

const getters = {
  [getterTypes.errors]: state => state.errors,
  [getterTypes.isEmpty]: state => !!state.errors.length
};

const mutations = {
  [mutationTypes.addError](state, error) {
    state.errors.push(error);
  },
  [mutationTypes.deleteFirstError](state) {
    state.errors.splice(0, 1);
  }
};

const actions = {
  [actionTypes.addError]({ commit }, { error }) {
    commit(mutationTypes.addError, error);
    window.setTimeout(() => {
      commit(mutationTypes.deleteFirstError);
    }, 3000);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
