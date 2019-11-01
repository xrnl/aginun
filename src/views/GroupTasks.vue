<template>
  <the-container>
    <task-list />
  </the-container>
</template>

<script>
import TaskList from '@/components/TaskList'
import TheContainer from '@/components/TheContainer'

  export default {
    name: "GroupTasks",
    components: {
      TaskList,
      TheContainer
    },
    data: () => ({

    }),
  }
</script>

<style lang="scss" scoped>

</style>
