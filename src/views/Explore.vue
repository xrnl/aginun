<template>
  <div>
    <div :style="containerMargin">
      <div class>
        <div class="text-center my-8">
          <h1>
            Find positions at
            <span class="xr-title">Extinction Rebellion Nederland.</span>
          </h1>
        </div>
        <div v-if="$vuetify.breakpoint.smAndDown" class="mb-8">
          <v-divider />
          <div class="d-flex justify-end pa-3">
            <v-btn text color="primary" @click="drawer = true">Filter</v-btn>
          </div>
          <v-divider />
        </div>
      </div>
      <div class="d-flex flex-wrap justify-center">
        <role-card v-for="role in roles" :key="role.id" :role="role" />
        <div v-if="nPositions < 1" class="pa-5 text-center">
          <h3>No results.</h3>
          <p>Try removing filters.</p>
        </div>
      </div>
    </div>
    <filter-drawer
      v-model="drawer"
      :width="drawerWidth"
      :onSetFilter="handleSelectFilter"
      :selectedFilters="selectedFilters"
      :roleAmount="10"
    />
  </div>
</template>

<script>
import RoleCard from "@/components/RoleCard.vue";
import FilterDrawer from "@/components/FilterDrawer";
import { mapGetters, mapState, mapMutations } from "vuex";
import gql from "graphql-tag";

export default {
  name: "Explore",
  components: {
    RoleCard,
    FilterDrawer
  },
  data: () => ({
    drawer: null,
    drawerWidth: 400,
    //not a huge fan of having to declare these beforehand, will look into another way
    selectedFilters: {
      text: "",
      localGroup: [],
      workingGroup: []
    },
    nPositions: 3
  }),
  // methods: {
  //   ...mapMutations("filters", ["updateFilter"])
  // },
  computed: {
    // ...mapGetters("roles", ["getByFilters"]),
    // filteredRoles: function() {
    //   return this.getByFilters(this.selectedFilters);
    // },
    ...mapState("filters", [
      "localGroup",
      "workingGroup",
      "limit",
      "search",
      "timeCommitmentMin",
      "timeCommitmentMax"
    ]),
    containerMargin: function() {
      if (this.drawer && !this.isMobile) {
        return { "margin-right": this.drawerWidth + "px" };
      } else {
        return {};
      }
    },
    isMobile: function() {
      return this.$vuetify.breakpoint.smAndDown;
    }
    // roles: function() {
    //   $apollo.query
    // }
  },
  apollo: {
    roles: {
      query: gql`
        query getRoles(
          $limit: Int
          $search: String
          $localGroup: [Int!]
          $workingGroup: [Int!]
          $timeCommitmentMin: float8
          $timeCommitmentMax: float8
        ) {
          role(
            where: {
              name: { _ilike: $search }
              local_group: { id: { _in: $localGroup } }
              working_group: { id: { _in: $workingGroup } }
              time_commitment_min: { _gte: $timeCommitmentMin }
              time_commitment_max: { _lte: $timeCommitmentMax }
            }
            limit: $limit
          ) {
            id
            name
            location
            time_commitment_min
            time_commitment_max
            local_group {
              id
              name
            }
            working_group {
              id
              name
            }
          }
        }
      `,
      update: data =>
        data.role.map(role => ({
          id: role.id,
          title: role.name,
          timeCommitment: {
            min: role.time_commitment_min,
            max: role.time_commitment_max
          },
          localGroup: {
            text: role.local_group.name
          },
          workingGroup: {
            text: role.working_group.name
          },
          location: role.location
        })),
      variables: function() {
        return {
          limit: this.limit,
          search: this.search,
          localGroup: this.localGroup,
          workingGroup: this.workingGroup,
          timeCommitmentMin: this.timeCommitmentMin,
          timeCommitmentMax: this.timeCommitmentMax
        };
      },
      error: error => {
        console.error("[GraphQL]", error);
      }
    }
  },

  methods: {
    handleSelectFilter: function(value, type) {
      this.$store.commit("filters/updateFilter", { type, value });
    }
  },
  watch: {
    isMobile: function() {
      this.drawer = !this.isMobile;
    }
  },
  created: function() {
    this.drawer = !this.isMobile;
  }
};
</script>

<style lang="scss" scoped>
.xr-title {
  font-family: "FUCXEDCAPS";
}
</style>
