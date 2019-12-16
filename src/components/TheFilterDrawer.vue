<template>
  <div
    class="drawer"
    :style="drawerStyle"
    :class="{'theme--dark': $vuetify.theme.dark, 'theme--light': !$vuetify.theme.dark}"
    :value="value"
    @input="$emit('input', $event)"
  >
    <p>search</p>
    <p>local group filter</p>
    <p>working group filter</p>
    <p>time commitment</p>
  </div>
</template>

<script>
  export default {
    name: "TheFilterDrawer",
    props: {
      value: {
        required: true,
        validator: value => typeof value === "boolean" || value === null
      },
      width: {
        required: true,
        type: Number,
        default: 400
      }
    },
    data: () => ({

    }),
    computed: {
      drawerStyle: function () {
        let styles = {top: this.$store.state.styles.navbarHeight + 'px'}
        if (this.value){
          styles.width = this.width + 'px'
        }
        else {return {'width': '0px'}}
        return styles
      }
    }
  }
</script>

<style lang="scss" scoped>
.drawer {
  height: 100%;
  position: fixed;
  right: 0;
  border-left-style: solid;
  border-left-width: 1px;
  &.theme--light {
    background: white;
    border-color: rgba(0, 0, 0, 0.12);
  }
  &.theme--dark {
    background: #121212;
    border-color: rgba(255, 255, 255, 0.12);
  }
}
</style>
