<template>
  <page-with-drawer :is-drawer-open="isDrawerOpen" class="pb-5">
    <router-view :key="$route.fullPath" />
    <role-edit-dialog v-model="newRoleDialog" />
    <div v-if="isMobile" class="mb-8">
      <v-divider />
      <div class="d-flex justify-space-between pa-3">
        <new-item-button text="New Role" @click="showNewRoleDialog" />
        <v-btn text color="primary" @click="isDrawerOpen = true">
          Filter
        </v-btn>
      </div>
      <v-divider />
    </div>
    <transition name="fade" mode="out-in">
      <grid-list v-if="!!roles.length" key="roles" gap="1rem">
        <role-card v-for="role in roles" :key="role.id" :role="role" />
      </grid-list>
      <div
        v-if="!roles.length && isLoadingRoles"
        key="loading"
        class="d-flex flex-column justify-center align-center mt-5"
      >
        <spinner text="Loading roles" />
      </div>
      <div v-if="!roles.length && !isLoadingRoles" key="noRoles" class="pa-5 text-center">
        <div v-if="isUsingFilters">
          <h3>No results.</h3>
          <p>Try removing filters.</p>
        </div>
        <div v-else>
          <p>There are currently no published roles.</p>
        </div>
      </div>
    </transition>
    <infinite-loading :identifier="infiniteScrollId" @infinite="loadRoles">
      <template #spinner>
        <!-- show spinner without transition for loading additional roles -->
        <div v-if="!!roles.length" key="loading" class="d-flex flex-column justify-center align-center mt-5">
          <spinner text="Loading roles" />
        </div>
        <span v-else />
      </template>
      <template #no-results>
        <span />
      </template>
      <template #no-more>
        <span />
      </template>
    </infinite-loading>
    <template v-slot:drawer>
      <default-drawer @close-drawer="handleCloseDrawer">
        <template #header>
          <div class="d-flex justify-space-between align-center" style="width:100%;">
            <div class="d-flex flex-column">
              <span class="font-weight-bold">
                Search for positions
              </span>
              <span v-if="isMobile" class="font-weight-light">
                (<span v-if="!isLoadingRoles">{{ roles.length }}</span>
                <span v-else>...</span>
                positions found)
              </span>
            </div>
            <v-btn text color="primary" @click="setDefaultFilters">
              Clear filters
            </v-btn>
          </div>
        </template>
        <role-filters />
        <div v-if="!isMobile" class="text-center mt-4">
          <new-item-button text="New Role" @click="showNewRoleDialog" />
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
import NewItemButton from "@/components/NewItemButton.vue";
import RoleEditDialog from "@/components/roles/RoleEditDialog.vue";
import InfiniteLoading from "vue-infinite-loading";
import Spinner from "@/components/Spinner.vue";

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
    Spinner
  },
  data: () => ({
    newRoleDialog: false,
    isDrawerOpen: null
  }),
  computed: {
    ...mapState("roles", ["roles", "isLoadingRoles", "selectedFilters", "infiniteScrollId"]),
    ...mapGetters("roles", ["isUsingFilters"]),
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    }
  },
  watch: {
    isMobile() {
      this.isDrawerOpen = !this.isMobile;
    }
  },
  created() {
    this.isDrawerOpen = !this.isMobile;
  },
  methods: {
    ...mapActions("roles", ["loadRoles", "setDefaultFilters"]),
    handleCloseDrawer() {
      this.isDrawerOpen = false;
    },
    showNewRoleDialog() {
      this.newRoleDialog = true;
    }
  }
};
</script>
