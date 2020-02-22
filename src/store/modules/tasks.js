import findWithIndex from "@/utils/findWithIndex";

export default {
  state: {
    tasks: [
      {
        id: 1,
        title: "Make posters for an upcoming action",
        completed: true,
        // TEMP: same with roles, everything will be done on the serverside, just here for demo purposes
        workingGroup: { text: "Political Strategy", value: 3 },
        localGroup: { text: "XR Amsterdam", value: 1 },
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        timeCommitment: {
          min: 6,
          max: 10,
        },
      },
      {
        id: 2,
        title: "We need a photographer!",
        completed: false,
        workingGroup: { text: "Finance", value: 7 },
        localGroup: { text: "XR NL", value: 20 },
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        timeCommitment: {
          min: 1,
          max: 5,
        },
      },
      {
        id: 3,
        title:
          "Can someone help me bake a cake? (it's for an action, i promise)",
        completed: false,
        workingGroup: { text: "Action and Logistics", value: 5 },
        localGroup: { text: "XR Den Haag", value: 6 },
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        timeCommitment: {
          min: 11,
          max: 20,
        },
      },
      {
        id: 4,
        title: "Give a talk at this cool location.",
        completed: false,
        workingGroup: { text: "Action and Logistics", value: 5 },
        localGroup: { text: "XR Zwolle", value: 19 },
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        timeCommitment: {
          min: 21,
          max: 30,
        },
      },
    ],
  },
  getters: {
    getByFilters: state => ({ text, workingGroup, localGroup }) => {
      // need to make this more resilient and generic, this will get out of hand quickly, but ok for testing
      return state.tasks.filter(task => {
        if (
          text !== "" &&
          !task.title.toLowerCase().includes(text.toLowerCase())
        ) {
          return false;
        }
        if (
          workingGroup.length > 0 &&
          !workingGroup.includes(task.workingGroup.value)
        ) {
          return false;
        }
        if (
          localGroup.length > 0 &&
          !localGroup.includes(task.localGroup.value)
        ) {
          return false;
        }
        return true;
      });
    },
    getByID: state => id => state.tasks.find(task => task.id == id),
  },
  mutations: {
    addTask(state, { title, groupId }) {
      // TODO: obtain new task id from db (in an action instead of mutation)
      const newId = state.tasks[state.tasks.length - 1].id + 1;
      state.tasks.push({
        id: newId,
        title: title,
        groupId: groupId,
      });
    },
    deleteTask(state, id) {
      const { index } = findWithIndex(state.tasks, id);
      state.tasks.splice(index, 1);
    },
    toggleTask(state, id) {
      const { item: task, index } = findWithIndex(state.tasks, id);
      task.completed = !task.completed;
      state.tasks.splice(index, 1, task);
    },
    setTaskTitle(state, { id, title }) {
      const { item: task, index } = findWithIndex(state.tasks, id);
      task.title = title;
      state.tasks.splice(index, 1, task);
    },
  },
  actions: {},
};
