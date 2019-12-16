<template>
  <div>
    <div :style="containerMargin">
      <div class="my-8">
        <div class="text-center">
          <h3>
            Find positions at
          </h3>
          <h1 class="xr-title">
            Extinction Rebellion Nederland.
          </h1>
        </div>
      </div>
      <div class="d-flex flex-wrap justify-center">
        <role-card
          v-for="i in 11"
          :key="i"
        />
      </div>
    </div>
    <the-filter-drawer
      v-model="drawer"
      :width="drawerWidth"
    />
  </div>
</template>

<script>
import RoleCard from '@/components/RoleCard.vue'
import TheFilterDrawer from '@/components/TheFilterDrawer'

  export default {
    name: "Explore",
    components: {
      RoleCard,
      TheFilterDrawer
    },
    data: () => ({
      drawer: true, // vuetify determines initial state based on screen size
      drawerWidth: 400
    }),
    computed: {
      containerMargin: function () {
        if (this.drawer){
          return {'margin-right': this.drawerWidth + 'px'}
        }
        else {return {}}
      }
    }
  }
</script>

<style lang="scss" scoped>
$width-filter-drawer: 400px;

.xr-title {
  font-family: 'FUCXEDCAPS';
}

</style>
