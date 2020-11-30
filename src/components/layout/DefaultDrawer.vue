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
        @click="$emit('close-drawer', false)"
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
  name: "DefaultDrawer"
};
</script>

<style lang="scss" scoped>
.drawer-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding: 0.5rem;
}

.theme--dark {
  .drawer-header {
    border-color: rgba(255, 255, 255, 0.12);
  }
}
.drawer-content {
  padding: 0.5rem;
}
</style>
