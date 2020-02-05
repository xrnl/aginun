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
        <role-card v-for="role in filteredRoles" :key="role.id" :role="role" />
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
      :roleAmount="filteredRoles.length"
    />
  </div>
</template>

<script>
import RoleCard from "@/components/RoleCard.vue";
import FilterDrawer from "@/components/FilterDrawer";
import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters("roles", ["getByFilters"]),
    filteredRoles: function() {
      return this.getByFilters(this.selectedFilters);
    },
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
  },
  methods: {
    handleSelectFilter: function(value, type) {
      this.selectedFilters[type] = value;
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
