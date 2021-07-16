import Vue from "vue";
import Vuex from "vuex";
import alerts from "./modules/alerts";
import roles from "./modules/roles";
import groups from "./modules/groups";
import errors from "./modules/errors";
import user from "./modules/user";
import { UserState } from "./modules/user";
import { RolesState } from "./modules/roles";

Vue.use(Vuex);

export interface RootState {
  groups: Record<string, unknown>;
  alerts: Record<string, unknown>;
  roles: RolesState;
  errors: {
    serverError: boolean;
  };
  user: UserState;
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
