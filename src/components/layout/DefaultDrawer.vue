<template>
  <div>
    <div
      v-if="
        (!!$slots.header && !!$slots.header[0]) ||
          this.$vuetify.breakpoint.smAndDown
      "
      class="drawer-header"
    >
      <slot name="header" />
    </div>
    <div class="drawer-content">
      <slot />
      <v-btn
        v-if="this.$vuetify.breakpoint.smAndDown"
        fab
        class="drawer-content__button-back"
        color="primary"
        @click="$emit('close-drawer', false)"
      >
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultDrawer"
};
</script>

<style lang="scss" scoped>
.drawer-header,
.drawer-content {
  padding: 0.75rem;
  @media (min-width: $breakpoint-sm) {
    padding: 1rem;
  }
}

.drawer-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.drawer-content {
  &__button-back {
    margin-top: $distance-sm;
  }
}
</style>
