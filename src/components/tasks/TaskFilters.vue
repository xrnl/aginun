<template>
  <!-- Right now, this is the exact same as RoleFilters.vue, it could be that they will diverge at some point though, so for now there's two seperate files -->
  <div>
    <div>
      <v-text-field
        :value="searchString"
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
          :items="localGroups"
          label="Local Group"
          @change="id => onSetFilter(id, 'localGroup')"
        />
        <autocomplete-custom
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
        :value="selectedTimeCommitment"
        :min="timeCommitmentRange[0]"
        :max="timeCommitmentRange[1]"
        class="mt-12"
        thumb-label="always"
        label="Time Commitment"
        @change="id => onSetFilter(id, 'timeCommitment')"
      />
    </filter-section>
  </div>
</template>

<script>
import FlexWrapper from "@/components/layout/FlexWrapper.vue";
import AutocompleteCustom from "@/components/AutocompleteCustom";
import FilterDrawerSection from "../layout/FilterDrawerSection";
import {
  TaskAmount,
  NavbarHeight,
  LocalGroups,
  WorkingGroups,
  SearchString,
  SelectedTimeCommitment,
  BoundsTimeCommitmentRange,
  UpdateTimeCommitmentRange,
  UpdateLocalGroups,
  UpdateWorkingGroups,
  UpdateSearchString,
  ClearFilter,
} from "@/apollo/gql/task.gql";

export default {
  name: "TaskFilters",
  components: {
    filterSection: FilterDrawerSection,
    AutocompleteCustom,
    FlexWrapper,
  },
  data: () => ({
    timeCommitmentRange: [],
    selectedTimeCommitment: [],
  }),
  // beforeCreate: () => {
  //   console.log();
  // },
  apollo: {
    navbarHeight: {
      query: NavbarHeight,
      update: data => data.navbarHeight,
    },
    searchString: {
      query: SearchString,
      update: data => data.searchString,
    },
    taskAmount: {
      query: TaskAmount,
      update: data => data.taskAmount,
    },
    localGroups: {
      query: LocalGroups,
      update: data =>
        data.local_group.map(({ id, name }) => ({ id, text: name })),
    },
    workingGroups: {
      query: WorkingGroups,
      update: data =>
        data.working_group.map(({ id, name }) => ({ id, text: name })),
    },
    selectedTimeCommitment: {
      query: SelectedTimeCommitment,
      update: data => data.selectedTimeCommitment,
    },
    timeCommitmentRange: {
      query: BoundsTimeCommitmentRange,
      update: function(data) {
        const range = [
          data.role_aggregate.aggregate.min.time_commitment_min,
          data.role_aggregate.aggregate.max.time_commitment_max,
        ];
        this.$apollo.mutate({
          mutation: UpdateTimeCommitmentRange,
          variables: { range },
        });
        return range;
      },
    },
  },
  methods: {
    clearFilter: function() {
      this.$apollo.mutate({
        mutation: ClearFilter,
      });
    },
    onSetFilter: function(value, key) {
      // console.log(key, value);
      if (key === "localGroup") {
        this.$apollo.mutate({
          mutation: UpdateLocalGroups,
          variables: { names: value },
        });
      } else if (key === "workingGroup") {
        this.$apollo.mutate({
          mutation: UpdateWorkingGroups,
          variables: { names: value },
        });
      } else if (key === "timeCommitment") {
        this.$apollo.mutate({
          mutation: UpdateTimeCommitmentRange,
          variables: { range: value },
        });
      } else if (key === "text") {
        this.$apollo.mutate({
          mutation: UpdateSearchString,
          variables: { search: value },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
