export default {
  state: {
    //   Will put all of these on a server somewhere with actual id's
    workingGroups: [
      { text: "Media and Communication", value: 1 },
      { text: "Outreach and Training", value: 2 },
      { text: "Political Strategy", value: 3 },
      { text: "Regenerative Culture", value: 4 },
      { text: "Action and Logistics", value: 5 },
      { text: "Arts", value: 6 },
      { text: "Finance", value: 7 },
      { text: "Tech", value: 8 },
      { text: "Legal", value: 9 }
    ]
  },
  getters: {
    filteredGroups: (state, text) => {
      const regex = RegExp(text, "i");
      return state.workingGroups.filter(group => regex.test(group.text));
    },
    getByID: (state, id) => state.workingGroups.find(group => group.id === id)
  }
};
