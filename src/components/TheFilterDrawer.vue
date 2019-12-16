<template>
  <div
    class="drawer"
    :style="drawerStyle"
    :class="{'theme--dark': $vuetify.theme.dark, 'theme--light': !$vuetify.theme.dark}"
    :value="value"
    @input="$emit('input', $event)"
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
    <div class="d-flex justify-space-between pa-4">
      <p>search</p>
      <v-btn
        text
        color="primary"
      >
        Clear filters
      </v-btn>
    </div>

    <v-list-group>
      <template v-slot:activator>
        <v-list-item-title>Working group</v-list-item-title>
      </template>
      <v-list-item>
        <span>Working groups go here</span>
      </v-list-item>
    </v-list-group>
    <v-divider />
    <v-list-group>
      <template v-slot:activator>
        <v-list-item-title>Time commitment</v-list-item-title>
      </template>
      <v-list-item>
        <span>Time commitment goes here</span>
      </v-list-item>
    </v-list-group>
  </div>
</template>

<script>
  export default {
    name: "TheFilterDrawer",
    components: {
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
        if (this.$vuetify.breakpoint.smAndDown) {
          styles.top = 0
          styles['max-width'] = 'auto'
        }
        else {
          styles.top = this.$store.state.styles.navbarHeight
          styles['max-width'] = this.width + 'px'

        }
        styles.width = this.value ? '100%' : '0%'
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
  z-index: 16;
  &.theme--light {
    background: white;
    border-color: rgba(0, 0, 0, 0.12);
  }
  &.theme--dark {
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
