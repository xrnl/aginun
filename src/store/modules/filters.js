export default {
  namespaced: true,
  state: {
    limit: 50,
    search: null,
    localGroup: null,
    workingGroup: null,
    selectedTimeCommitment: [1, 40],
    timeCommitmentRange: [1, 40],
    localGroups: {},
    workingGroups: {},
    roleAmount: 0,
  },
  mutations: {
    updateFilter(state, { type, value }) {
      // console.log(type, value);
      if (type === 'localGroup' || type === 'workingGroup') {
        let v = null;
        if (value.length) {
          v = value.map(name => {
            return state[`${type}s`][name]
          });
        }
        console.log(type, value, v);
        state[type] = v;
      } else if (type === 'text') {
        state.search = `%${value}%`;
      } else if (type === 'timeCommitmentRange') {
        state.timeCommitmentRange = value;
      } else if (type === 'selectedTimeCommitment') {
        state.selectedTimeCommitment = value;
      } else if (type === 'reset') {
        state.limit = 50;
        state.search = null;
        state.localGroup = null;
        state.workingGroup = null;
        state.selectedTimeCommitment = [1, 40];
      }
    },
    storeGroups(state, { groups, type }) {
      const g = groups.reduce((acc, val) => {
        acc[val.name] = val.id;
        return acc;
      }, {});
      state[`${type}s`] = g;
    },
    storeData(state, { data, type }) {
      state[type] = data;
    }
  }
}
