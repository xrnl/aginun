export default {
  state: {
    myCircles: [
      {id: 1, country: 'Nederland', local: 'Amsterdam', working: 'Outreach and Training'},
      {id: 2, country: 'Nederland', local: 'Utrecht', working: 'Media and Communications'},
      {id: 3, country: 'Nederland', local: 'Neijmegen', working: 'Arts'},
    ],
    idSelected: 1
  },
  getters: {
    selected: state => {
      return state.myCircles.find(s => s.id === state.idSelected)
    },
    url: (state, getters) => (id) => {
      const circle = state.myCircles.find(s => s.id === id)
      const url = `/${circle.country}/${circle.local}/${circle.working}`
      return url.replace(/\s+/g, '-').toLowerCase();
    }
  },
  mutations: {
    updateSelected (state, id) {
      state.idSelected = id
    }
  },
  actions: {},
}
