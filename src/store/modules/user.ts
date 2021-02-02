import qs from "qs";
import axios from "axios";
import Vue from "vue";

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
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*"
        }
      };
      const params = {
        grant_type: "password",
        client_id: "volunteerplatform",
        username,
        password
      };
      let message = "";
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
      } catch ({ e }) {
        if (e) {
          if (e.response.data) message = e.response.data.error_description;
          else message = "Login server unavailable";
        } else {
          message = "Error loggin in";
        }
      }
      return message;
    },
    logout({ commit }): void {
      commit("removeToken");
    }
  }
};
