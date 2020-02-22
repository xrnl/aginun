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
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  border-left-style: solid;
  border-left-width: 1px;
  z-index: 16;
  transition: transform 0.3s ease-out;
  overflow-y: auto;
  transform: translateX(100%);
  &.active {
    transform: translateX(0);
  }
  .theme--light & {
    background: white;
    border-color: rgba(0, 0, 0, 0.12);
  }
  .theme--dark & {
    background: #121212;
    border-color: rgba(255, 255, 255, 0.12);
  }

  .drawer-header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
    padding: 0.5rem;
  }
  .drawer-content {
    padding: 0.5rem;
  }
}

.bottom-border {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  .theme--light & {
    border-color: rgba(0, 0, 0, 0.12);
  }
  .theme--dark & {
    border-color: rgba(255, 255, 255, 0.12);
  }
}
</style>
