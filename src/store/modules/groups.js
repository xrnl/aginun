export default {
  state: {
    myGroups: [
      {
        id: 1,
        country: "Nederland",
        local: "Amsterdam",
        working: "Outreach and Training",
      },
      {
        id: 2,
        country: "Nederland",
        local: "Utrecht",
        working: "Media and Communications",
      },
      { id: 3, country: "Nederland", local: "Neijmegen", working: "Arts" },
    ],
    idSelected: 1,
  },
  getters: {
    selected: state => {
      return state.myGroups.find(s => s.id === state.idSelected);
    },
    notSelected: state => {
      return state.myGroups.filter(s => s.id !== state.idSelected);
    },
    hasGroups: state => {
      return state.myGroups.length > 0;
    },
    url: (state, getters) => id => {
      const group = state.myGroups.find(s => s.id === id);
      const url = `/${group.country}/${group.local}/${group.working}`;
      return url.replace(/\s+/g, "-").toLowerCase();
    },
  },
  mutations: {
    updateSelected(state, id) {
      state.idSelected = id;
    },
    removeGroup(state) {
      // just for testing purposes.
      state.myGroups.pop();
    },
  },
  actions: {},
};
