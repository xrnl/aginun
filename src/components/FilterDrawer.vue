<template>
  <div class="drawer" :style="drawerStyle" :class="{ active: value }" :value="value">
    <div
      v-if="this.$vuetify.breakpoint.smAndDown"
      :style="{ height: $store.state.styles.navbarHeight }"
      class="d-flex justify-space-between align-center pa-3 bottom-border"
    >
      <div class="d-flex align-center">
        <v-btn icon @click="$emit('input', false)">
          <v-icon color="primary">mdi-arrow-left</v-icon>
        </v-btn>
        <span>
          <strong class="primary--text">{{ roleAmount }}</strong>
          positions found
        </span>
      </div>
      <v-btn text color="primary">Clear filters</v-btn>
    </div>
    <div class="px-4 py-5 pb-0">
      <div class="d-flex justify-space-between align-center">
        <span class="font-weight-bold">Search positions</span>
        <v-btn v-if="!$vuetify.breakpoint.smAndDown" text color="primary">Clear filters</v-btn>
      </div>
      <v-text-field
        :value="selectedFilters.text"
        label="Facilitator, Writer, Photographer..."
        class="mt-3"
        @input="value => onSetFilter(value, 'text')"
      />
    </div>
    <filter-section>
      <template v-slot:title>Groups</template>
      <flex-wrapper direction="column">
        <autocomplete-custom
          :value="selectedFilters.localGroup"
          :items="localGroups"
          label="Local Group"
          @change="id => onSetFilter(id, 'localGroup')"
        />
        <autocomplete-custom
          :value="selectedFilters.workingGroup"
          :items="workingGroups"
          label="Working Group"
          @change="id => onSetFilter(id, 'workingGroup')"
        />
      </flex-wrapper>
    </filter-section>
    <filter-section>
      <template v-slot:title>Time commitment</template>
      <v-range-slider
        v-model="timeRange"
        :min="timeCommitment.min"
        :max="timeCommitment.max"
        class="mt-12"
        thumb-label="always"
        label="Time Commitment"
      />
    </filter-section>
  </div>
</template>

<script>
import FlexWrapper from "@/components/layout/FlexWrapper.vue";
import AutocompleteCustom from "@/components/AutocompleteCustom";
import { mapState, mapGetters, mapMutations } from "vuex";
import FilterDrawerSection from "./layout/FilterDrawerSection";
import gql from "graphql-tag";

export default {
  name: "TheFilterDrawer",
  components: {
    filterSection: FilterDrawerSection,
    AutocompleteCustom,
    FlexWrapper
  },
  props: {
    value: {
      required: true,
      validator: value => typeof value === "boolean" || value === null
    },
    selectedFilters: {
      type: Object,
      required: true
    },
    roleAmount: { type: Number, default: 0 },
    onSetFilter: { required: true, type: Function },
    width: {
      required: true,
      type: Number,
      default: 400
    }
  },
  data: () => ({
    timeRange: [1, 30]
  }),
  apollo: {
    localGroups: {
      query: gql`
        query {
          local_group {
            id
            name
          }
        }
      `,
      update: data => data.local_group.map(lg => lg.name)
    }
  },
  computed: {
    ...mapState("roles", ["timeCommitment"]),
    ...mapState("workingGroups", ["workingGroups"]),
    drawerStyle: function() {
      let styles = {};
      if (!this.$vuetify.breakpoint.smAndDown) {
        styles.top = this.$store.state.styles.navbarHeight;
        styles["max-width"] = this.width + "px";
      }
      return styles;
    }
  }
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
