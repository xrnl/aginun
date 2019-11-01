<template>
  <div
    class="d-flex align-center py-3 separator"
    :class="themeClass"
  >
    <div class="flex-grow-1">
      Some example text
    </div>
  </div>
</template>

<script>
import styleMixin from '@/mixins/styleMixin'

  export default {
    name: "TaskListItem",
    mixins: [styleMixin],
    data: () => ({

    }),
  }
</script>

<style lang="scss" scoped>
.separator {
  border-bottom-style: solid;
  border-bottom-width: thin;
  &.theme--light {
    border-color: rgba(0,0,0,0.12);
  }
  &.theme--dark {
    border-color: rgba(255,255,255,0.12);
  }
}
</style>
