import findWithIndex from "@/utils/findWithIndex";

export default {
  state: {
    tasks: [
      { id: 1, title: "task 1", completed: true, groupId: 1, sectionId: 1 },
      { id: 2, title: "task 2", completed: false, groupId: 1, sectionId: 1 },
      { id: 3, title: "task 3", completed: false, groupId: 1, sectionId: 2 },
      { id: 4, title: "task 4", completed: false, groupId: 1, sectionId: 2 }
    ]
  },
  getters: {
    tasksUncomplete: state => state.tasks.filter(task => !task.completed),
    getTask: state => id => state.tasks.find(task => task.id === id)
  },
  mutations: {
    addTask(state, { title, groupId, sectionId }) {
      // TODO: obtain new task id from db (in an action instead of mutation)
      const newId = state.tasks[state.tasks.length - 1].id + 1;
      state.tasks.push({
        id: newId,
        title: title,
        groupId: groupId,
        sectionId: sectionId
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
    setTaskSection(state, { id, sectionId }) {
      const { item: task, index } = findWithIndex(state.tasks, id);
      task.sectionId = sectionId;
      state.tasks.splice(index, 1, task);
    }
  },
  actions: {}
};
