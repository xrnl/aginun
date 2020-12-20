<template>
  <div>
    <div>
      <v-text-field
        :value="selectedFilters.search"
        :label="$t('Search by role title')"
        :placeholder="$t('Facilitator, Writer, Photographer...')"
        class="mt-3"
        clearable
        @input="debounceSearchUpdate"
      />
    </div>
    <filter-section>
      <template v-slot:title>
        {{ $t("Groups") }}
      </template>
      <flex-wrapper direction="column">
        <autocomplete-custom
          :items="localGroups"
          :selected-items-ids="selectedFilters.localGroups"
          :label="$t('Local Group')"
          @change="
            setFilter({ filterType: 'localGroups', filterValue: $event })
          "
        />
        <autocomplete-custom
          :items="workingCircles"
          :selected-items-ids="selectedFilters.workingCircles"
          :label="$t('Working circle')"
          @change="
            setFilter({ filterType: 'workingCircles', filterValue: $event })
          "
        />
      </flex-wrapper>
    </filter-section>
    <filter-section>
      <template v-slot:title>
        {{ $t("Time commitment") }}
      </template>
      <v-range-slider
        :value="selectedFilters.timeCommitment"
        :min="timeCommitmentRange.min"
        :max="timeCommitmentRange.max"
        class="mt-12"
        thumb-label="always"
        :label="$t('Time Commitment')"
        @end="setFilter({ filterType: 'timeCommitment', filterValue: $event })"
      />
    </filter-section>
  </div>
</template>

<script>
import FlexWrapper from "@/components/layout/FlexWrapper.vue";
import AutocompleteCustom from "@/components/AutocompleteCustom.vue";
import { mapState, mapActions } from "vuex";
import debounce from "lodash/debounce";
import { timeCommitmentRange } from "@/constants/timeCommitments";
import FilterDrawerSection from "../layout/FilterDrawerSection.vue";

export default {
  name: "RoleFilters",
  components: {
    filterSection: FilterDrawerSection,
    AutocompleteCustom,
    FlexWrapper
  },
  data: () => ({
    timeCommitmentRange
  }),
  computed: {
    ...mapState("groups", ["localGroups", "workingCircles"]),
    ...mapState("roles", ["selectedFilters"])
  },
  beforeMount() {
    this.$store.dispatch("roles/setDefaultFilters");
  },
  methods: {
    ...mapActions("roles", ["setFilter"]),
    debounceSearchUpdate: debounce(function($event) {
      const filterValue = $event || "";
      this.setFilter({ filterType: "search", filterValue });
    }, 500)
  }
};
</script>

<style lang="scss" scoped></style>
