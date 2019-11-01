<template>
  <div>
    <task-list-item />
    <task-list-item />
  </div>
</template>

<script>
import TaskListItem from '@/components/TaskListItem'

  export default {
    name: "TaskList",
    components: {
      TaskListItem
    },
    data: () => ({

    }),
  }
</script>

<style lang="scss" scoped>

</style>
