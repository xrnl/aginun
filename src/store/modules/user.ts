import i18n from "@/i18n/i18n";
import axios from "axios";
import qs from "qs";
import Vue from "vue";
import jwtDecode from "jwt-decode";

export const loginCookieKey = "loginToken";

export interface UserState {
  token: string;
  userId: string;
}

export default {
  namespaced: true,
  state: {
    token: "",
    userId: ""
  },
  getters: {
    loggedIn: (state) => !!state.token
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id;
    },
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
      const accesToken = Vue.$cookies.get(loginCookieKey);
      commit("setToken", accesToken);
      const userData: any = jwtDecode(accesToken);
      commit("setUserId", userData.sub);
    },
    async login({ commit, dispatch }, { username, password }) {
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
        password,
        scope: "openid"
      };

      try {
        const { data } = await axios.post(
          process.env.VUE_APP_KEYSERVER_URL || "",
          qs.stringify(params),
          config
        );
        const decodedJWT: any = jwtDecode(data.access_token);
        commit("setUserId", decodedJWT.sub);
        commit("setToken", data.access_token);
        commit("setTokenCookie", {
          token: data.access_token,
          lifetime: data.expires_in
        });
        dispatch("alerts/displaySuccess", i18n.t("Logged in"), { root: true });
      } catch ({ response }) {
        return (
          (response?.data?.error_description as string) ||
          i18n.t("Login server unavailable")
        );
      }
    },
    logout({ commit, dispatch }) {
      commit("removeToken");
      dispatch("alerts/displaySuccess", i18n.t("Logged out"), { root: true });
    }
  }
};
