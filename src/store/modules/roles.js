import { apolloClient } from "@/plugins/vue-apollo";
import RolesQuery from "@/GraphQL/roles.gql";
import Vue from "vue";

export default {
  state: {
    roles: [],
    paginationLimit: 1, // number of roles loaded at a time. More are loaded on scroll down.
    paginationOffset: 0,
    infiniteScrollIdentifier: false, // on change infinite scroll knows new roles were loaded
    selectedFilters: {},
  },
  getters: {
    getByID: state => id => state.roles.find(role => role.id == id),
  },
  mutations: {
    addRole(state, newRole) {
      state.roles.unshift(newRole);
    },
    addRoles(state, newRoles) {
      state.roles.push.apply(state.roles, newRoles);
    },
    setRoles(state, roles) {
      state.roles = roles;
    },
    resetPagination(state) {
      state.paginationOffset = 0;
      state.infiniteScrollIdentifier = !state.infiniteScrollIdentifier;
    },
    nextPagination(state) {
      state.paginationOffset += state.paginationLimit;
    },
    setFilter(state, { filterType, filterValue }) {
      Vue.set(state.selectedFilters, filterType, filterValue);
    },
  },
  actions: {
    addRole: function({ commit }, newRole) {
      // TODO: add role to backend, pass result to addRole
      commit("addRole", newRole);
    },
    async loadRoles({ state, commit }, scrollState) {
      const response = await apolloClient.query({
        query: RolesQuery,
        variables: {
          limit: state.paginationLimit,
          offset: state.paginationOffset,
        },
      });

      const newRoles = response.data.roles;

      if (newRoles.length) {
        if (state.paginationOffset == 0) {
          commit("setRoles", newRoles);
        } else {
          commit("addRoles", newRoles);
        }
        commit("nextPagination");
        scrollState.loaded();
      } else {
        scrollState.complete();
      }
    },
    setFilter({ commit }, payload) {
      commit("setFilter", payload);
      // commit("resetPagination");
    },
    setDefaultFilters({ commit, rootGetters }) {
      commit("setFilter", { filterType: "title", filterValue: "" });
      commit("setFilter", { filterType: "localGroups", filterValue: [] });
      commit("setFilter", { filterType: "workingCircles", filterValue: [] });
      commit("setFilter", {
        filterType: "timeCommitment",
        filterValue: [
          rootGetters["defaults/timeCommitmentRange"].min,
          rootGetters["defaults/timeCommitmentRange"].max,
        ],
      });
    },
  },
};
