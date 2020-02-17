<template>
  <div
    class="drawer"
    :style="drawerStyle"
    :class="{ active: value }"
    :value="value"
  >
    <div
      v-if="this.$vuetify.breakpoint.smAndDown"
      :style="{ height: navbarHeight }"
      class="d-flex justify-space-between align-center pa-3 bottom-border"
    >
      <div class="d-flex align-center">
        <v-btn icon @click="$emit('input', false)">
          <v-icon color="primary">
            mdi-arrow-left
          </v-icon>
        </v-btn>
        <span>
          <strong class="primary--text">{{ roleAmount }}</strong>
          positions found
        </span>
      </div>
      <v-btn text color="primary">
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
          @click="() => onSetFilter(null, 'reset')"
        >
          Clear filters
        </v-btn>
      </div>
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
        :value="timeCommitmentRange"
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
  import FilterDrawerSection from "./layout/FilterDrawerSection";
  import {
    UpdateLocalGroups,
    UpdateWorkingGroups,
    UpdateTimeCommitmentRange,
    RoleAmount,
    SearchString,
    NavbarHeight,
  } from "../gql/client.gql";
  import {
    LocalGroups,
    WorkingGroups,
    BoundsTimeCommitmentRange,
  } from "../gql/server.gql";

  export default {
    name: "TheFilterDrawer",
    components: {
      filterSection: FilterDrawerSection,
      AutocompleteCustom,
      FlexWrapper,
    },
    props: {
      value: {
        required: true,
        validator: value => typeof value === "boolean" || value === null,
      },
      width: {
        required: true,
        type: Number,
        default: 400,
      },
    },
    data: () => ({
      timeCommitmentRange: [],
    }),
    apollo: {
      // test: {
      //   query: LocalGroupById,
      //   variables: { id: 111 },
      //   update: data => {
      //     console.log("Local Query", data);
      //   }
      // },
      navbarHeight: {
        query: NavbarHeight,
        update: data => data.navbarHeight,
      },
      searchString: {
        query: SearchString,
        update: data => data.searchString,
      },
      roleAmount: {
        query: RoleAmount,
        update: data => data.roleAmount,
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
    computed: {
      drawerStyle: function() {
        let styles = {};
        if (!this.$vuetify.breakpoint.smAndDown) {
          styles.top = this.navbarHeight;
          styles["max-width"] = this.width + "px";
        }
        return styles;
      },
    },
    methods: {
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
        }
      },
    },
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
