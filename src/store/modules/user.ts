import i18n from "@/i18n/i18n";
import axios from "axios";
import qs from "qs";
import Vue from "vue";

export const loginCookieKey = "loginToken";

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
          i18n.t("Login server unavailable")
        );
      }
    },
    logout({ commit }) {
      commit("removeToken");
    }
  }
};
