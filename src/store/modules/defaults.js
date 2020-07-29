export default {
  state: {
    timeCommitments: [
      { min: 1, max: 5 },
      { min: 6, max: 10 },
      { min: 11, max: 20 },
      { min: 21, max: 30 },
    ],
  },
  getters: {
    timeCommitmentRange(state) {
      return {
        min: state.timeCommitments[0].min,
        max: state.timeCommitments.slice(-1)[0].max,
      };
    },
  },
};
