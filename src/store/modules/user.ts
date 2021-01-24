import qs from "qs";
import axios from "axios";
import Vue from "vue";
import VueCookies from 'vue-cookies';
import store from "../../store";

Vue.use(VueCookies);

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
    setTokenCookie(state, token: string, lifetime: string) {
      if(store.state.acceptedCookies)
        Vue.$cookies.set('loginToken', token, lifetime);
    },
    removeToken(state) {
      state.token = null;
      Vue.$cookies.remove('loginToken');
    }
  },
  actions: {
    setTokenOnStart({commit}): void {
      commit("setToken", Vue.$cookies.get('loginToken'));
    },
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
        commit("setTokenCookie", res.data.access_token, res.data.expires_in);
        result = true;
      }).catch(function (e) {
        if(e.response.data)
          message = e.response.data.error_description;
        else
          message = "Login server unavailable";
      });
      return [result, message];
    },
    logout({ commit }) {//todo: doesn't need to be async?
      commit("removeToken");
    }
  }
};
