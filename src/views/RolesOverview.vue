<template>
  <page-with-drawer :is-drawer-open="isDrawerOpen" class="pb-5">
    <router-view :key="$route.fullPath" />
    <new-item-dialog v-model="newRoleDialog" />
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
        <new-item-button @click="showNewRoleDialog" />
        <v-btn text color="primary" @click="isDrawerOpen = true">
          Filter
        </v-btn>
      </div>
      <v-divider />
    </div>
    <template>
      <grid-list gap="2rem">
        <role-card v-for="role in roles" :key="role.id" :role="role" />
      </grid-list>
      <infinite-loading
        :identifier="infiniteScrollIdentifier"
        spinner="waveDots"
        @infinite="loadRoles"
      >
        <template #spinner>
          <div class="d-flex flex-column justify-center align-center">
            <p>
              Loading roles
            </p>
            <scale-loader
              :loading="true"
              :color="themeColor('shade')"
              :radius="1"
            />
          </div>
        </template>
        <template #no-results>
          <div class="pa-5 text-center">
            <h3>No results.</h3>
            <p>Try removing filters.</p>
          </div>
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
import { mapState, mapGetters, mapActions } from "vuex";
import NewItemButton from "@/components/NewItemButton";
import NewItemDialog from "@/components/NewItemDialog";
import { ScaleLoader } from "@saeris/vue-spinners";
import InfiniteLoading from "vue-infinite-loading";

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
    ScaleLoader,
    InfiniteLoading,
  },
  data: () => ({
    newRoleDialog: false,
    isDrawerOpen: null,
  }),
  computed: {
    ...mapState("roles", ["roles", "infiniteScrollIdentifier"]),
    ...mapGetters("styles", ["themeColor"]),
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
