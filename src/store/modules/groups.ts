import { apolloClient } from "@/plugins/vue-apollo";
import gql from "graphql-tag";

export interface GroupsState {
  localGroups: unknown[];
  workingCircles: unknown[];
}

export default {
  namespaced: true,
  state: {
    localGroups: [],
    workingCircles: []
  },
  getters: {
    localGroupIds: (state) => state.localGroups.map((g) => g.id),
    workingCircleIds: (state) => state.workingCircles.map((g) => g.id),
    localGroupsMap: (state) =>
      state.localGroups.reduce((result, group) => {
        const { id, ...details } = group;
        result[id] = details;

        return result;
      }, {}),
    workingCirclesMap: (state) =>
      state.workingCircles.reduce((result, group) => {
        const { id, ...details } = group;
        result[id] = details;

        return result;
      }, {})
  },
  mutations: {
    setLocalGroups(state, localGroups) {
      state.localGroups = localGroups;
    },
    setWorkingCircles(state, workingCircles) {
      state.workingCircles = workingCircles;
    }
  },
  actions: {
    async loadGroups({ commit }) {
      const { data } = await apolloClient.query({
        query: gql`
          query GroupsQuery {
            workingCircles(order_by: { title: asc }) {
              id
              title
              colour
            }
            localGroups(order_by: { title: asc }) {
              id
              title
            }
          }
        `
      });

      commit("setLocalGroups", data.localGroups);
      commit("setWorkingCircles", data.workingCircles);
    }
  }
};
