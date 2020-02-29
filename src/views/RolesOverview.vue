<template>
  <page-with-drawer :is-drawer-open="isDrawerOpen">
    <router-view :key="$route.fullPath" />
    <div class="text-center my-8">
      <h1>
        Find roles at
        <strong class="xr-title">
          Extinction Rebellion Nederland.
        </strong>
      </h1>
    </div>
    <new-item-dialog v-model="newRoleDialog" />
    <div v-if="isMobile" class="mb-8">
      <v-divider />
      <div class="d-flex justify-space-between pa-3">
        <new-item-button @click="showNewRoleDialog" />
        <v-btn text color="primary" @click="isDrawerOpen = true">
          Filter
        </v-btn>
      </div>
      <v-divider />
    </div>
    <grid-list v-if="filtered.length > 0" gap="2rem">
      <role-card v-for="role in filtered" :key="role.id" :role="role" />
    </grid-list>
    <div v-else class="pa-5 text-center">
      <h3>No results.</h3>
      <p>Try removing filters.</p>
    </div>
    <template v-slot:drawer>
      <default-drawer @close-drawer="handleCloseDrawer">
        <template #header>
          <div
            class="d-flex justify-space-between align-center"
            style="width:100%;"
          >
            <div class="d-flex flex-column">
              <span class="font-weight-bold">
                Search for positions
              </span>
              <span class="font-weight-light">
                ({{ filtered.length }} positions found)
              </span>
            </div>
            <v-btn text color="primary" @click="clearFilter">
              Clear filters
            </v-btn>
          </div>
        </template>
        <role-filters />
        <div v-if="!isMobile" class="text-center mt-4">
          <new-item-button @click="showNewRoleDialog" />
        </div>
      </default-drawer>
    </template>
  </page-with-drawer>
</template>

<script>
import DefaultDrawer from "@/components/layout/DefaultDrawer.vue";
import PageWithDrawer from "@/components/layout/PageWithDrawer.vue";
import RoleCard from "@/components/roles/RoleCard.vue";
import GridList from "@/components/layout/GridList.vue";
import RoleFilters from "@/components/roles/RoleFilters.vue";
import {
  GetRoles,
  GetFilter,
  RoleAmount,
  ClearRoleFilter,
} from "@/apollo/gql/role.gql";
import NewItemButton from "@/components/NewItemButton";
import NewItemDialog from "@/components/NewItemDialog";

export default {
  name: "RolesOverview",
  components: {
    RoleCard,
    RoleFilters,
    PageWithDrawer,
    GridList,
    DefaultDrawer,
    NewItemButton,
    NewItemDialog,
  },
  data: () => ({
    newRoleDialog: false,
    isDrawerOpen: null,
    filtered: [],
    filter: {},
  }),
  apollo: {
    filter: {
      query: GetFilter,
      update: data => data.roleData.filter,
    },
    filtered: {
      query: GetRoles,
      update(data) {
        this.$apollo.mutate({
          mutation: RoleAmount,
          variables: { amount: data.role.length },
        });
        return data.role;
      },
      variables() {
        const vars = {
          limit: this.filter.limit,
          searchString: this.filter.searchString,
          selectedTimeCommitmentMin: this.filter.selectedTimeCommitmentMin,
          selectedTimeCommitmentMax: this.filter.selectedTimeCommitmentMax,
          selectedLocalGroupIds: this.filter.selectedLocalGroups
            ? this.filter.selectedLocalGroups.map(({ id }) => id)
            : null,
          selectedWorkingGroupIds: this.filter.selectedWorkingGroups
            ? this.filter.selectedWorkingGroups.map(({ id }) => id)
            : null,
        };
        return vars;
      },
    },
  },
  computed: {
    isMobile: function() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  watch: {
    isMobile: function() {
      this.isDrawerOpen = !this.isMobile;
    },
  },
  created: function() {
    this.isDrawerOpen = !this.isMobile;
  },
  methods: {
    clearFilter: function() {
      this.$apollo.mutate({
        mutation: ClearRoleFilter,
      });
    },
    handleCloseDrawer: function() {
      this.isDrawerOpen = false;
    },
    showNewRoleDialog: function() {
      this.newRoleDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
