import Vue from "vue";
import Vuex from "vuex";
import alerts from "./modules/alerts";
import defaults from "./modules/defaults";
import roles from "./modules/roles";
import { state as styleState } from "./modules/styles";
import groups from "./modules/groups";

Vue.use(Vuex);

// import modules from "./modules";

// Learn how to create and use store modules:
// https://github.com/chrisvfritz/vue-enterprise-boilerplate/blob/master/docs/state.md#module-nesting

const store = new Vuex.Store({
  modules: {
    defaults,
    groups,
    alerts,
    roles,
    styles: {
      state: styleState,
    },
  },
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== "production",
});

export default store;
