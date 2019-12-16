<template>
  <v-container>
    <div class="my-8">
      <div class="text-center">
        <h1 class="xr-title">
          Extinction Rebellion Nederland positions.
        </h1>
        <p>
          Search by role title, location or working group.
        </p>
      </div>
    </div>
    <div class="d-flex flex-wrap justify-center">
      <role-card
        v-for="i in 11"
        :key="i "
      />
    </div>
  </v-container>
</template>

<script>
import RoleCard from '@/components/RoleCard.vue'

  export default {
    name: "Explore",
    components: {
      RoleCard
    },
    data: () => ({

    }),
  }
</script>

<style lang="scss" scoped>
.xr-title {
  font-family: 'FUCXEDCAPS';
}
</style>
