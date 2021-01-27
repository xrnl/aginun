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
    setToken(state, token: string) {
      state.token = token;
    }
  },
  actions: {
    async login({ commit }, { username, password }): Promise<void> {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      const params = {
        grant_type: "password",
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
    async logout({ commit }): Promise<void> {
      commit("setToken", null);
    }
  }
};
