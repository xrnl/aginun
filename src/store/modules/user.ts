import axios from "axios";
import qs from "qs";

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
    async login({ commit }, { username, password }) {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      const params = {
        // eslint-disable-next-line @typescript-eslint/camelcase
        grant_type: "password",
        // eslint-disable-next-line @typescript-eslint/camelcase
        client_id: "volunteerplatform",
        username,
        password
      };

      const auth = await axios.post(
        process.env.VUE_APP_KEYSERVER_URL || "",
        qs.stringify(params),
        config
      );

      const token = auth.data.access_token;

      commit("setToken", token);
    },
    async logout({ commit }) {
      commit("setToken", null);
    }
  }
};
