import qs from "qs";
import axios from "axios";

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
      //todo: check if cookies are accepted
    }
  },
  actions: {
    async login({ commit }, {username, password}): Promise<[boolean, string]> {
      const config = {
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      };
      const params = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        grant_type: "password",
        // eslint-disable-next-line @typescript-eslint/camelcase
        client_id: "volunteerplatform",
        username,
        password
      };
      let result = false;
      let message = "";
      await axios.post(process.env.VUE_APP_KEYSERVER_URL || "", qs.stringify(params), config).then(function (res) {
        commit("setToken", res.data.access_token);
        result = true;
      }).catch(function (e) {
        if(e.response.data)
          message = e.response.data.error_description;
        else
          message = "Login server unavailable";
      });
      return [result, message];
    },
    async logout({ commit }) {
      commit("setToken", null);
    }
  }
};
