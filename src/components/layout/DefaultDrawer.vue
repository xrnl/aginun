<template>
  <div>
    <div
      v-if="
        (!!$slots.header && !!$slots.header[0]) ||
          this.$vuetify.breakpoint.smAndDown
      "
      class="drawer-header"
    >
      <v-btn
        v-if="this.$vuetify.breakpoint.smAndDown"
        icon
        @click="$emit('input', false)"
      >
        <v-icon color="primary">
          mdi-arrow-left
        </v-icon>
      </v-btn>
      <slot name="header" />
    </div>
    <div class="drawer-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultDrawer",
};
</script>

<style lang="scss" scoped>
.drawer-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: 0.5rem;
}
.drawer-content {
  padding: 0.5rem;
}
</style>
