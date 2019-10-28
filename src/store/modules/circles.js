export default {
  state: {
    myCircles: [
      {idx: 1, country: 'Nederland', local: 'Amsterdam', working: 'Outreach and Training'},
      {idx: 2, country: 'Nederland', local: 'Utrecht', working: 'Media and Communications'},
      {idx: 3, country: 'Nederland', local: 'Neijmegen', working: 'Actions and Logistics'},
    ],
    idx: 1
  },
  getters: {
    selected: state => {
      return state.myCircles.find(s => s.idx === state.idx)
    },
    url: (_, getters) => {
      const circle = getters.selected
      const url = `/${circle.country}/${circle.local}/${circle.working}`
      return url.replace(/\s+/g, '-').toLowerCase();
    }
  },
  mutations: {
    updateSelected (state, newIdx) {
      state.idx = newIdx
    }
  },
  actions: {},
}
