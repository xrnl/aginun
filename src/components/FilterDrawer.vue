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
        <span><span class="primary--text font-weight-bold">{{ nPositions }}</span> positions found</span>
      </div>
      <v-btn
        text
        color="primary"
      >
        Clear filters
      </v-btn>
    </div>
    <div class="px-4 py-5 pb-0">
      <div class="d-flex justify-space-between align-center">
        <span class="font-weight-bold">Search positions</span>
        <v-btn
          v-if="!$vuetify.breakpoint.smAndDown"
          text
          color="primary"
        >
          Clear filters
        </v-btn>
      </div>
      <v-text-field
        v-model="filteredRoleTitle"
        label="Facilitator, Writer, Photographer..."
        solo
        class="mt-3"
        @keydown.enter="searchRole(filteredRoleTitle)"
        @blur="searchRole(filteredRoleTitle)"
      />
    </div>
    <filter-section>
      <template v-slot:title>
        Local group
      </template>
      <autocomplete-custom
        v-model="selectedLocalGroups"
        :items="localGroups"
        chips
        small-chips
        multiple
        solo
        class="mt-3"
      />
    </filter-section>
    <filter-section>
      <template v-slot:title>
        Working group
      </template>
      <autocomplete-custom
        v-model="selectedWorkingGroups"
        :items="workingGroups"
        chips
        small-chips
        multiple
        solo
        class="mt-3"
      />
    </filter-section>
    <filter-section>
      <template v-slot:title>
        Time commitment
      </template>
      <v-range-slider
        v-model="timeRange"
        :min="timeCommitment.min"
        :max="timeCommitment.max"
        class="mt-12"
        thumb-label="always"
      />
    </filter-section>
  </div>
</template>

<script>
import FilterDrawerSection from '@/components/FilterDrawerSection'
import AutocompleteCustom from '@/components/AutocompleteCustom'
import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {
    name: "TheFilterDrawer",
    components: {
      filterSection: FilterDrawerSection,
      AutocompleteCustom
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
      filteredRoleTitle: '',
      selectedLocalGroups: [],
      selectedWorkingGroups: [],
      timeRange: [1, 30]
    }),
    computed: {
      ...mapState('roles', ['localGroups', 'workingGroups', 'timeCommitment']),
      ...mapGetters('roles', ['nPositions']),
      drawerStyle: function () {
        let styles = {}
        if (!this.$vuetify.breakpoint.smAndDown) {
          styles.top = this.$store.state.styles.navbarHeight
          styles['max-width'] = this.width + 'px'
        }
        return styles
      }
    },
    methods: {
      ...mapMutations('roles', ['searchRole'])
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
