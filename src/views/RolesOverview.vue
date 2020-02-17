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
            <v-btn text color="primary" @click="drawer = true">
              Filter
            </v-btn>
          </div>
          <v-divider />
        </div>
      </div>
      <div class="d-flex flex-wrap justify-center">
        <role-card v-for="role in roles" :key="role.id" :role="role" />
        <div v-if="roleAmount < 1" class="pa-5 text-center">
          <h3>No results.</h3>
          <p>Try removing filters.</p>
        </div>
      </div>
    </div>
    <filter-drawer
      v-model="drawer"
      :width="drawerWidth"
      :role-amount="roleAmount"
    />
  </div>
</template>

<script>
  import RoleCard from "@/components/roles/RoleCard.vue";
  import FilterDrawer from "@/components/FilterDrawer";
  import { Filters, UpdateRoleAmount } from "@/gql/client.gql";
  import { Roles } from "@/gql/server.gql";
  // import gql from "graphql-tag";

  export default {
    name: "Explore",
    components: {
      RoleCard,
      FilterDrawer,
    },
    data: () => ({
      drawer: null,
      drawerWidth: 400,
      roleAmount: 0,
    }),
    computed: {
      containerMargin: function() {
        if (this.drawer && !this.isMobile) {
          return { "margin-right": this.drawerWidth + "px" };
        } else {
          return {};
        }
      },
      isMobile: function() {
        return this.$vuetify.breakpoint.smAndDown;
      },
    },
    apollo: {
      filters: {
        query: Filters,
        update: data => {
          return {
            ...data,
            selectedLocalGroups: data.selectedLocalGroups.length
              ? data.selectedLocalGroups.map(({ id }) => id)
              : null,
            selectedWorkingGroups: data.selectedWorkingGroups.length
              ? data.selectedWorkingGroups.map(({ id }) => id)
              : null,
          };
        },
      },
      roles: {
        query: Roles,
        update: function(data) {
          const roles = data.role.map(role => ({
            id: role.id,
            title: role.name,
            timeCommitment: [
              role.time_commitment_min,
              role.time_commitment_max,
            ],
            localGroup: {
              text: role.local_group.name,
            },
            workingGroup: {
              text: role.working_group.name,
            },
            location: role.location,
          }));
          this.$apollo.mutate({
            mutation: UpdateRoleAmount,
            variables: { amount: roles.length },
          });
          this.roleAmount = roles.length;
          return roles;
        },
        variables: function() {
          const v = {
            limit: 50,
            // search: this.filters.searchString,
            localGroupIds: this.filters.selectedLocalGroups,
            workingGroupIds: this.filters.selectedWorkingGroups,
            timeCommitmentMin: this.filters.selectedTimeCommitment[0],
            timeCommitmentMax: this.filters.selectedTimeCommitment[1],
          };
          // console.log(v);
          return v;
        },
        error: error => {
          console.error("[GraphQL]", error);
        },
      },
    },
    watch: {
      isMobile: function() {
        this.drawer = !this.isMobile;
      },
    },
    created: function() {
      this.drawer = !this.isMobile;
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
  .xr-title {
    font-family: "FUCXEDCAPS";
  }
</style>
