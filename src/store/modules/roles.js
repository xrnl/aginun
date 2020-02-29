export default {
  state: {
    roles: [
      // Should find a good way to retrieve these from the server, maybe look into graphql?
      {
        id: 1,
        title: "Facilitator",
        workingGroup: { text: "Action and Logistics", value: 5 },
        localGroup: { text: "XR Zwolle", value: 19 },
        location: "Zwolle",
        timeCommitment: {
          min: 6,
          max: 10,
        },
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        requirements: "5 years of experience in sociocracy",
        email: "rogerhallam@protonmail.com",
        phone: "+31625548987",
        mattermostId: "@sweetpotatoxr",
        responsibilities: ["Do cool things", "attend meetings", "more..."],
        dueDate: "2020-06-09T14:00:00+01:00",
        publishedDate: "2020-01-09T14:00:00+01:00",
      },
      {
        id: 2,
        title: "Representative",
        workingGroup: { text: "Political Strategy", value: 3 },
        localGroup: { text: "XR Amsterdam", value: 1 },
        location: "Amsterdam",
        timeCommitment: {
          min: 6,
          max: 10,
        },
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        requirements: "5 years of experience in sociocracy",
        email: "rogerhallam@protonmail.com",
        phone: "+31625548987",
        mattermostId: "@sweetpotatoxr",
        responsibilities: ["Do cool things", "attend meetings", "more..."],
        dueDate: "2020-06-09T14:00:00+01:00",
        publishedDate: "2020-01-09T14:00:00+01:00",
      },
      {
        id: 3,
        title: "Photographer",
        workingGroup: { text: "Media and Communication", value: 1 },
        localGroup: { text: "XR NL", value: 20 },
        location: "Amsterdam",
        timeCommitment: {
          min: 1,
          max: 5,
        },
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        requirements: "5 years of experience in sociocracy",
        email: "rogerhallam@protonmail.com",
        phone: "+31625548987",
        mattermostId: "@sweetpotatoxr",
        responsibilities: ["Do cool things", "attend meetings", "more..."],
        dueDate: "2020-06-09T14:00:00+01:00",
        publishedDate: "2020-01-09T14:00:00+01:00",
      },
      {
        id: 4,
        title: "Fundraiser",
        workingGroup: { text: "Finance", value: 7 },
        localGroup: { text: "XR NL", value: 20 },
        location: "Amsterdam",
        timeCommitment: {
          min: 11,
          max: 20,
        },
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        requirements: "5 years of experience in sociocracy",
        email: "rogerhallam@protonmail.com",
        phone: "+31625548987",
        mattermostId: "@sweetpotatoxr",
        responsibilities: ["Do cool things", "attend meetings", "more..."],
        dueDate: "2020-06-09T14:00:00+01:00",
        publishedDate: "2020-01-09T14:00:00+01:00",
      },
      {
        id: 5,
        title: "Lawyer",
        workingGroup: { text: "Legal", value: 9 },
        localGroup: { text: "XR NL", value: 20 },
        location: "Amsterdam",
        timeCommitment: {
          min: 21,
          max: 30,
        },
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        requirements: "5 years of experience in sociocracy",
        email: "rogerhallam@protonmail.com",
        phone: "+31625548987",
        mattermostId: "@sweetpotatoxr",
        responsibilities: ["Do cool things", "attend meetings", "more..."],
        dueDate: "2020-06-09T14:00:00+01:00",
        publishedDate: "2020-01-09T14:00:00+01:00",
      },
      {
        id: 6,
        title: "Action coordinator",
        workingGroup: { text: "Action and Logistics", value: 5 },
        localGroup: { text: "XR Den Haag", value: 6 },
        location: "Den Haag",
        timeCommitment: {
          min: 6,
          max: 10,
        },
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        requirements: "5 years of experience in sociocracy",
        email: "rogerhallam@protonmail.com",
        phone: "+31625548987",
        mattermostId: "@sweetpotatoxr",
        responsibilities: ["Do cool things", "attend meetings", "more..."],
        dueDate: "2020-06-09T14:00:00+01:00",
        publishedDate: "2020-01-09T14:00:00+01:00",
      },
    ],
    timeCommitment: { min: 1, max: 30 },
  },
  getters: {
    getByFilters: state => ({ text, workingGroup, localGroup }) => {
      // need to make this more resilient and generic, this will get out of hand quickly, but ok for testing
      return state.roles.filter(role => {
        if (
          text !== "" &&
          !role.title.toLowerCase().includes(text.toLowerCase())
        ) {
          return false;
        }
        if (
          workingGroup.length > 0 &&
          !workingGroup.includes(role.workingGroup.value)
        ) {
          return false;
        }
        if (
          localGroup.length > 0 &&
          !localGroup.includes(role.localGroup.value)
        ) {
          return false;
        }
        return true;
      });
    },
    getByID: state => id => state.roles.find(role => role.id == id),
    lastId: state => state.roles.slice(-1)[0].id,
  },
  mutations: {
    addRole: function(state, newRole) {
      state.roles.push(newRole);
    },
  },
  actions: {
    addRole: function(context, newRole) {
      newRole.id = context.getters.lastId + 1;
      context.commit("addRole", newRole);
    },
  },
};
