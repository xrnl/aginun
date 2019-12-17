<template>
  <div
    class="drawer"
    :style="drawerStyle"
    :class="{'active': value}"
    :value="value"
  >
    <div
      v-if="this.$vuetify.breakpoint.smAndDown"
      :style="{height: $store.state.styles.navbarHeight}"
      class="d-flex justify-space-between align-center pa-3 bottom-border"
    >
      <div class="d-flex align-center">
        <v-btn
          icon
          @click="$emit('input', false)"
        >
          <v-icon color="primary">
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <span>See positions</span>
      </div>
      <v-btn
        text
        color="primary"
      >
        Clear filters
      </v-btn>
    </div>
    <div class="pa-4">
      <div class="d-flex justify-space-between align-center">
        <span class="font-weight-bold">Position title</span>
        <v-btn
          v-if="!$vuetify.breakpoint.smAndDown"
          text
          color="primary"
        >
          Clear filters
        </v-btn>
      </div>
    </div>
    <filter-section>
      <template v-slot:title>
        Local group
      </template>
      <span>Local groups go here</span>
    </filter-section>
    <filter-section>
      <template v-slot:title>
        Working group
      </template>
      <span>Working groups go here</span>
    </filter-section>
    <filter-section>
      <template v-slot:title>
        Time commitment
      </template>
      <span>Time commitment goes here</span>
    </filter-section>
  </div>
</template>

<script>
import FilterDrawerSection from '@/components/FilterDrawerSection'

  export default {
    name: "TheFilterDrawer",
    components: {
      filterSection: FilterDrawerSection
    },
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
        let styles = {}
        if (!this.$vuetify.breakpoint.smAndDown) {
          styles.top = this.$store.state.styles.navbarHeight
          styles['max-width'] = this.width + 'px'
        }
        return styles
      }
    }
  }
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
  .theme--light &{
    background: white;
    border-color: rgba(0, 0, 0, 0.12);
  }
  .theme--dark &{
    background: #121212;
    border-color: rgba(255, 255, 255, 0.12);
  }
}

.bottom-border {
  border-bottom-style: solid;
  border-bottom-width: 1px;
  .theme--light &{
    border-color: rgba(0, 0, 0, 0.12);
  }
  .theme--dark &{
    border-color: rgba(255, 255, 255, 0.12);
  }
}
</style>
