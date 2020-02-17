<template>
  <wide-container>
    <task-list />
  </wide-container>
</template>

<script>
  import TaskList from "@/components/TaskList";
  import WideContainer from "@/components/WideContainer";

  export default {
    name: "GroupTasks",
    components: {
      TaskList,
      WideContainer,
    },
    data: () => ({}),
  };
</script>

<style lang="scss" scoped></style>
