import Vue from "vue";
import Vuex, {mapActions, mapMutations} from "vuex";

import alerts from "./modules/alerts";
import roles from "./modules/roles";
import groups from "./modules/groups";
import errors from "./modules/errors";
import user from "./modules/user";
import VueCookies from "vue-cookies";

Vue.use(Vuex);
Vue.use(VueCookies);

interface RootState {
  groups: Record<string, unknown>;
  alerts: Record<string, unknown>;
  roles: Record<string, unknown>;
  errors: {
    serverError: boolean;
  };
  user: Record<string, unknown>;
}

const store = new Vuex.Store<RootState>({
  modules: {
    groups,
    alerts,
    roles,
    errors,
    user,
  },
  state: {
    acceptedCookies: true,//todo: set to false
    //todo: initialize
  },
  mutations: {
    acceptCookies(state) {
      state.acceptedCookies = true;
      //todo:save user token if logged in
    }
  },
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== "production"
});
if(Vue.$cookies.isKey('loginToken')) {
  store.commit("acceptCookies");
  store.dispatch("user/setTokenOnStart");
}

export default store;
