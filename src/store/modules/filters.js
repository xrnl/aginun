export default {
  namespaced: true,
  state: {
    limit: 50,
    search: null,
    localGroups: null,
    workingGroups: null,
    localGroupIds: null,
    workingGroupIds: null,
    selectedTimeCommitment: [0, 40],
    timeCommitmentRange: [0, 40],
    localGroupsIdByName: {},
    workingGroupsIdByName: {},
    roleAmount: 0,
  },
  mutations: {
    update(state, { key, value }) {
      // console.log('[UPDATE]', key, value);
      if (key === 'localGroup' || key === 'workingGroup') {
        let v = null;
        if (value.length) {
          v = value.map(name => {
            return state[`${key}sIdByName`][name]
          });
        }
        state[`${key}Ids`] = v;
        state[`${key}s`] = value;
      } else if (key === 'text') {
        state.search = `%${value}%`;
      } else if (key === 'timeCommitmentRange') {
        state.timeCommitmentRange = value;
      } else if (key === 'selectedTimeCommitment') {
        state.selectedTimeCommitment = value;
      } else if (key === 'reset') {
        state.limit = 50;
        state.search = null;
        state.localGroups = null;
        state.workingGroups = null;
        state.localGroupIds = null;
        state.workingGroupIds = null;
        state.selectedTimeCommitment = [0, 40];
      } else {
        state[key] = value;
      }
      // console.log('[STATE]', state);
    },
    storeGroups(state, { groups, type }) {
      const g = groups.reduce((acc, val) => {
        acc[val.name] = val.id;
        return acc;
      }, {});
      state[`${type}sIdByName`] = g;
    },
  }
}
