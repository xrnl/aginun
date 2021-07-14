<template>
  <div class="role-filters">
    <v-text-field
      :value="selectedFilters.search"
      :label="$t('Search by role title')"
      :placeholder="$t('Facilitator, Writer, Photographer...')"
      clearable
      outlined
      append-icon="mdi-magnify"
      @input="updateFilter('search', $event || '')"
    >
    </v-text-field>
    <flex-wrapper direction="column">
      <h4 class="heading">{{ $t("Groups") }}</h4>
      <autocomplete-custom
        class="group-dropdown-first"
        :items="localGroups"
        :selected-items-ids="selectedFilters.localGroups"
        :label="$t('Local Group')"
        :hideDetails="true"
        item-text="title"
        @change="updateFilter('localGroups', $event)"
      />
      <autocomplete-custom
        :items="workingCircles"
        :selected-items-ids="selectedFilters.workingCircles"
        :label="$t('Working circle')"
        :item-text="['title', $i18n.locale]"
        outlined
        @change="updateFilter('workingCircles', $event)"
      />
      <h4>{{ $t("Time Commitment") }}</h4>
      <v-range-slider
        :value="selectedFilters.timeCommitment"
        :min="timeCommitmentRange.min"
        :max="timeCommitmentRange.max"
        class="mt-12"
        thumb-label="always"
        :label="$t('Time Commitment')"
        hide-details
        @end="updateFilter('timeCommitment', $event)"
      />
    </flex-wrapper>
    <v-btn
      :disabled="!isUsingFilters"
      class="delete-filter-btn"
      depressed
      @click="clearFilters"
    >
      {{ $t("Clear filters") }}
      <v-icon>
        mdi-delete
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import FlexWrapper from "@/components/layout/FlexWrapper.vue";
import AutocompleteCustom from "@/components/AutocompleteCustom.vue";
import { mapState, mapActions, mapGetters } from "vuex";
import debounce from "lodash/debounce";
import { timeCommitmentRange } from "@/constants/timeCommitments";

export default {
  name: "RoleFilters",
  components: {
    AutocompleteCustom,
    FlexWrapper
  },
  data: () => ({
    timeCommitmentRange
  }),
  computed: {
    ...mapState("groups", ["localGroups", "workingCircles"]),
    ...mapState("roles", ["selectedFilters"]),
    ...mapGetters({
      isUsingFilters: "roles/isUsingFilters"
    })
  },
  methods: {
    ...mapActions("roles", ["setFilter", "setDefaultFilters"]),
    clearFilters() {
      this.setDefaultFilters();
      this.$router.replace("/roles");
    },
    // We need to debounce to avoid updating too often (e.g. while typing the search)
    updateFilter: debounce(function(filterType, filterValue) {
      this.setFilter({ filterType, filterValue });
    }, 500)
  }
};
</script>

<style lang="scss" scoped>
.delete-filter-btn {
  margin-top: 1rem;
  float: right;
}
.role-filters {
  .heading {
    margin-bottom: 0.5rem;
  }
  .group-dropdown-first {
    margin-bottom: 1rem;
  }
}
</style>
