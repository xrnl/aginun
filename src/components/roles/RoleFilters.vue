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
          @change="changeFilter('localGroups',$event)"
        />
        <autocomplete-custom
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
  created: function () {
    const query = JSON.parse(this.$route.query.search);
    console.log(query);
    for(var key in query){
      var value = query[key];
      if(value.length > 0) {
        console.log(value);
        //todo: properly update this
        this.setFilter(key, value);
      }
    }
    console.log("gelukt :)");
  },
  computed: {
    ...mapState("groups", ["localGroups", "workingCircles"]),
    ...mapState("roles", ["selectedFilters"])
  },
  beforeMount() {
    this.$store.dispatch("roles/setDefaultFilters");
  },
  methods: {
    changeFilter(filterType, filterValue){
      this.setFilter({ filterType: filterType, filterValue: filterValue });
      this.$router.replace({name: "roles", query: {search: JSON.stringify(this.selectedFilters)}});
    },
    ...mapActions("roles", ["setFilter"]),
    debounceSearchUpdate: debounce(function($event) {
      console.log("params");
      console.log(this.$route.query);
      const filterValue = $event || "";
      this.changeFilter("search", filterValue);
    }, 500)
  }
};
</script>

<style lang="scss" scoped></style>
