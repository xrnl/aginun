import axios from "axios";
import qs from "qs";

export default {
  state: {
    loggedIn: false,
    token: "",
  },
  mutations: {
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, {username, password}) {
      const keyserverUrl =
        "https://keyserver.extinctionrebellion.nl/auth/realms/XR/protocol/openid-connect/token";

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }

      const params = {
        grant_type: "password",
        client_id: "volunteerplatform",
        username,
        password,
      };

      const auth = await axios.post(keyserverUrl, qs.stringify(params), config);

      const token = auth.data.access_token;

      console.log("Logged in! Access token: ", token);

      commit("setToken", token);
      commit("setLoggedIn", true);
    },
    async logout({ commit }) {
      commit("setToken", null);
      commit("setLoggedIn", false);
    },
  },
};
