export default {
  state: {},
  mutations: {
    setServerError(state, hasError) {
      state.serverError = hasError;
    },
  },
  actions: {
    serverError({ commit }, hasError) {
      commit("setServerError", hasError);
    },
  },
};
