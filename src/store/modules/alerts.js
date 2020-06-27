export default {
  state: {
    alert: true,
    alert_message: "Test",
  },
  mutations: {
    setAlert(state, alert) {
      state.alert = alert;
    },
  },
  actions: {
    setAlert({ commit }, state) {
      commit("setAlert", state);
    },
  },
};
