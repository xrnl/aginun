import { apolloClient } from "@/plugins/vue-apollo";
import gql from "graphql-tag";

export default {
  state: {
    localGroups: [],
    workingCircles: [],
  },
  getters: {
    localGroupIds: state => state.localGroups.map(g => g.id),
    workingCircleIds: state => state.workingCircles.map(g => g.id),
  },
  mutations: {
    setLocalGroups(state, localGroups) {
      state.localGroups = localGroups;
    },
    setWorkingCircles(state, workingCircles) {
      state.workingCircles = workingCircles;
    },
  },
  actions: {
    async loadGroups({ commit }) {
      const response = await apolloClient.query({
        query: gql`
          query GroupsQuery {
            workingCircles(order_by: { title: asc }) {
              id
              title
            }
            localGroups(order_by: { title: asc }) {
              id
              title
            }
          }
        `,
      });
      commit("setLocalGroups", response.data.localGroups);
      commit("setWorkingCircles", response.data.workingCircles);
    },
  },
};
