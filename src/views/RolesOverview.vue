<template>
  <page-with-drawer :is-drawer-open="isDrawerOpen" class="pb-5">
    <router-view :key="$route.fullPath" />
    <role-edit-dialog v-model="newRoleDialog" />
    <div v-if="isMobile" class="mb-8">
      <v-divider />
      <div class="d-flex justify-space-between pa-3" v-if="loggedIn">
        <new-item-button :text="$t('New Role')" @click="showNewRoleDialog" />
      </div>
      <v-divider />
    </div>
    <v-btn
      class="filter-btn d-lg-none"
      color="primary"
      v-if="!isDrawerOpen"
      @click="isDrawerOpen = true"
      rounded
      x-large
    >
      {{ $t("Filter") }}
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <transition name="fade" mode="out-in">
      <grid-list v-if="!!roles.length" key="roles">
        <role-card
          v-for="role in rolesSelectedLanguage"
          :key="role.id"
          :role="role"
        />
      </grid-list>
      <div
        v-if="!roles.length && isLoadingRoles"
        key="loading"
        class="d-flex flex-column justify-center align-center mt-5"
      >
        <spinner :text="$t('Loading roles')" />
      </div>
      <div
        v-if="!roles.length && !isLoadingRoles"
        key="noRoles"
        class="pa-5 text-center fix-z-index"
      >
        <div v-if="isUsingFilters">
          <h3>{{ $t("No results.") }}</h3>
          <p>{{ $t("Try removing filters.") }}</p>
        </div>
        <div v-else>
          <p>{{ $t("There are currently no published roles.") }}</p>
        </div>
      </div>
    </transition>
    <infinite-loading :identifier="infiniteScrollId" @infinite="loadRoles">
      <template #spinner>
        <!-- show spinner without transition for loading additional roles -->
        <div
          v-if="!!roles.length"
          key="loading"
          class="d-flex flex-column justify-center align-center mt-5"
        >
          <spinner :text="$t('Loading roles')" />
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
          <div
            class="d-flex justify-space-between align-center"
            style="width:100%;"
          >
            <div class="d-flex flex-column">
              <h3 class="font-weight-bold">
                {{ $t("Search for positions") }}
              </h3>
              <span v-if="isMobile" class="font-weight-light">
                (<span v-if="!isLoadingRoles">{{ roles.length }}</span>
                <span v-else>...</span>
                {{ $t("positions found") }})
              </span>
            </div>
          </div>
        </template>
        <role-filters />
        <div v-if="!isMobile" class="text-center mt-4">
          <new-item-button
            v-if="loggedIn"
            :text="$t('New Role')"
            @click="showNewRoleDialog"
          />
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
    Spinner
  },
  data: () => ({
    newRoleDialog: false,
    isDrawerOpen: null
  }),
  computed: {
    ...mapState("roles", [
      "roles",
      "isLoadingRoles",
      "selectedFilters",
      "infiniteScrollId"
    ]),
    ...mapGetters({
      loggedIn: "user/loggedIn",
      isUsingFilters: "roles/isUsingFilters"
    }),
    isMobile: function() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    rolesSelectedLanguage() {
      // roles that do have an empty string as title have not been filled in for that language.
      return this.roles.filter((role) => role.title[this.$i18n.locale]);
    }
  },
  watch: {
    isMobile: function() {
      this.isDrawerOpen = !this.isMobile;
    }
  },
  created: function() {
    this.isDrawerOpen = !this.isMobile;
  },
  methods: {
    ...mapActions("roles", ["loadRoles"]),
    handleCloseDrawer: function() {
      this.isDrawerOpen = false;
    },
    showNewRoleDialog: function() {
      this.newRoleDialog = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.filter-btn {
  position: fixed;
  background: $xr-angry;
  right: $distance-sm;
  bottom: $distance-sm;
  z-index: 80;
}
</style>
