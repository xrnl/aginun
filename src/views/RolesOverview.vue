<template>
  <page-with-drawer :is-drawer-open="isDrawerOpen" class="pb-5">
    <router-view :key="$route.fullPath" />
    <role-edit-dialog v-model="newRoleDialog" />
    <div class="text-center my-8">
      <h1>
        Find roles at
        <strong class="xr-title">
          Extinction Rebellion Nederland.
        </strong>
      </h1>
    </div>
    <div v-if="isMobile" class="mb-8">
      <v-divider />
      <div class="d-flex justify-space-between pa-3">
        <new-item-button label="New Role" @click="showNewRoleDialog" />
        <v-btn text color="primary" @click="isDrawerOpen = true">
          Filter
        </v-btn>
      </div>
      <v-divider />
    </div>
    <template>
      <transition name="fade" mode="out-in">
        <div
          v-if="isLoadingRoles"
          key="loading"
          class="d-flex flex-column justify-center align-center mt-5"
        >
          <spinner text="Loading roles" />
        </div>
        <grid-list
          v-if="!isLoadingRoles && roles.length"
          key="roles"
          gap="2rem"
        >
          <role-card v-for="role in roles" :key="role.id" :role="role" />
        </grid-list>
        <div
          v-if="!isLoadingRoles && !roles.length"
          key="noRoles"
          class="pa-5 text-center"
        >
          <div v-if="isUsingFilters">
            <h3>No results.</h3>
            <p>Try removing filters.</p>
          </div>
          <div v-else>
            <p>There are currently no published roles.</p>
          </div>
        </div>
      </transition>
      <infinite-loading
        :identifier="infiniteScrollIdentifier"
        @infinite="loadRoles"
      >
        <!-- override default slots with empty values. We place spinner and messages outside for smooth transitions -->
        <template #spinner>
          <span />
        </template>
        <template #no-results>
          <span />
        </template>
        <template #no-more>
          <span />
        </template>
      </infinite-loading>
    </template>
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
                ({{ roles.length }} positions found)
              </span>
            </div>
            <v-btn text color="primary" @click="setDefaultFilters">
              Clear filters
            </v-btn>
          </div>
        </template>
        <role-filters />
        <div v-if="!isMobile" class="text-center mt-4">
          <new-item-button label="New Role" @click="showNewRoleDialog" />
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
import { mapState, mapActions, mapGetters } from "vuex";
import NewItemButton from "@/components/NewItemButton";
import RoleEditDialog from "@/components/roles/RoleEditDialog";
import InfiniteLoading from "vue-infinite-loading";
import Spinner from "@/components/Spinner";

export default {
  name: "RolesOverview",
  components: {
    RoleCard,
    RoleFilters,
    PageWithDrawer,
    GridList,
    DefaultDrawer,
    NewItemButton,
    RoleEditDialog,
    InfiniteLoading,
    Spinner,
  },
  data: () => ({
    newRoleDialog: false,
    isDrawerOpen: null,
  }),
  computed: {
    ...mapState("roles", [
      "roles",
      "isLoadingRoles",
      "selectedFilters",
      "infiniteScrollIdentifier",
    ]),
    ...mapGetters("roles", ["isUsingFilters"]),
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
    ...mapActions("roles", ["loadRoles", "setDefaultFilters"]),
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
