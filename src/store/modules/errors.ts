export default {
  namespaced: true,
  state: {
    serverError: undefined
  },
  mutations: {
    setServerError(state, hasError) {
      state.serverError = hasError;
    }
  },
  actions: {
    serverError({ commit }, hasError) {
      commit("setServerError", hasError);
    }
  }
};
