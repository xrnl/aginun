import Vue from "vue";
import Vuex from "vuex";

import alerts from "./modules/alerts";
import roles from "./modules/roles";
import groups from "./modules/groups";
import errors from "./modules/errors";
import user from "./modules/user";

Vue.use(Vuex);

interface RootState {
  groups: Record<string, unknown>;
  alerts: Record<string, unknown>;
  roles: Record<string, unknown>;
  errors: {
    serverError: boolean;
  };
}

const store = new Vuex.Store<RootState>({
  modules: {
    groups,
    alerts,
    roles,
    errors,
    user
  },
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== "production"
});

export default store;
