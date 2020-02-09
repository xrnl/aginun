<template>
  <div class="task-list py-3">
    <task-list-item v-for="task in tasks" :key="task.id" :task="task" />
  </div>
</template>

<script>
import TaskListItem from "@/components/TaskListItem";
import { mapState } from "vuex";

export default {
  name: "TaskList",
  components: {
    TaskListItem
  },
  data: () => ({}),
  computed: {
    ...mapState("tasks", ["tasks"])
  }
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/variables";

.task-list {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>
