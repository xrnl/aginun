<template>
  <div class="d-flex">
    <v-btn
      class="flex-grow-1 justify-start px-2 mx-5 mb-2 mr-5"
      color="base"
      outlined
      @click="$emit('click')"
    >
      <v-icon class="mr-8">
        mdi-plus
      </v-icon>
      Add circle
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: "ButtonAddGroup",
    data: () => ({

    }),
  }
</script>

<style lang="scss" scoped>

</style>
