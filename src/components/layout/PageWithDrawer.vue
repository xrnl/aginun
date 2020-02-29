<template>
  <div>
    <div :style="containerMargin">
      <slot />
    </div>
    <div class="drawer" :style="drawerStyle" :class="{ active: isDrawerOpen }">
      <slot name="drawer" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: false,
    },
    drawerWidth: {
      type: String,
      default: "400px",
    },
  },
  computed: {
    isMobile: function() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    containerMargin: function() {
      if (this.isDrawerOpen && !this.isMobile) {
        return { marginRight: this.drawerWidth };
      }
      return {};
    },
    drawerStyle: function() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return {
          top: this.$store.state.styles.navbarHeight,
          width: this.drawerWidth,
        };
      }
      return {};
    },
  },
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
}
</style>
