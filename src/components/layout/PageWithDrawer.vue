<template>
  <div>
    <div
      class="page-background"
      :style="containerMargin"
      :class="{ 'drawer-open': isDrawerOpen }"
    >
      <img src="@/assets/images/tree.svg" :alt="$t('Tree')" />
    </div>
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
      default: false
    },
    drawerWidth: {
      type: String,
      default: "400px"
    }
  },
  computed: {
    containerMargin() {
      if (this.isDrawerOpen) {
        return { marginRight: this.drawerWidth };
      }
      return {};
    }
  }
};
</script>
<style lang="scss" scoped>
.page-background {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 0;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 600px) {
    display: none;
  }
  &.drawer-open {
    width: calc(100% - 400px);
  }
  img {
    width: 60vw;
  }
}
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
    z-index: 99;
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
