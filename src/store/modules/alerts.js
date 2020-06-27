export default {
  state: {
    alert: true,
    alert_message: "Test",
  },
  mutations: {
    setAlert(state, alert) {
      state.alert = alert;
    },
    setAlertMessage(state, alert_message) {
      state.alert_message = alert_message;
    },
  },
  actions: {
    setAlert({ commit }, state) {
      commit("setAlert", state);
    },
    displayAlert({ commit }, message) {
      commit("setAlertMessage", message);
      commit("setAlert", true);
    },
  },
};
