export default {
  state: {
    //   Will put all of these on a server somewhere with actual id's
    localGroups: [
      { text: "XR Amsterdam", value: 1 },
      { text: "XR Arnhem/Nijmegen", value: 2 },
      { text: "XR Brabant", value: 3 },
      { text: "XR Castricum", value: 4 },
      { text: "XR Delft", value: 5 },
      { text: "XR Den Haag", value: 6 },
      { text: "XR Deventer", value: 7 },
      { text: "XR Enschede", value: 8 },
      { text: "XR Groningen", value: 9 },
      { text: "XR Haarlem", value: 10 },
      { text: "XR Leeuwarden/Fryslân", value: 11 },
      { text: "XR Leiden", value: 12 },
      { text: "XR Maastricht", value: 13 },
      { text: "XR Rotterdam", value: 14 },
      { text: "XR Utrecht", value: 15 },
      { text: "XR Wageningen", value: 16 },
      { text: "XR Ysselvallei", value: 17 },
      { text: "XR Zaandam", value: 18 },
      { text: "XR Zwolle", value: 19 },
      { text: "XR NL", value: 20 }
    ]
  },
  getters: {
    filteredGroups: (state, text) => {
      const regex = RegExp(text, "i");
      return state.localGroups.filter(group => regex.test(group.text));
    },
    getByID: state => id => state.localGroups.find(group => group.id === id)
  }
};
