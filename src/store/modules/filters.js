export default {
  namespaced: true,
  state: {
    limit: 50,
    search: null,
    localGroup: null,
    workingGroup: null,
    timeCommitmentMin: 0,
    timeCommitmentMax: Number.MAX_SAFE_INTEGER,
    localGroups: {},
    workingGroups: {},
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
        state[type] = v;
      } else if (type === 'text') {
        state.search = `%${value}%`;
      } else if (type === 'timeCommitment') {
        state.timeCommitmentMin = value[0];
        state.timeCommitmentMax = value[1];
      } else if (type === 'reset') {
        state.limit = 50;
        state.search = null;
        state.localGroup = null;
        state.workingGroup = null;
        state.timeCommitmentMin = 0;
        state.timeCommitmentMax = Number.MAX_SAFE_INTEGER;
      }
    },
    storeGroups(state, { groups, type }) {
      const g = groups.reduce((acc, val) => {
        acc[val.name] = val.id;
        return acc;
      }, {});
      state[`${type}s`] = g;
    },
  }
}
