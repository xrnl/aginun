import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import modules from "./modules";

// Learn how to create and use store modules:
// https://github.com/chrisvfritz/vue-enterprise-boilerplate/blob/master/docs/state.md#module-nesting

const store = new Vuex.Store({
  modules,
  // Enable strict mode in development to get a warning
  // when mutating state outside of a mutation.
  // https://vuex.vuejs.org/guide/strict.html
  strict: process.env.NODE_ENV !== "production",
});

export default store;
