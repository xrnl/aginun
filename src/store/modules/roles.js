import gql from "graphql-tag";
import { apolloClient } from "@/plugins/vue-apollo";
import roleFields from "@/GraphQL/fragments.gql";

export default {
  state: {
    roles: [],
    timeCommitment: { min: 1, max: 30 },
    loading: true,
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
    addRole: function(state, newRole) {
      state.roles.push(newRole);
    },
    setRoles(state, roles) {
      state.roles = roles;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    addRole: function(context, newRole) {
      newRole.id = context.getters.lastId + 1;
      context.commit("addRole", newRole);
    },
    async test({ commit }) {
      commit("setLoading", true);
      const response = await apolloClient.query({
        query: gql`
          query roles {
            roles(order_by: { createdDate: desc }) {
              ...roleFields
            }
          }
          ${roleFields}
        `,
      });
      commit("setRoles", response.data.roles);
      commit("setLoading", false);
    },
  },
};
