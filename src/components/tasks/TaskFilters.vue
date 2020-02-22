<template>
  <!-- Right now, this is the exact same as RoleFilters.vue, it could be that they will diverge at some point though, so for now there's two seperate files -->
  <div>
    <div>
      <v-text-field
        :value="selectedFilters.text"
        label="Facilitator, Writer, Photographer..."
        class="mt-3"
        @input="value => onSetFilter(value, 'text')"
      />
    </div>
    <filter-section>
      <template v-slot:title>
        Groups
      </template>
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
      <template v-slot:title>
        Time commitment
      </template>
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
import { mapState } from "vuex";
import FilterDrawerSection from "../layout/FilterDrawerSection";

export default {
  name: "RoleFilters",
  components: {
    filterSection: FilterDrawerSection,
    AutocompleteCustom,
    FlexWrapper,
  },
  props: {
    selectedFilters: {
      type: Object,
      required: true,
    },
    roleAmount: { type: Number, default: 0 },
    onSetFilter: { required: true, type: Function },
  },
  data: () => ({
    timeRange: [1, 30],
  }),
  computed: {
    ...mapState("roles", ["timeCommitment"]),
    ...mapState("localGroups", ["localGroups"]),
    ...mapState("workingGroups", ["workingGroups"]),
  },
};
</script>

<style lang="scss" scoped></style>
