<template>
  <v-app>
    <the-app-bar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import TheAppBar from "@/components/TheAppBar.vue";

export default {
  name: "App",
  components: {
    TheAppBar,
  },
  data: () => ({
    drawer: null, // vuetify determines initial state based on screen size
  }),
};
</script>

<style lang="scss" scoped></style>
