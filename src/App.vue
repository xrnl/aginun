<template>
  <v-app>
    <the-app-bar />
    <v-content>
      <!-- Components do not automatically re-render with dynamic routes
      https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes
      :key ensures component is always re-rendered from scratch,
      eliminating the need to watch routes or navigation guards in components -->
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import TheAppBar from "@/components/TheAppBar.vue";

export default {
  name: "App",
  components: {
    TheAppBar
  },
  data: () => ({
    drawer: null // vuetify determines initial state based on screen size
  })
};
</script>

<style lang="scss" scoped></style>
