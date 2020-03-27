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
    <div
      v-if="isLoadingRoles"
      class="d-flex flex-column justify-center align-center"
    >
      <p>
        Loading roles
      </p>
      <scale-loader
        :loading="isLoadingRoles"
        :color="themeColor('shade')"
        :radius="1"
      />
    </div>
    <template v-else>
      <template v-if="filteredRoles.length > 0">
        <grid-list gap="2rem">
          <role-card
            v-for="role in filteredRoles"
            :key="role.id"
            :role="role"
          />
        </grid-list>
        <infinite-loading
          :identifier="infiniteScrollIdentifier"
          spinner="waveDots"
          @infinite="loadMoreRoles"
        >
          <!-- no message is shown when user has scrolled down to the last role -->
          <template #no-results>
            <span />
          </template>
          <template #no-more>
            <span />
          </template>
        </infinite-loading>
      </template>

      <div v-else class="pa-5 text-center">
        <h3>No results.</h3>
        <p>Try removing filters.</p>
      </div>
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
                ({{ filteredRoles.length }} positions found)
              </span>
            </div>
            <v-btn text color="primary">
              Clear filters
            </v-btn>
          </div>
        </template>
        <role-filters
          :on-set-filter="handleSelectFilter"
          :selected-filters="selectedFilters"
          :role-amount="filteredRoles.length"
        />
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
    //not a huge fan of having to declare these beforehand, will look into another way
    selectedFilters: {
      text: "",
      localGroup: [],
      workingCircle: [],
    },
  }),
  computed: {
    ...mapState("roles", ["isLoadingRoles", "infiniteScrollIdentifier"]),
    ...mapGetters("roles", ["getByFilters"]),
    ...mapGetters("styles", ["themeColor"]),
    filteredRoles: function() {
      return this.getByFilters(this.selectedFilters);
    },
    isMobile: function() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  watch: {
    isMobile: function() {
      this.isDrawerOpen = !this.isMobile;
    },
  },
  beforeCreate() {
    this.$store.dispatch("roles/loadRoles");
  },
  created: function() {
    this.isDrawerOpen = !this.isMobile;
  },
  methods: {
    ...mapActions("roles", ["loadMoreRoles"]),
    handleSelectFilter: function(value, type) {
      this.selectedFilters[type] = value;
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
