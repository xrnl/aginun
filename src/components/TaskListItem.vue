<template>
  <div class="d-flex align-center py-3 separator" :class="themeClass">
    <v-checkbox
      :input-value="task.completed"
      color="primary"
      class="m-0 p-0"
      @change="toggleTask(task.id)"
    />
    <div class="flex-grow-1">
      {{ task.title }}
    </div>
  </div>
</template>

<script>
  import { mapMutations } from "vuex";
  import styleMixin from "@/mixins/styleMixin";
  import has from "lodash/has";

  export default {
    name: "TaskListItem",
    mixins: [styleMixin],
    props: {
      task: {
        type: Object,
        required: true,
        validator: function(obj) {
          return (
            has(obj, "id") &&
            Number.isInteger(obj.id) &&
            has(obj, "title") &&
            typeof obj.title === "string" &&
            has(obj, "completed") &&
            typeof obj.completed === "boolean"
          );
        },
      },
    },
    methods: {
      ...mapMutations("tasks", ["toggleTask", "deleteTask"]),
    },
  };
</script>

<style lang="scss" scoped>
  .separator {
    border-bottom-style: solid;
    border-bottom-width: thin;
    &.theme--light {
      border-color: rgba(0, 0, 0, 0.12);
    }
    &.theme--dark {
      border-color: rgba(255, 255, 255, 0.12);
    }
  }
</style>
