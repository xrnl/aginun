<template>
  <page-with-drawer :is-drawer-open="isDrawerOpen">
    😎
    <template v-slot:drawer>
      ☜(ﾟヮﾟ☜)
    </template>
  </page-with-drawer>
</template>
<script>
import PageWithDrawer from "@/components/layout/PageWithDrawer.vue";
import { mapGetters } from "vuex";
export default {
  name: "TasksOverview",
  components: { PageWithDrawer },
  data: () => ({
    isDrawerOpen: null,
  }),
  computed: {
    ...mapGetters("tasks", ["getByFilters"]),
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
};
</script>
