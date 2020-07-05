export default {
  state: {
    alert: undefined,
  },
  mutations: {
    setAlert(state, alert) {
      state.alert = alert;
    },
  },
  actions: {
    displaySuccess({ commit }, message) {
      commit("setAlert", {
        message: message,
        color: "success",
        icon: "mdi-checkbox-marked-circle-outline",
      });
    },
    displayError({ commit }, message) {
      commit("setAlert", {
        message: message,
        color: "error",
        icon: "mdi-alert",
      });
    },
  },
};
