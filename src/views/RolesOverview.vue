<template>
  <page-with-drawer :is-drawer-open="isDrawerOpen">
    <router-view :key="$route.fullPath" />
    <div class="text-center">
      <h1>
        Find roles at
        <span class="xr-title">Extinction Rebellion Nederland.</span>
      </h1>
    </div>
    <div v-if="$vuetify.breakpoint.smAndDown" class="mb-8">
      <v-divider />
      <div class="d-flex justify-end pa-3">
        <v-btn text color="primary" @click="isDrawerOpen = true">
          Filter
        </v-btn>
      </div>
      <v-divider />
    </div>
    <grid-list
      v-if="filteredRoles.length > 0"
      item-width="300px"
      item-height="200px"
      gap="2rem"
    >
      <role-card v-for="role in filteredRoles" :key="role.id" :role="role" />
    </grid-list>
    <div v-else class="pa-5 text-center">
      <h3>No results.</h3>
      <p>Try removing filters.</p>
    </div>
    <template v-slot:drawer>
      <default-drawer>
        <template #header>
          <div
            class="d-flex justify-space-between align-center"
            style="width:100%;"
          >
            <span class="font-weight-bold">Search for positions</span>
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
import { mapGetters } from "vuex";

export default {
  name: "RolesOverview",
  components: {
    RoleCard,
    RoleFilters,
    PageWithDrawer,
    GridList,
    DefaultDrawer,
  },
  data: () => ({
    isDrawerOpen: null,
    //not a huge fan of having to declare these beforehand, will look into another way
    selectedFilters: {
      text: "",
      localGroup: [],
      workingGroup: [],
    },
  }),
  computed: {
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
  created: function() {
    this.isDrawerOpen = !this.isMobile;
  },
  methods: {
    handleSelectFilter: function(value, type) {
      this.selectedFilters[type] = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.xr-title {
  font-family: "FUCXEDCAPS";
}
</style>
