<template>
  <div>
    <div
      :style="containerMargin"
    >
      <div class="">
        <div class="text-center my-8">
          <h3>
            Find positions at
          </h3>
          <h1 class="xr-title">
            Extinction Rebellion Nederland.
          </h1>
        </div>
        <div
          v-if="$vuetify.breakpoint.smAndDown"
          class="mb-8"
        >
          <v-divider />
          <div class="d-flex justify-end pa-3">
            <v-btn
              text
              color="primary"
              @click="drawer = true"
            >
              Filter
            </v-btn>
          </div>
          <v-divider />
        </div>
      </div>
      <div class="d-flex flex-wrap justify-center">
        <role-card
          v-for="role in roles"
          :key="role.id"
          :role="role"
        />
      </div>
    </div>
    <filter-drawer
      v-model="drawer"
      :width="drawerWidth"
    />
  </div>
</template>

<script>
import RoleCard from '@/components/RoleCard.vue'
import FilterDrawer from '@/components/FilterDrawer'
import { mapState } from 'vuex'

  export default {
    name: "Explore",
    components: {
      RoleCard,
      FilterDrawer
    },
    data: () => ({
      drawer: null,
      drawerWidth: 400
    }),
    computed: {
      ...mapState('roles', ['roles']),
      containerMargin: function () {
        if (this.drawer && !this.isMobile){
          return {'margin-right': this.drawerWidth + 'px'}
        }
        else {return {}}
      },
      isMobile: function () {
        return this.$vuetify.breakpoint.smAndDown;
      }
    },
    watch: {
      isMobile: function(val, oldVal) {
        this.drawer = !this.isMobile;
      }
    },
    created: function () {
      this.drawer = !this.isMobile;
    }
  }
</script>

<style lang="scss" scoped>
.xr-title {
  font-family: 'FUCXEDCAPS';
}
</style>
