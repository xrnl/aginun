import { apolloClient } from "@/plugins/vue-apollo";
import RolesQuery from "@/GraphQL/roles.gql";

export default {
  state: {
    roles: [],
    timeCommitment: { min: 1, max: 30 },
    paginationLimit: 1, // number of roles loaded at a time. More are loaded on scroll down.
    paginationOffset: 0,
    infiniteScrollIdentifier: false, // on change infinite scroll knows new roles were loaded
  },
  getters: {
    getByFilters: state => ({ text, workingCircle, localGroup }) => {
      // need to make this more resilient and generic, this will get out of hand quickly, but ok for testing
      return state.roles.filter(role => {
        if (
          text !== "" &&
          !role.title.toLowerCase().includes(text.toLowerCase())
        ) {
          return false;
        }
        if (
          workingCircle.length > 0 &&
          !workingCircle.includes(role.workingCircle.value)
        ) {
          return false;
        }
        if (
          localGroup.length > 0 &&
          !localGroup.includes(role.localGroup.value)
        ) {
          return false;
        }
        return true;
      });
    },
    getByID: state => id => state.roles.find(role => role.id == id),
    lastId: state => state.roles.slice(-1)[0].id,
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
      // called whenever a new filter is applied
      state.paginationOffset = 0;
      state.infiniteScrollIdentifier = !state.infiniteScrollIdentifier;
    },
    nextPagination(state) {
      state.paginationOffset += state.paginationLimit;
    },
  },
  actions: {
    addRole: function(context, newRole) {
      newRole.id = context.getters.lastId + 1;
      context.commit("addRole", newRole);
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
  },
};
