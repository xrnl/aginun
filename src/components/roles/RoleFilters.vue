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
          ref="localGroupsFilter"
          :items="localGroups"
          :selected-items-ids="selectedFilters.localGroups"
          :label="$t('Local Group')"
          @change="changeFilter('localGroups', $event)"
        />
        <autocomplete-custom
          ref="workingCirclesFilter"
          :items="workingCircles"
          :selected-items-ids="selectedFilters.workingCircles"
          :label="$t('Working circle')"
          @change="changeFilter('workingCircles', $event)"
        />
      </flex-wrapper>
    </filter-section>
    <filter-section>
      <template v-slot:title>
        {{ $t("Time commitment") }}
      </template>
      <v-range-slider
        ref="timeCommitmentFilter"
        :value="selectedFilters.timeCommitment"
        :min="timeCommitmentRange.min"
        :max="timeCommitmentRange.max"
        class="mt-12"
        thumb-label="always"
        :label="$t('Time Commitment')"
        @end="changeFilter('timeCommitment', $event)"
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
  mounted: function() {
    if (typeof this.$route.query.search == "undefined") return;
    var query = {};
    try {
      console.log(this.$route.query.search);
      query = JSON.parse(this.$route.query.search);
    } catch (e) {
      this.$router.replace({ name: "roles", query: {} });
    }
    for (var key in query) {
      var value = query[key];
      if (value.length > 0) {
        //todo: also update this in the html
        //this.$refs[key + "Filter"].value = value;
        this.setFilter({ filterType: key, filterValue: value });
      }
    }
  },
  computed: {
    ...mapState("groups", ["localGroups", "workingCircles"]),
    ...mapState("roles", ["selectedFilters"])
  },
  beforeMount() {
    this.$store.dispatch("roles/setDefaultFilters");
  },
  methods: {
    changeFilter(filterType, filterValue) {
      this.setFilter({ filterType: filterType, filterValue: filterValue });
      var params = {};
      //only put non-empty parameters in url
      for (var key in this.selectedFilters) {
        if (this.selectedFilters[key].length > 0) {
          if (key === "timeCommitment") {
            if (
              this.selectedFilters[key][0] === this.timeCommitmentRange.min &&
              this.selectedFilters[key][1] === this.timeCommitmentRange.max
            ) {
              continue;
            }
          }
          params[key] = this.selectedFilters[key];
        }
      }
      if (Object.keys(params).length === 0) {
        this.$router.replace({ name: "roles" });
      } else if (this.$route.query.search !== JSON.stringify(params)) {
        this.$router.replace({
          name: "roles",
          query: { search: JSON.stringify(params) }
        });
      }
    },
    ...mapActions("roles", ["setFilter"]),
    debounceSearchUpdate: debounce(function($event) {
      const filterValue = $event || "";
      this.changeFilter("search", filterValue);
    }, 500)
  }
};
</script>

<style lang="scss" scoped></style>
