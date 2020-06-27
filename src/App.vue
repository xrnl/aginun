<template>
  <v-app>
    <the-app-bar />
    <v-content>
      <router-view />
    </v-content>
    <v-footer absolute inset app class="font-weight-medium">
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Aginun</strong>
      </v-col>
    </v-footer>
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
