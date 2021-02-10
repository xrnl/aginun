import qs from "qs";
import axios from "axios";
import Vue from "vue";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);

export const loginCookieKey = "loginToken";

export default {
  namespaced: true,
  state: {
    token: ""
  },
  getters: {
    loggedIn(state) {
      return !!state.token;
    }
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
    },
    setTokenCookie(state, { token, lifetime }) {
      Vue.$cookies.set(loginCookieKey, token, lifetime);
    },
    removeToken(state) {
      state.token = null;
      Vue.$cookies.remove(loginCookieKey);
    }
  },
  actions: {
    initializeFromCookie({ commit }) {
      commit("setToken", Vue.$cookies.get(loginCookieKey));
    },
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
      try {
        const { data } = await axios.post(
          process.env.VUE_APP_KEYSERVER_URL || "",
          qs.stringify(params),
          config
        );
        commit("setToken", data.access_token);
        commit("setTokenCookie", {
          token: data.access_token,
          lifetime: data.expires_in
        });
      } catch ({ response }) {
        return (
          (response.data?.error_description as string) ||
          "Login server unavailable"
        );
      }
      return "";//no error
    },
    logout({ commit }) {
      commit("removeToken");
    }
  }
};
