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
    <p v-if="loading">
      loading ...
    </p>
    <template v-else>
      <grid-list v-if="filteredRoles.length > 0" gap="2rem">
        <role-card v-for="role in filteredRoles" :key="role.id" :role="role" />
      </grid-list>
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
import { mapState, mapGetters } from "vuex";
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
    //not a huge fan of having to declare these beforehand, will look into another way
    selectedFilters: {
      text: "",
      localGroup: [],
      workingGroup: [],
    },
  }),
  computed: {
    ...mapState("roles", ["loading"]),
    ...mapGetters("roles", ["getByFilters"]),
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
    this.$store.dispatch("roles/test");
  },
  created: function() {
    this.isDrawerOpen = !this.isMobile;
  },
  methods: {
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
