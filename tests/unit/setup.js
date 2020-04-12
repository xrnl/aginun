/*
At the moment this code is loaded before all tests,
but it should only be loaded when testing Vue components,
and not the Vuex store or GraphQL queries.
*/
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);
