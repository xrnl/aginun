export default {
  namespaced: true,
  state: {
    token: ""
  },
  getters: {
    loggedIn: (state) => !!state.token
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    async login({ commit }, {token}) {
      commit("setToken", token);
    },
    async logout({ commit }) {
      commit("setToken", null);
    }
  }
};
