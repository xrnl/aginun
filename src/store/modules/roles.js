import { apolloClient } from "@/plugins/vue-apollo";
import { RolesQuery } from "@/GraphQL/roles";
import throttle from "lodash/throttle";
import Vue from "vue";
import {
  CreateRoleMutation,
  UpdateRoleMutation,
  DeleteRoleMutation,
} from "../../GraphQL/roles";

export default {
  state: {
    roles: [],
    isLoadingRoles: true,
    paginationLimit: 20, // number of roles loaded at a time. More are loaded on scroll down.
    paginationOffset: 0,
    infiniteScrollIdentifier: false, // on change infinite scroll knows new roles were loaded
    selectedFilters: {},
  },
  getters: {
    getByID: state => id => state.roles.find(role => role.id == id),
    isNewQuery: state => state.paginationOffset == 0,
    isUsingFilters(state, getters, rootState, rootGetters) {
      return (
        state.selectedFilters.workingCircles.length ||
        state.selectedFilters.localGroups.length ||
        state.selectedFilters.search ||
        state.selectedFilters.timeCommitment[0] !=
          rootGetters["defaults/timeCommitmentRange"].min ||
        state.selectedFilters.timeCommitment[1] !=
          rootGetters["defaults/timeCommitmentRange"].max
      );
    },
  },
  mutations: {
    addRole(state, newRole) {
      state.roles.unshift(newRole);
    },
    deleteRole(state, roleID) {
      const roleIndex = state.roles.findIndex(role => role.id === roleID);
      if (roleIndex > -1) {
        state.roles.splice(roleIndex, 1);
      }
    },
    addRoles(state, newRoles) {
      state.roles.push.apply(state.roles, newRoles);
    },
    editRole(state, newRole) {
      const roleIndex = state.roles.findIndex(role => role.id === newRole.id);
      state.roles[roleIndex] = newRole;
    },
    setRoles(state, roles) {
      state.roles = roles;
    },
    setLoadingState(state, isLoading) {
      state.isLoadingRoles = isLoading;
    },
    reloadRoles(state) {
      state.roles = [];
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
    createRole: async function({ commit }, newRole) {
      await apolloClient.mutate({
        mutation: CreateRoleMutation,
        variables: { input: [newRole] },
        update: (
          store,
          {
            data: {
              insert_role: { returning },
            },
          }
        ) => {
          commit("addRole", returning[0]);
        },
      });
    },
    updateRole: async function({ commit }, newRole) {
      await apolloClient.mutate({
        mutation: UpdateRoleMutation,
        variables: { id: newRole.id, input: newRole },
        update: (
          store,
          {
            data: {
              update_role: { returning },
            },
          }
        ) => {
          commit("editRole", returning[0]);
        },
      });
    },
    deleteRole: async function({ commit }, roleID) {
      await apolloClient.mutate({
        mutation: DeleteRoleMutation,
        variables: { id: roleID },
        update: () => {
          commit("deleteRole", roleID);
        },
      });
    },
    loadRoles: throttle(async function(
      { state, getters, commit, rootState, rootGetters, dispatch },
      scrollState
    ) {
      commit("setLoadingState", true);
      // load group data if it doesn't exist yet. Necessary for the next block
      if (
        !rootState.groups.localGroups.length ||
        !rootState.groups.workingCircles.length
      ) {
        await dispatch("groups/loadGroups", {}, { root: true });
      }

      /*
      When no local group is selected, we search roles from all local groups. Same for working circles.
      TODO: A better solution is to have reactive queries which remove the working group or local circle `where`
      filter from the query if none have been selected.
      */
      const localGroupIds = state.selectedFilters.localGroups.length
        ? state.selectedFilters.localGroups
        : rootGetters["groups/localGroupIds"];
      const workingCircleIds = state.selectedFilters.workingCircles.length
        ? state.selectedFilters.workingCircles
        : rootGetters["groups/workingCircleIds"];

      const response = await apolloClient.query({
        query: RolesQuery,
        variables: {
          limit: state.paginationLimit,
          offset: state.paginationOffset,
          localGroupIds: localGroupIds,
          workingCircleIds: workingCircleIds,
          timeCommitmentMin: state.selectedFilters.timeCommitment[0],
          timeCommitmentMax: state.selectedFilters.timeCommitment[1],
          search: `%${state.selectedFilters.search}%`,
        },
      });

      const newRoles = response.data.roles;

      if (getters.isNewQuery) {
        commit("setRoles", newRoles);
      } else {
        commit("addRoles", newRoles);
      }

      if (newRoles.length) {
        scrollState.loaded();
        commit("nextPagination");
        if (newRoles.length < state.paginationLimit) {
          scrollState.complete();
        }
      } else {
        scrollState.complete();
      }

      commit("setLoadingState", false);
    },
    500),

    async setFilter({ commit, state, rootState, dispatch }, payload) {
      commit("setLoadingState", true);
      commit("setFilter", payload);

      // Add to the search params
      const searchParams = new URLSearchParams(window.location.search);

      if (payload.filterType == "search") {
        searchParams.set(payload.filterType, payload.filterValue);
      }

      if (payload.filterType == "localGroups") {
        console.log(rootState.groups.localGroups);
        const names = payload.filterValue.map(id => {
          return encodeURI(
            rootState.groups.localGroups.find(group => group.id == id).title
          );
        });

        searchParams.set(payload.filterType, names.join("-"));
      }

      if (payload.filterType == "workingCircles") {
        console.log(rootState.groups.workingCircles);
        const names = payload.filterValue.map(id => {
          return encodeURI(
            rootState.groups.workingCircles.find(wc => wc.id == id).title
          );
        });

        searchParams.set(payload.filterType, names.join("-"));
      }

      var newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);

      commit("reloadRoles");
    },

    async setInitialFilters({ commit, rootGetters, rootState, dispatch }) {
      commit("setLoadingState", true);

      // load group data if it doesn't exist yet. Necessary for the next block
      if (
        !rootState.groups.localGroups.length ||
        !rootState.groups.workingCircles.length
      ) {
        await dispatch("groups/loadGroups", {}, { root: true });
      }

      var searchParams = new URLSearchParams(window.location.search);
      var localGroups = searchParams.get("localGroups");
      var workingCircles = searchParams.get("workingCircles");

      function getLocalGroupIdByName(name) {
        const decoded = decodeURI(name);
        return rootState.groups.localGroups.find(
          group => group.title == decoded
        ).id;
      }

      function getWorkingCircleIdByName(name) {
        const decoded = decodeURI(name);
        const circle = rootState.groups.workingCircles.find(
          group => group.title == decoded
        );
        return circle ? circle.id : null;
      }

      commit("setFilter", {
        filterType: "search",
        filterValue: searchParams.get("search") || "",
      });
      commit("setFilter", {
        filterType: "localGroups",
        filterValue: localGroups
          ? localGroups.split("-").map(getLocalGroupIdByName)
          : [],
      });
      commit("setFilter", {
        filterType: "workingCircles",
        filterValue: workingCircles
          ? workingCircles.split("-").map(getWorkingCircleIdByName)
          : [],
      });
      commit("setFilter", {
        filterType: "timeCommitment",
        filterValue: [
          rootGetters["defaults/timeCommitmentRange"].min,
          rootGetters["defaults/timeCommitmentRange"].max,
        ],
      });

      commit("reloadRoles");
    },

    setDefaultFilters({ commit, rootGetters }) {
      commit("setFilter", {
        filterType: "search",
        filterValue: "",
      });
      commit("setFilter", {
        filterType: "localGroups",
        filterValue: [],
      });
      commit("setFilter", {
        filterType: "workingCircles",
        filterValue: [],
      });
      commit("setFilter", {
        filterType: "timeCommitment",
        filterValue: [
          rootGetters["defaults/timeCommitmentRange"].min,
          rootGetters["defaults/timeCommitmentRange"].max,
        ],
      });

      // Clear query string
      history.pushState(null, "", window.location.pathname);

      commit("reloadRoles");
    },
  },
};
