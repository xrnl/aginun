<template>
  <div class="d-flex">
    <v-btn
      class="flex-grow-1 justify-start px-2 mx-5 mb-2 mr-5"
      color="base"
      outlined
      @click="$emit('click')"
    >
      <v-icon class="mr-8">
        <slot name="icon" />
      </v-icon>
      <slot />
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: "ButtonIcon",
  };
</script>
