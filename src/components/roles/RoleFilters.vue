<template>
  <div>
    <div>
      <v-text-field
        :value="selectedFilters.search"
        label="Search by role title"
        placeholder="Facilitator, Writer, Photographer..."
        class="mt-3"
        @input="debounceSearchUpdate"
        clearable
      />
    </div>
    <filter-section>
      <template v-slot:title>
        Groups
      </template>
      <flex-wrapper direction="column">
        <autocomplete-custom
          :items="localGroups"
          :selected-items-ids="selectedFilters.localGroups"
          label="Local Group"
          @change="
            setFilter({ filterType: 'localGroups', filterValue: $event })
          "
        />
        <autocomplete-custom
          :items="workingCircles"
          :selected-items-ids="selectedFilters.workingCircles"
          label="Working circle"
          @change="
            setFilter({ filterType: 'workingCircles', filterValue: $event })
          "
        />
      </flex-wrapper>
    </filter-section>
    <filter-section>
      <template v-slot:title>
        Time commitment
      </template>
      <v-range-slider
        :value="selectedFilters.timeCommitment"
        :min="timeCommitmentRange.min"
        :max="timeCommitmentRange.max"
        class="mt-12"
        thumb-label="always"
        label="Time Commitment"
        @end="setFilter({ filterType: 'timeCommitment', filterValue: $event })"
      />
    </filter-section>
  </div>
</template>

<script>
import FlexWrapper from "@/components/layout/FlexWrapper.vue";
import AutocompleteCustom from "@/components/AutocompleteCustom";
import { mapState, mapGetters, mapActions } from "vuex";
import FilterDrawerSection from "../layout/FilterDrawerSection";
import debounce from "lodash/debounce";

export default {
  name: "RoleFilters",
  components: {
    filterSection: FilterDrawerSection,
    AutocompleteCustom,
    FlexWrapper,
  },
  computed: {
    ...mapState("groups", ["localGroups", "workingCircles"]),
    ...mapState("roles", ["selectedFilters"]),
    ...mapGetters("defaults", ["timeCommitmentRange"]),
  },
  beforeMount() {
    this.$store.dispatch("roles/setDefaultFilters");
  },
  methods: {
    ...mapActions("roles", ["setFilter"]),
    debounceSearchUpdate: debounce(function($event) {
      const filterValue = $event ? $event : "";
      this.setFilter({ filterType: "search", filterValue });
    }, 500),
  },
};
</script>

<style lang="scss" scoped></style>
